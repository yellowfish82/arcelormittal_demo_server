const service = require('../service');
const configurations = require('../config');

/**
 * include the folloing functions:
 * verifyReq
 * businessLogic
 * assembleResp
 *
 * ctrl involking flow: verifyReq -> businessLogic -> assembleResp
 */
class BaseCtrler {
  verifyReq = async (req) => {
    return req;
  };

  businessLogic = async () => { };

  assembleResp = (status, message) => {
    // do something
    return {
      status,
      message,
    };
  };

  checkIsInWhitelist = (innerCall, url) => {
    let found;
    if (innerCall) {
      found = configurations.common.auth_white_list_inner.find((l) => url.startsWith(l));
    } else {
      found = configurations.common.auth_white_list_outer.find((l) => url.startsWith(l));
    }

    return !!found;
  };

  verifyAccessRight = async (req) => {
    let result = {
      pass: true,
      status: 200,
      err: undefined,
    };

    // let decryptoTokenResult;
    try {
      const innerCall = service.accessService.whoIsCalling(req);

      const accessId = await service.accessService.recordAccess(req, innerCall);
      console.log(`access id: ${accessId}`);

      const { originalUrl, } = req;
      const inWhitelist = this.checkIsInWhitelist(innerCall, originalUrl);

      if (!inWhitelist) {
        // console.log(`verifyAccessRight verifyToken`);
        const tokeyVerifyResult = await service.accessService.verifyToken(req, innerCall);
        // console.log(`verifyAccessRight after verify token`);
        result = tokeyVerifyResult.result;
        // console.log(`verifyAccessRight after verify token ${result}`);
      }
    } catch (error) {
      result.pass = false;
      result.status = 400;
      result.err = `${error}`;
    }

    return result;
  };

  ctrl = async (req) => {
    let verifyResult = await this.verifyAccessRight(req);
    if (!verifyResult.pass) {
      // console.log(`ctrl verifyAccessRight verifyResult: ${JSON.stringify(verifyResult)}`);
      return this.assembleResp(verifyResult.status, verifyResult.err);
    }

    verifyResult = await this.verifyReq(req);
    // console.log(`ctrl verifyReq verifyResult: ${JSON.stringify(verifyResult)}`);
    if ((verifyResult.status && verifyResult.status !== 200) || verifyResult.errMsg) {
      // console.log(`ctrl verifyReq verifyResult not passed: ${JSON.stringify(verifyResult)}`);
      return this.assembleResp(verifyResult.status, verifyResult.errMsg);
    } else {
      try {
        const { status, info, } = await this.businessLogic(verifyResult.params);
        // console.log(`ctrl businessLogic result: ${status}, ${JSON.stringify(info)}`);
        return this.assembleResp(status, info);
      } catch (error) {
        return this.assembleResp(400, `${error}`);
      }
    }
  };
}

module.exports = BaseCtrler;
