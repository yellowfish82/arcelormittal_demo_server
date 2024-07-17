const service = require('../../service');
const BaseCtrler = require('../baseController');

const OT = require('../../service/db/ormapping/ot');

class OTHistoryCtrler extends BaseCtrler {
  businessLogic = async (params) => {
    const { thing_id, starttime, endtime, } = params;
    const otEntity = new OT();
    otEntity.setValue({
      thing_id,
    });
    const sql = otEntity.querySQL();
    const otData = await service.dbService.query(sql);

    return {
      status: 200,
      info: { otData: otData.result, },
    };
  };

  verifyReq = async (req) => {
    // TODO get user information from token

    if (!req.params) {
      return {
        status: 400,
        errMsg: 'did not specified query body',
      };
    }

    if (!req.params.conditions) {
      return {
        status: 400,
        errMsg: 'did not specified query conditions',
      };
    }

    const conditions = JSON.parse(req.params.conditions);

    return {
      params: {
        thing_id: conditions.thing_id,
        // starttime,
        // endtime,
      },
    };
  };
}

let ctrlerInstance;
const getCtrlerInstance = () => {
  if (!ctrlerInstance) {
    ctrlerInstance = new OTHistoryCtrler();
  }

  return ctrlerInstance;
};

const otHistory = async (req) => {
  getCtrlerInstance();

  const result = await ctrlerInstance.ctrl(req);

  return result;
};
module.exports = otHistory;
