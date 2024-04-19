const BaseEntity = require('./entity');
const { columnType, } = require('../../../config/db');


/**
 *   CREATE TABLE "ot" (
 *     "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
 *     "timestamp" text(13) NOT NULL,
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
      'timestamp': columnType.STRING,
      'payload': columnType.JSON,
      'thing_id': columnType.NUMBER,
    };
    this.pk = 'id';
  }
}

module.exports = OT;

