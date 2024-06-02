const service = require('../../service');
const BaseCtrler = require('../baseController');

const ThingModel = require('../../service/db/ormapping/thing_model');

class QueryModelsCtrler extends BaseCtrler {
  businessLogic = async (params) => {
    const modelEntity = new ThingModel();
    modelEntity.setValue({});
    const models = await service.dbService.query(modelEntity.querySQL());

    return {
      status: 200,
      info: { ThingModels: models.result, },
    };
  };

  verifyReq = async (req) => {
    // TODO get user information from token

    return {
      params: {

      },
    };
  };
}

let ctrlerInstance;
const getCtrlerInstance = () => {
  if (!ctrlerInstance) {
    ctrlerInstance = new QueryModelsCtrler();
  }

  return ctrlerInstance;
};

const createModel = async (req) => {
  getCtrlerInstance();

  const result = await ctrlerInstance.ctrl(req);

  return result;
};
module.exports = createModel;
