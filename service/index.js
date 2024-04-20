const dbService = require('./db');
const mqttService = require('./mqtt');
const accessService = require('./access');

const service = {
  dbService,
  mqttService,
  accessService,
};

module.exports = service;
