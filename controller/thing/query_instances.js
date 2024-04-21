const service = require('../../service');
const BaseCtrler = require('../baseController');

const ThingInstance = require('../../service/db/ormapping/thing_instance');

class QueryInstancesCtrler extends BaseCtrler {
  businessLogic = async (params) => {
    const { conditions } = params;

    const thingEntity = new ThingInstance();
    thingEntity.setValue(conditions);

    const thingSet = await service.dbService.query(thingEntity.querySQL());

    return {
      status: 200,
      info: { things: thingSet.result },
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

    let conditions = {};
    if (req.params.conditions) {
      conditions = JSON.parse(req.params.conditions);
    }

    return {
      params: {
        conditions
      },
    };
  };
}

let ctrlerInstance;
const getCtrlerInstance = () => {
  if (!ctrlerInstance) {
    ctrlerInstance = new QueryInstancesCtrler();
  }

  return ctrlerInstance;
};

const queryInstances = async (req) => {
  getCtrlerInstance();

  const result = await ctrlerInstance.ctrl(req);

  return result;
};
module.exports = queryInstances;
