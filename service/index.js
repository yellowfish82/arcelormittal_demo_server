const dbService = require('./db');
const mqttService = require('./mqtt');
const accessService = require('./access');
const fileService = require('./files');


const service = {
  dbService,
  mqttService,
  accessService,
  fileService
};

module.exports = service;
