const Chance = require('chance');

const service = require('../../service');
const configurations = require('../../config');
const BaseCtrler = require('../baseController');
const ThingInstance = require('../../service/db/ormapping/thing_instance');

const chance = new Chance();

class CreateInstanceCtrler extends BaseCtrler {
  businessLogic = async (params) => {
    const { thing_instance, } = params;
    const instanceEntity = new ThingInstance();
    const sn = chance.string({ length: 8, alpha: true, });
    const key = chance.string({ length: 10, });
    instanceEntity.setValue({
      ...thing_instance,
      sn,
      key,
      status: configurations.common.THING_STATUS.STOP,
    });

    await service.dbService.add(instanceEntity.insertSQL());

    return {
      status: 200,
      info: 'register thing instance 成功！',
    };
  };

  verifyReq = async (req) => {
    // TODO get user information from token

    if (!req.body) {
      return {
        status: 400,
        errMsg: 'did not give thing instance information',
      };
    }

    return {
      params: {
        thing_instance: req.body,
      },
    };
  };
}

let ctrlerInstance;
const getCtrlerInstance = () => {
  if (!ctrlerInstance) {
    ctrlerInstance = new CreateInstanceCtrler();
  }

  return ctrlerInstance;
};

const createInstance = async (req) => {
  getCtrlerInstance();

  const result = await ctrlerInstance.ctrl(req);

  return result;
};
module.exports = createInstance;
