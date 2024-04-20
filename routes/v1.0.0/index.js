
const Router = require('express-promise-router');
const router = new Router();

const tm = require('../v1.0.0/tm');
const data = require('../v1.0.0/data');
const ti = require('./ti');

router.use('/tm', tm);
router.use('/data', data);
router.use('/ti', ti);

module.exports = router;
