const BaseEntity = require('./entity');
const { columnType } = require('../../../config/db');


/**
 *   CREATE TABLE "things" (
 *   "txid" text(100) NOT NULL,
 *   "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
 *   "name" TEXT(100) NOT NULL,
 *   "hash" TEXT(100),
 *   "description" TEXT(1000),
 *   "image" TEXT(1000),
 *   "owner" integer NOT NULL,
 *   "creater" integer NOT NULL,
 *   "equityable" integer(1) DEFAULT 0,
 *   "createtime" text(13) NOT NULL,
 *   FOREIGN KEY ("owner") REFERENCES "user" ("userid") ON DELETE RESTRICT ON UPDATE RESTRICT,
 *   FOREIGN KEY ("creater") REFERENCES "user" ("userid") ON DELETE RESTRICT ON UPDATE RESTRICT
);
 */
class Things extends BaseEntity {
    constructor() {
        super();
        this.tableName = 'things';
        this.columns = {
            "txid": columnType.STRING,
            "id": columnType.NUMBER,
            "name": columnType.STRING,
            "hash": columnType.JSON,
            "description": columnType.STRING,
            "owner": columnType.NUMBER,
            "creater": columnType.NUMBER,
            "createtime": columnType.STRING,
            "updatetime": columnType.STRING,
            "public": columnType.NUMBER
        };
        this.pk = 'id';
    }
}

module.exports = Things;

