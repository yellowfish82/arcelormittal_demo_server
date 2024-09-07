
const Router = require('express-promise-router');
const router = new Router();

const tm = require('../v1.0.0/tm');
const data = require('../v1.0.0/data');
const files = require('../v1.0.0/files');
const ti = require('./ti');

router.use('/tm', tm);
router.use('/data', data);
router.use('/files', files);
router.use('/ti', ti);

module.exports = router;
