const service = require('../../service');
const BaseCtrler = require('../baseController');

const ThingModel = require('../../service/db/ormapping/thing_model');

class GetModelCtrler extends BaseCtrler {
  businessLogic = async (params) => {
    const { thing_model_id, } = params;

    const thingModel = await service.dbService.getById(new ThingModel(), thing_model_id);

    return {
      status: 200,
      info: { thingModel },
    };
  };

  verifyReq = async (req) => {
    // TODO get user information from token

    if (!req.params) {
      return {
        status: 400,
        errMsg: 'did not specified query parameters',
      };
    }

    if (req.params.id === undefined) {
      return {
        status: 400,
        errMsg: 'did not specified query parameters',
      };
    }

    return {
      params: {
        thing_model_id: parseInt(req.params.id)
      },
    };
  };
}

let ctrlerInstance;
const getCtrlerInstance = () => {
  if (!ctrlerInstance) {
    ctrlerInstance = new GetModelCtrler();
  }

  return ctrlerInstance;
};

const getModel = async (req) => {
  getCtrlerInstance();

  const result = await ctrlerInstance.ctrl(req);

  return result;
};
module.exports = getModel;
