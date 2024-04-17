const files = require('./files');
const quota = require('./quota');
const co = require('./co');
const order = require('./order');
const product = require('./product');
const role = require('./role');
const meta = require('./meta');
const app = require('./app');

const controllers = {
  files,
  quota,
  co,
  order,
  product,
  role,
  meta,
  app,
};

module.exports = controllers;
