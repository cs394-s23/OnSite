const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://poatek-hub-api.azurewebsites.net/',
            changeOrigin: true,
            secure: true,
        })
    );
};

