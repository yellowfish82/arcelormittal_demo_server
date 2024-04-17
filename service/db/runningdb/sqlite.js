const sqlite3 = require('sqlite3');
const { open, } = require('sqlite');

const config = require('../../../config');
const { antiSQLInjection, } = require('../tools');

let db;
const getSqliteDB = async () => {
  if (!db) {
    db = await open({
      filename: config.db.sqliteFilename,
      driver: sqlite3.cached.Database,
    });

    db.on('trace', (data) => {
      console.log(`sqlite db operationg tracing: ${data}`);
    });
  }

  return db;
};

const add = async (sql) => {
  antiSQLInjection(sql);
  const db = await getSqliteDB();
  await db.exec(sql);
};

const del = async (sql) => {
  antiSQLInjection(sql);
  const db = await getSqliteDB();
  const result = await db.run(sql);

  return { result, };
};

const query = async (sql) => {
  antiSQLInjection(sql);
  const db = await getSqliteDB();
  const result = await db.all(sql);

  return { result, };
};

const update = async (sql) => {
  antiSQLInjection(sql);
  const db = await getSqliteDB();
  const result = await db.exec(sql);

  return { result, };
};

const getViewById = async (viewName, id) => {
  if (!viewName) {
    throw new Error(`view name should be given`);
  }

  if (id === undefined) {
    throw new Error(`id can not be null/undefined`);
  }

  const querySQL = `SELECT * FROM ${viewName} where id=${id}`;
  const queryResult = await query(querySQL);
  const queryResultSet = queryResult ? queryResult.result : [];

  if (queryResultSet.length === 0) {
    throw new Error(`can not find any records in view ${viewName} by id(${id})`);
  } else if (resultSet.length > 1) {
    throw new Error(`find more than 1 records in view ${viewName} by id(${id})`);
  }

  return resultSet[0];
};

const getById = async (o, id) => {
  if (o === undefined) {
    throw new Error(`object can not be null/undefined`);
  }

  if (id === undefined) {
    throw new Error(`id can not be null/undefined`);
  }

  o.setValue({ id, });
  const queryResult = await query(o.querySQL());
  const resultSet = queryResult ? queryResult.result : [];

  if (resultSet.length === 0) {
    throw new Error(`can not find any instance for ${o.constructor.name} by pk(${id})`);
  } else if (resultSet.length > 1) {
    throw new Error(`find more than 1 instances for ${o.constructor.name} by pk(${id})`);
  }

  return resultSet[0];
};

const sqlite = {
  add,
  del,
  query,
  update,
  getById,
  getViewById,
};

module.exports = sqlite;
