const BaseEntity = require('./entity');
const { columnType } = require('../../../config/db');


/**
 *   CREATE TABLE "thing_model" (
 *     "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
 *     "name" text(60) NOT NULL,
 *     "description" TEXT(500)
 *   );
 */
class ThingModel extends BaseEntity {
    constructor() {
        super();
        this.tableName = 'thing_model';
        this.columns = {
            "id": columnType.NUMBER,
            "name": columnType.STRING,
            "description": columnType.STRING,
        };
        this.pk = 'id';
    }
}

module.exports = ThingModel;

