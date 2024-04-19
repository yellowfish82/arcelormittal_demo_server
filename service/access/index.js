const moment = require('moment');
const dbService = require('../db');
const serviceUtils = require('../utils');
const configurations = require('../../config');

const bill = async (decryptoTokenResult, accessRecId) => {
  // TODO

};

const billing = (usageDetails, owner) => {
  // TODO

};

const whoIsCalling = (req) => {
  let innerCall = false;

  const { ip, headers, originalUrl, } = req;
  const { external, } = headers;

  if ((ip === configurations.common.demo_server_ip || ip === configurations.common.demo_web_app_ip) && external === undefined) {
    innerCall = true;
  }

  console.log(`recordAccess, caller is ${req.protocol}://${ip}${originalUrl} is innerCall? ${innerCall}, external ${external}`);

  return innerCall;
};

/**
 * only verify spicefactory calling and called API is not in white list
 */
const verifyToken = async (req, innerCall) => {
  const result = {
    status: 200,
    pass: true,
    err: undefined,
  };

  // TODO

  return { result, };
};

const recordAccess = async (req) => {
  // TODO
  const accessRecordId = null;

  return accessRecordId;
};

const accessService = {
  bill,
  billing,
  recordAccess,
  verifyToken,
  whoIsCalling,
};

module.exports = accessService;
