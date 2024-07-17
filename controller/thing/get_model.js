const service = require('../../service');
const BaseCtrler = require('../baseController');

const ThingModel = require('../../service/db/ormapping/thing_model');
const ThingModelProperties = require('../../service/db/ormapping/thing_model_properties');
const AlertCondition = require('../../service/db/ormapping/alert_condition');

class GetModelCtrler extends BaseCtrler {
  businessLogic = async (params) => {
    const { thing_model_id, } = params;

    const thingModel = await service.dbService.getById(new ThingModel(), thing_model_id);

    const propertyEntity = new ThingModelProperties();
    propertyEntity.setValue({
      thing_model_id: thingModel.id,
    });
    const propertySet = await service.dbService.query(propertyEntity.querySQL());
    thingModel['properties'] = propertySet.result;

    const alertConditionEntity = new AlertCondition();
    alertConditionEntity.setValue({
      thing_model_id: thingModel.id,
    });
    const alertConditionSet = await service.dbService.query(alertConditionEntity.querySQL());
    thingModel['alert_conditions'] = alertConditionSet.result;

    return {
      status: 200,
      info: { thingModel, },
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
        thing_model_id: parseInt(req.params.id),
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
