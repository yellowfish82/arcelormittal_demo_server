const mysql = require('./runningdb/mysql');
const sqlite = require('./runningdb/sqlite');

const config = require('../../config');
const ThingImages = require('./ormapping/thingImages');
const EquityDefine = require('./ormapping/equitydef');
const User = require('./ormapping/user');
const Poster = require('./ormapping/poster');
const Currency = require('./ormapping/currency');
const Transfer = require('./ormapping/transfer');
const Wallet = require('./ormapping/wallet');

const add = async (sql) => {
  console.log(`operation database create something ${sql}`);

  if ('sqlite' === config.db.type) {
    await sqlite.add(sql);
  } else {
    throw new Error(`unsupport db type: ${config.db.type}`);
  }
};

const del = async (sql) => {
  console.log(`operation database delete something with condition: ${sql}`);

  if ('sqlite' === config.db.type) {
    await sqlite.del(sql);
  } else {
    throw new Error(`unsupport db type: ${config.db.type}`);
  }
};

const query = async (sql) => {
  console.log(`operation database query something with condition: ${sql}`);

  if ('sqlite' === config.db.type) {
    return sqlite.query(sql);
  } else {
    throw new Error(`unsupport db type: ${config.db.type}`);
  }
};

const update = async (sql) => {
  console.log(`operation database update something with sql: ${sql}`);

  if ('sqlite' === config.db.type) {
    return sqlite.update(sql);
  } else {
    throw new Error(`unsupport db type: ${config.db.type}`);
  }
};

const getViewById = async (viewName, id) => {
  if ('sqlite' === config.db.type) {
    return sqlite.getViewById(viewName, id);
  } else {
    throw new Error(`unsupport db type: ${config.db.type}`);
  }
};

const getById = async (o, id) => {
  if ('sqlite' === config.db.type) {
    return sqlite.getById(o, id);
  } else {
    throw new Error(`unsupport db type: ${config.db.type}`);
  }
};

const dbService = {
  add,
  del,
  query,
  update,
  getById,
  getViewById,
};

module.exports = dbService;
