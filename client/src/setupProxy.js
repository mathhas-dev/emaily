const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        ["/api", "/auth/google", "/auth/linkedin"],
        createProxyMiddleware({
            target: "http://localhost:5000",
        })
    );
};

// Remember: It's not needed create a proxy for production, because in production, 
// the app uses just one server (express API) and the public assets (build)