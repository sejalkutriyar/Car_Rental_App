const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    'https://carrentalapk.infinityfreeapp.com',
    createProxyMiddleware({
      target: 'http://localhost:8080https://carrentalapk.infinityfreeapp.com',
      changeOrigin: true,
    })
  );
};