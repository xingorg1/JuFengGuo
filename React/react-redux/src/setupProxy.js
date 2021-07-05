const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    proxy.createProxyMiddleware({
      target: 'https://api.seniverse.com/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    })
  );
  app.use(
    '/charles',
    proxy.createProxyMiddleware({
      target: 'http://localhost.charlesproxy.com:3000/',
      changeOrigin: true,
      pathRewrite: {
        '^/charles': ''
      }
    })
  );
};