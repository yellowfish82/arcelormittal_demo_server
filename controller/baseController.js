const service = require('../service');
const serviceUtils = require('../service/utils');
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
      found = configurations.common.auth_white_list_inner.find(l => url.startsWith(l));
    } else {
      found = configurations.common.auth_white_list_outer.find(l => url.startsWith(l));
    }

    return !!found;
  }

  verifyAccessRight = async (req) => {
    let result = {
      pass: true,
      status: 200,
      err: undefined,
    };

    let decryptoTokenResult;
    try {
      // console.log(`verifyAccessRight whoIsCalling`);
      const innerCall = service.accessService.whoIsCalling(req);
      // console.log(`verifyAccessRight recordAccess`);
      const accessId = await service.accessService.recordAccess(req, innerCall);

      const { originalUrl, } = req;

      // console.log(`verifyAccessRight innerCall? ${innerCall}`);
      // console.log(`verifyAccessRight originalUrl? ${originalUrl}`);
      // console.log(`verifyAccessRight in inner white list? ${configurations.common.auth_white_list_inner.indexOf(originalUrl)}`);
      // console.log(`verifyAccessRight in outer white list? ${configurations.common.auth_white_list_outer.indexOf(originalUrl)}`);

      const inWhitelist = this.checkIsInWhitelist(innerCall, originalUrl);

      if (!inWhitelist) {
        // console.log(`verifyAccessRight verifyToken`);
        const tokeyVerifyResult = await service.accessService.verifyToken(req, innerCall);
        // console.log(`verifyAccessRight after verify token`);
        result = tokeyVerifyResult.result;
        // console.log(`verifyAccessRight after verify token ${result}`);
        decryptoTokenResult = tokeyVerifyResult.decryptoTokenResult;
        // console.log(`verifyAccessRight after decryptoTokenResult ${decryptoTokenResult}`);
      }

      /*
      // console.log(`verifyAccessRight verifyToken pass? ${result.pass}, is innerCall? ${innerCall}`);
      if (result.pass && !innerCall && configurations.common.auth_white_list_outer.indexOf(originalUrl) < 0) {
        // console.log(`verifyAccessRight bill`);
        // TODO
        await service.accessService.bill(decryptoTokenResult, accessId);
      }
      */
    } catch (error) {
      result.pass = false;
      result.status = 400;
      result.err = `${error}`;
    }

    // console.log(`verifyAccessRight return verify result: ${JSON.stringify(result)}`);
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
