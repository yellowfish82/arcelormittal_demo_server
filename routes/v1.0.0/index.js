
const Router = require('express-promise-router');
const router = new Router();

const thing = require('../v1.0.0/thing');
const data = require('../v1.0.0/data');

router.use('/thing', thing);
router.use('/data', data);

module.exports = router;
