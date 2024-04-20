const service = require('../../service');
const BaseCtrler = require('../baseController');

class QueryInstancesCtrler extends BaseCtrler {
  businessLogic = async (params) => {
    // const { id, doctype, orgId, tokenUserName, } = params;

    return {
      status: 200,
      info: { alertData: queryInstances, },
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

    return {
      params: {

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
