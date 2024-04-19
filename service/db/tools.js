const antiSQLInjection = (sql) => {
  // const re = /insert|select|update|delete|exec|count|>|</i;
  // if (re.test(sql)) {
  //   throw new Error(`invalid sql ${sql}`);
  // }

  // TODO
};


const dbTools = {
  antiSQLInjection,
};

module.exports = dbTools;
