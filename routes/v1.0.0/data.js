const controllers = require('../../controller');
const configurations = require('../../config');

const Router = require('express-promise-router');
const router = new Router();

module.exports = router;

router.get('/ot/history/:conditions', async (req, res, next) => {
  try {
    const result = await controllers.data.otHistory(req);

    const { status, message, } = result;
    res.status(status).send(message);
  } catch (error) {
    next(error);
  }
});

router.get('/ot/rt/thing/:id', async (req, res, next) => {
  try {
    const result = await controllers.data.otRealtime(req);

    const { status, message, } = result;
    res.status(status).send(message);
  } catch (error) {
    next(error);
  }
});

router.get('/alert/:conditions', async (req, res, next) => {
  try {
    const result = await controllers.data.alertData(req);

    const { status, message, } = result;
    res.status(status).send(message);
  } catch (error) {
    next(error);
  }
});
