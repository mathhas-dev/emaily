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
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        // User alredy logged in the application
        return done(null, existingUser);
      }

      // First loggin, creates a new user
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);

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
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ linkedinId: profile.id });

      if (existingUser) {
        // User alredy logged in the application
        done(null, existingUser);
      }

      // First loggin, creates a new user
      const user = await new User({ linkedinId: profile.id }).save();
      done(null, user);
    }
  )
);