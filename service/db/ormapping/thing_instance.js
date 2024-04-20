const BaseEntity = require('./entity');
const { columnType, } = require('../../../config/db');


/**
 *   CREATE TABLE "thing_instance" (
 *     "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
 *     "thing_model_id" integer,
 *     "sn" TEXT(10) NOT NULL,
 *     "status" integer(1) NOT NULL DEFAULT 0,
 *     "key" TEXT(10) NOT NULL,
 *     "name" TEXT(300) NOT NULL,
 *     "brand" TEXT(300) NOT NULL,
 *     "note" TEXT(500),
 *     "frequency" integer DEFAULT 2,
 *     FOREIGN KEY ("thing_model_id") REFERENCES "thing_model" ("id") ON DELETE CASCADE ON UPDATE CASCADE
 *   );
 */
class ThingInstance extends BaseEntity {
  constructor() {
    super();
    this.tableName = 'thing_instance';
    this.columns = {
      'id': columnType.NUMBER,
      'thing_model_id': columnType.NUMBER,
      'sn': columnType.STRING,
      'key': columnType.STRING,
      'status': columnType.NUMBER,
      'name': columnType.STRING,
      'brand': columnType.STRING,
      'note': columnType.STRING,
      'frequency': columnType.NUMBER,
    };
    this.pk = 'id';
  }
}

module.exports = ThingInstance;

