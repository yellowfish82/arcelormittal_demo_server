const BaseEntity = require('./entity');
const { columnType } = require('../../../config/db');


/**
 *   CREATE TABLE "thing_model_properties" (
 *     "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
 *     "thing_model_id" INTEGER NOT NULL,
 *     "name" TEXT(200) NOT NULL,
 *     "min" integer(10) NOT NULL,
 *     "max" integer(10) NOT NULL,
 *     FOREIGN KEY ("thing_model_id") REFERENCES "thing_model" ("id") ON DELETE CASCADE ON UPDATE CASCADE
 *   );
 */
class ThingModelProperties extends BaseEntity {
    constructor() {
        super();
        this.tableName = 'thing_model_properties';
        this.columns = {
            "id": columnType.NUMBER,
            "thing_model_id": columnType.NUMBER,
            "name": columnType.STRING,
            "min": columnType.NUMBER,
            "max": columnType.NUMBER,
        };
        this.pk = 'id';
    }
}

module.exports = ThingModelProperties;

