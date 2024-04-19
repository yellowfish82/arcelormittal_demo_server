const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const config = require('../../config');
const filename = 'arcelormittal.db';

const add = async (sql) => {
    console.log(`operation database create something ${sql}`);

    try {
        const db = await getSqliteDB();
        const res = await db.exec(sql);
        console.log(`insert result: ${res}`);

    } catch (error) {
        console.error(error);
    }
}

const del = async (sql) => {
    console.log(`operation database delete something with condition: ${sql}`);

    try {
        const db = await getSqliteDB();
        const result = await db.run(sql);

        return { result };
    } catch (error) {
        console.error(error);
    }
}

const query = async (sql) => {
    console.log(`operation database query something with condition: ${sql}`);

    try {
        const db = await getSqliteDB();
        const result = await db.all(sql);

        return { result };
    } catch (error) {
        console.error(error);
    }
}

const update = async (sql) => {
    console.log(`operation database update something with sql: ${sql}`);

    try {
        const db = await getSqliteDB();
        const result = await db.exec(sql);

        return { result };
    } catch (error) {
        console.error(error);
    }
}

let db;
const getSqliteDB = async () => {
    if (!db) {
        db = await open({
            filename,
            driver: sqlite3.cached.Database
        })

        db.on('trace', (data) => {
            console.log(`sqlite db operationg tracing: ${data}`);
        })
    }

    return db;
}

const getViewById = async (viewName, id) => {
    if (!viewName) {
        throw new Error(`view name should be given`)
    }

    if (id === undefined) {
        throw new Error(`id can not be null/undefined`)
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
}

const getById = async (o, id) => {
    if (o === undefined) {
        throw new Error(`object can not be null/undefined`)
    }

    if (id === undefined) {
        throw new Error(`id can not be null/undefined`)
    }

    o.setValue({ id });
    const queryResult = await query(o.querySQL());
    const resultSet = queryResult ? queryResult.result : [];

    if (resultSet.length === 0) {
        throw new Error(`can not find any instance for ${o.constructor.name} by pk(${id})`);
    } else if (resultSet.length > 1) {
        throw new Error(`find more than 1 instances for ${o.constructor.name} by pk(${id})`);
    }

    return resultSet[0];
}

const dbService = {
    add,
    del,
    query,
    update,
    getById,
    getViewById,
}

module.exports = dbService;