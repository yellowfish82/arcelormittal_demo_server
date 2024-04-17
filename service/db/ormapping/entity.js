const serviceUtils = require('../../utils');
const { columnType, } = require('../../../config/db');

/**
 * set the following values
 * this.tableName;
 * this.columns; { colname: 0 (is not number), 1 (is number)}
 * this.pk;
 *
 * use setValue() function complete entity assemble
 *
 */
class BaseEntity {
  constructor() {
    this.tableName;
    this.columns;
    this.pk;
    this.value = {};
  }

  insertSQL = () => {
    /**
         * INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY)
         * VALUES (2, 'Allen', 25, 'Texas', 15000.00 );
         */

    let cols = ''; let vals = '';
    Object.keys(this.columns).forEach((c) => {
      if (this.value[c] !== undefined) {
        cols += `${c},`;

        let value;
        if (this.columns[c] === columnType.STRING) {
          this.value[c] = serviceUtils.handleSpecilChar(this.value[c], this.getTableName(), c);
          value = `'${this.value[c]}',`;
        } else if (this.columns[c] === columnType.JSON) {
          value = `'${JSON.stringify(this.value[c])}',`;
        } else {
          value = `${this.value[c]},`;
        }
        vals += value;
      }
    });

    cols = cols.substring(0, cols.length - 1);
    vals = vals.substring(0, vals.length - 1);

    return `INSERT INTO ${this.getTableName()} (${cols}) VALUES (${vals});`;
  };

  delSQL = (condition) => {
    /**
         * DELETE FROM table_name
         * WHERE [condition];
         */
    if (!condition && !this.value[this.pk]) {
      throw new Error(`not offerred pk: ${this.pk}, and current version only support update specified entity`);
    }

    if (!condition && this.value[this.pk]) {
      condition = `${this.pk}=${this.value[this.pk]}`;
    }

    return `DELETE FROM ${this.getTableName()} WHERE ${condition};`;
  };

  updateSQL = (condition) => {
    /**
         * UPDATE table_name
         * SET column1 = value1, column2 = value2...., columnN = valueN
         * WHERE [condition];
         *
         * UPDATE COMPANY SET ADDRESS = 'Texas', SALARY = 20000.00;
         */

    if (!condition && !this.value[this.pk]) {
      throw new Error(`not offerred pk: ${this.pk}, and current version only support update specified entity`);
    }

    if (!condition && this.value[this.pk]) {
      condition = `${this.pk}=${this.value[this.pk]}`;
    }

    let setString = '';

    Object.keys(this.columns).forEach((key) => {
      if (key !== this.pk && this.value[key] !== undefined) {
        let value;
        if (this.columns[key] === columnType.STRING) {
          this.value[key] = serviceUtils.handleSpecilChar(this.value[key], this.getTableName(), key);
          value = `${key}='${this.value[key]}',`;
        } else if (this.columns[key] === columnType.JSON) {
          // console.log(`===============>   ${this.getTableName()} try to set json type value: ${key} -> ${JSON.stringify(this.value[key])}`);
          value = `${key}='${JSON.stringify(this.value[key])}',`;
        } else {
          value = `${key}=${this.value[key]},`;
        }
        setString += value;
      }
    });

    setString = setString.substring(0, setString.length - 1);
    return `UPDATE ${this.getTableName()} SET ${setString} WHERE ${condition};`;
  };

  querySQL = () => {
    /**
        * SELECT column1, column2, columnN FROM table_name;
        * or
        * SELECT * FROM table_name;
        *
        * SELECT * FROM sqlite_master WHERE type = 'table' AND tbl_name = 'COMPANY';
        */

    return `SELECT * FROM ${this.getTableName()} WHERE ${this.getCondition()};`;
  };

  getTableName = () => {
    if (!this.tableName) {
      throw new Error('table name not defined');
    }

    return this.tableName;
  };

  setValue = (v) => {
    Object.keys(v).forEach((key) => {
      if (Object.keys(this.columns).indexOf(key) < 0) {
        throw new Error(`${key} is invalid in ${this.getTableName()}`);
      }
    });
    this.value = v;
  };

  getCondition = () => {
    let conditions = '1=1';

    Object.keys(this.columns).forEach((key) => {
      if (this.value[key] !== undefined) {
        let value;
        if (this.columns[key] === columnType.STRING) {
          this.value[key] = serviceUtils.handleSpecilChar(this.value[key], this.getTableName(), key);
          value = ` AND ${key}='${this.value[key]}'`;
        } else if (this.columns[key] === columnType.JSON) {
          value = ` AND ${key}='${JSON.stringify(this.value[key])}',`;
        } else {
          value = ` AND ${key}=${this.value[key]}`;
        }
        conditions += value;
      }
    });

    return conditions;
  };

  getValue = (key) => this.value[key];
}

module.exports = BaseEntity;
