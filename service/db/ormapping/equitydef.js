const BaseEntity = require('./entity');
const { columnType, } = require('../../../config/db');


/**
 *   CREATE TABLE "equityDefine" (
 *   "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
 *   "thing" integer NOT NULL,
 *   "rate" real NOT NULL,
 *   "stakeholder" integer NOT NULL,
 *   "definetime" text(13) NOT NULL,
 *   FOREIGN KEY ("thing") REFERENCES "things" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT,
 *   FOREIGN KEY ("stakeholder") REFERENCES "user" ("userid") ON DELETE RESTRICT ON UPDATE RESTRICT
 *   );
 */
class EquityDefine extends BaseEntity {
  constructor() {
    super();
    this.tableName = 'equityDefine';
    this.columns = {
      'id': columnType.NUMBER,
      'thing': columnType.NUMBER,
      'rate': columnType.NUMBER,
      'stakeholder': columnType.NUMBER,
      'creater': columnType.NUMBER,
      'definetime': columnType.STRING,
      'effective': columnType.NUMBER,
    };
    this.pk = 'id';
  }
}

module.exports = EquityDefine;
