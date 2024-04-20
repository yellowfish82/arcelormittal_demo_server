const service = require('../../service');
const BaseCtrler = require('../baseController');

class UpdateModelCtrler extends BaseCtrler {
  businessLogic = async (params) => {
    // const { id, doctype, orgId, tokenUserName, } = params;

    return {
      status: 200,
      info: { alertData: updateModel, },
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
    ctrlerInstance = new UpdateModelCtrler();
  }

  return ctrlerInstance;
};

const updateModel = async (req) => {
  getCtrlerInstance();

  const result = await ctrlerInstance.ctrl(req);

  return result;
};
module.exports = updateModel;
