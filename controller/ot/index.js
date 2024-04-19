const register = require('./register');
const registeredApps = require('./registeredApps');
const registeredApp = require('./registeredApp');
const verify = require('./verify');
const tokengen = require('./tokengen');
const tokencancel = require('./tokencancel');
const usage = require('./usage');
const billing = require('./billing');
const stop = require('./stop');
const paied = require('./paied');

const account = {
  register,
  registeredApps,
  registeredApp,
  verify,
  stop,
  tokengen,
  tokencancel,
  usage,
  billing,
  paied,
};

module.exports = account;
