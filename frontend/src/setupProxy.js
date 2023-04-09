const { createProxyMiddleware } = require('http-proxy-middleware');

let myappSessionValidationCookie = '';



module.exports = function(app) {
  //app.use(createProxyMiddleware('/api', { target: 'ws://localhost:8000', ws: true }));
  app.use(createProxyMiddleware('/api', { target: 'http://localhost:8000', changeOrigin: true }));
  
};