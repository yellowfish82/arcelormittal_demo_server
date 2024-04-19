const express = require('express');
// const cors = require('cors');
const bodyParser = require('body-parser');
const configurations = require('./config');
const mountRoutes = require('./routes');

const config = (app) => {
  app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('X-Powered-By', ' 3.2.1');
    if (req.method === 'OPTIONS') res.sendStatus(200);/* 让options请求快速返回*/
    else next();
  });

  app.use(bodyParser.json({ limit: 1850000, }));
  app.use(bodyParser.urlencoded({ limit: 1850000, extended: true, }));

  app.set('trust proxy', true);

  mountRoutes(app);
};

const start = () => {
  const app = express();
  config(app);

  app.listen(configurations.env.port, () => {
    console.log(`Arcelor Mittal server listening on port ${configurations.env.port}`);
  });
};

const fetchApp = (port) => {
  const app = express();
  config(app);

  return app.listen(port || configurations.env.port, () => {
    console.log(`Arcelor Mittal server listening on port ${port || configurations.env.port}`);
  });
};

module.exports = {
  start,
  fetchApp,
};
