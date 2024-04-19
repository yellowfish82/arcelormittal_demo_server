const db = {
  type: process.env.DB_TYPE || 'sqlite',
  columnType: {
    NUMBER: 0,
    STRING: 1,
    JSON: 2,
  },
};

module.exports = db;
