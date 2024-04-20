const BaseEntity = require('./entity');
const { columnType, } = require('../../../config/db');


/**
 *   CREATE TABLE "ot" (
 *     "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
 *     "timestamp" integer NOT NULL,
 *     "payload" TEXT(900) NOT NULL,
 *     "thing_id" integer,
 *     FOREIGN KEY ("thing_id") REFERENCES "thing_instance" ("id") ON DELETE CASCADE ON UPDATE CASCADE
 *   );
 */
class OT extends BaseEntity {
  constructor() {
    super();
    this.tableName = 'ot';
    this.columns = {
      'id': columnType.NUMBER,
      'timestamp': columnType.NUMBER,
      'payload': columnType.JSON,
      'thing_id': columnType.NUMBER,
    };
    this.pk = 'id';
  }
}

module.exports = OT;

