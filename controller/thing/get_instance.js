const service = require('../../service');
const BaseCtrler = require('../baseController');

const ThingInstance = require('../../service/db/ormapping/thing_instance');

class GetInstanceCtrler extends BaseCtrler {
  businessLogic = async (params) => {
    const { id, } = params;

    const thing = await service.dbService.getById(new ThingInstance(), id);

    return {
      status: 200,
      info: { thing, },
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

    if (!req.params.id) {
      return {
        status: 400,
        errMsg: 'did not specified target instance id',
      };
    }

    return {
      params: {
        id: req.params.id,
      },
    };
  };
}

let ctrlerInstance;
const getCtrlerInstance = () => {
  if (!ctrlerInstance) {
    ctrlerInstance = new GetInstanceCtrler();
  }

  return ctrlerInstance;
};

const getInstance = async (req) => {
  getCtrlerInstance();

  const result = await ctrlerInstance.ctrl(req);

  return result;
};
module.exports = getInstance;
