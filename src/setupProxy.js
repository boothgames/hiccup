const proxy = require('http-proxy-middleware');
const _ = require('lodash');

module.exports = (app) => {
  const host = _.get(process.env, 'NIGHTFURY_HOST', 'localhost');
  const port = _.get(process.env, 'NIGHTFURY_PORT', '5624');
  const url = `${host}:${port}`;
  app.use(proxy('/api', {
    target: `http://${url}/`, pathRewrite: {
      'api': 'v1',
    },
  }));
  app.use(proxy('/ws',
    {
      target: `ws://${url}/`, ws: true,
    }));
};
