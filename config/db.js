const mongoose = require('mongoose');
const { String, Number, Boolean, Mixed, Array } = mongoose.Schema.Types;

const db = {
  type: process.env.CCE_DB_TYPE || 'sqlite',
  columnType: {
    NUMBER: 0,
    STRING: 1,
    JSON: 2,
  },
  typeEnum: {
    mongodb: 'mongodb',
  },
  mongodb: {
    host: process.env.CCE_DB_MONGO_HOST || '127.0.0.1',
    port: process.env.CCE_DB_MONGO_PORT || '27017',
    database: process.env.CCE_DB_MONGO_DATABASE || 'cce',
    user: process.env.CCE_DB_MONGO_USER || 'ccebarter',
    pwd: process.env.CCE_DB_MONGO_PWD || 'ccebarter123',
  },
  meta_collection_name: 'schema',
  meta_collection_schema: {
    collectionName: String,
    keyName: String,
    type: String,
    parentId: String, // '-1' means do not have parent
    size: Number,
    required: Boolean,
    index: Boolean,
    seq: Number,
    indexSeq: Number, // -1 unuse
    indexWay: Number, // 1, ascending; -1 descending; 0 unuse
    followingDivider: Boolean,
    range: {  // max and min all < 0 means unuse range
      max: Number,
      min: Number,
    },
    label: [
      {
        lang: String,
        value: String,
      }
    ],
    isFile: Boolean,
  },
  default_schema: {
    isDefault: Boolean
  },
  schema_type: {
    "String": {
      label: 'String',
      value: String,
    },
    "Number": {
      label: 'Number',
      value: Number,
    },
    "Boolean": {
      label: 'Boolean',
      value: Boolean,
    },
    "Mixed": {
      label: 'Mixed',
      value: Mixed,
    },
    "Array": {
      label: 'Array',
      value: Array,
    },
  }
};

module.exports = db;
