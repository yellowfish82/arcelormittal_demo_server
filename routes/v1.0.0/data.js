const controllers = require('../../controller');
const configurations = require('../../config');

const Router = require('express-promise-router');
const router = new Router();

module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    const result = await controllers.quota.login(req);

    const { status, message, } = result;
    res.status(status).send(message);
  } catch (error) {
    next(error);
  }
});

router.get('/goods', async (req, res, next) => {
  try {
    const result = await controllers.quota.queryGoods(req);

    const { status, message, } = result;
    res.status(status).send(message);
  } catch (error) {
    next(error);
  }
});

router.get('/good/:good_id', async (req, res, next) => {
  try {
    const result = await controllers.quota.getGood(req);

    const { status, message, } = result;
    res.status(status).send(message);
  } catch (error) {
    next(error);
  }
});

router.put('/good', async (req, res, next) => {
  try {
    const result = await controllers.quota.updateGood(req);

    const { status, message, } = result;
    res.status(status).send(message);
  } catch (error) {
    next(error);
  }
});
