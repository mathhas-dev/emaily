const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = User.findOne({ googleId: profile.id });

      if (existingUser) {
        // User alredy logged in the application
        done(null, existingUser);
      } else {
        // First loggin, creates a new user
        const user = new User({ googleId: profile.id }).save();
        done(null, user);
      }

    }
  )
);

passport.use(
  new LinkedInStrategy(
    {
      clientID: keys.linkedinClientID,
      clientSecret: keys.linkedinClientSecret,
      callbackURL: '/auth/linkedin/callback',
      scope: ['r_emailaddress', 'r_liteprofile']
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ linkedinId: profile.id }).
        then(existingUser => {
          if (existingUser) {
            // User alredy logged in the application
            done(null, existingUser);
          } else {
            // First loggin, creates a new user
            new User({ linkedinId: profile.id })
              .save()
              .then(user => done(null, user));
          }
        })
    }
  )
);