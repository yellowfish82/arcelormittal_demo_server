const createModel = require('./create_model');
const delModel = require('./del_model');
const getModel = require('./get_model');
const queryModels = require('./query_models');
const updateModel = require('./update_model');
const createInstance = require('./create_instance');
const delInstance = require('./del_instance');
const getInstance = require('./get_instance');
const queryInstances = require('./query_instances');
const updateInstance = require('./update_instance');

const thing = {
  createModel,
  delModel,
  getModel,
  queryModels,
  updateModel,
  createInstance,
  delInstance,
  getInstance,
  queryInstances,
  updateInstance,
};

module.exports = thing;
