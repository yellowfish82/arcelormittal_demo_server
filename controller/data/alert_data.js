const service = require('../../service');
const BaseCtrler = require('../baseController');

class AlertDataCtrler extends BaseCtrler {
  businessLogic = async (params) => {
    const { thing_id, } = params;
    const viewName = 'alert_data_view';
    // const condition = `timestamp BETWEEN ${starttime} AND ${endtime}`;
    const alertData = await service.dbService.queryView(viewName, `thing_id = '${thing_id}' ORDER BY timestamp DESC`);

    return {
      status: 200,
      info: { alertData, },
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

    if (!req.params.conditions) {
      return {
        status: 400,
        errMsg: 'did not specified query parameters',
      };
    }

    const { thing_id, } = JSON.parse(req.params.conditions);

    return {
      params: {
        thing_id,
        // starttime,
        // endtime,
      },
    };
  };
}

let ctrlerInstance;
const getCtrlerInstance = () => {
  if (!ctrlerInstance) {
    ctrlerInstance = new AlertDataCtrler();
  }

  return ctrlerInstance;
};

const alertData = async (req) => {
  getCtrlerInstance();

  const result = await ctrlerInstance.ctrl(req);

  return result;
};
module.exports = alertData;
