const controllers = require('../../controller');
const configurations = require('../../config');

const Router = require('express-promise-router');
const router = new Router();

module.exports = router;

/**
 * 1	登录
 */
router.post('/login', async (req, res, next) => {
  try {
    const result = await controllers.quota.login(req);

    const { status, message, } = result;
    res.status(status).send(message);
  } catch (error) {
    next(error);
  }
});


/**
 * 2	查询货物
 */
router.get('/goods', async (req, res, next) => {
  try {
    const result = await controllers.quota.queryGoods(req);

    const { status, message, } = result;
    res.status(status).send(message);
  } catch (error) {
    next(error);
  }
});

/**
 * 3	货物详细信息
 */
router.get('/good/:good_id', async (req, res, next) => {
  try {
    const result = await controllers.quota.getGood(req);

    const { status, message, } = result;
    res.status(status).send(message);
  } catch (error) {
    next(error);
  }
});

/**
 * 4	额度余额
 */
router.get('/balance/:user_id', async (req, res, next) => {
  try {
    const result = await controllers.quota.getQuotaBalance(req);

    const { status, message, } = result;
    res.status(status).send(message);
  } catch (error) {
    next(error);
  }
});

/**
 * 5	上传额度易货流水
 */
router.post('/flow', async (req, res, next) => {
  try {
    const result = await controllers.quota.createQuotaTransactionFlow(req);

    const { status, message, } = result;
    res.status(status).send(message);
  } catch (error) {
    next(error);
  }
});

/**
 * 6	查询额度交易流水
 */
router.get('/flow', async (req, res, next) => {
  try {
    const result = await controllers.quota.queryquotaTransactionFlow(req);

    const { status, message, } = result;
    res.status(status).send(message);
  } catch (error) {
    next(error);
  }
});

/**
 * 7	货品修改（内容修改，库存减少）
 */
router.put('/good', async (req, res, next) => {
  try {
    const result = await controllers.quota.updateGood(req);

    const { status, message, } = result;
    res.status(status).send(message);
  } catch (error) {
    next(error);
  }
});

/**
 * 8	用户基本信息查询
 */
router.get('/user/info', async (req, res, next) => {
  try {
    const result = await controllers.quota.queryUserInfo(req);

    const { status, message, } = result;
    res.status(status).send(message);
  } catch (error) {
    next(error);
  }
});

/**
 * 9	发布采购信息
 */
router.post('/purchase', async (req, res, next) => {
  try {
    const result = await controllers.quota.publishPurchaseInfo(req);

    const { status, message, } = result;
    res.status(status).send(message);
  } catch (error) {
    next(error);
  }
});

/**
 * 10	采购信息查询
 */
router.get('/purchase', async (req, res, next) => {
  try {
    const result = await controllers.quota.queryPurchaseInfo(req);

    const { status, message, } = result;
    res.status(status).send(message);
  } catch (error) {
    next(error);
  }
});

/**
 * 11	采购信息查询
 */
router.get('/purchase/:purchase_id', async (req, res, next) => {
  try {
    const result = await controllers.quota.getPurchaseInfo(req);

    const { status, message, } = result;
    res.status(status).send(message);
  } catch (error) {
    next(error);
  }
});

/**
 * 12	采购信息报价查询
 */
router.get('/purchase/bid/:bid_id', async (req, res, next) => {
  try {
    const result = await controllers.quota.bidPurchaseInfo(req);

    const { status, message, } = result;
    res.status(status).send(message);
  } catch (error) {
    next(error);
  }
});

/**
 * 13	查询商品类型
 */
router.get('/category', async (req, res, next) => {
  try {
    const result = await controllers.quota.getCategory(req);

    const { status, message, } = result;
    res.status(status).send(message);
  } catch (error) {
    next(error);
  }
});

/**
 * 14	采购信息报价
 */
router.post('/purchase/bid', async (req, res, next) => {
  try {
    const result = await controllers.quota.addBidPurchase(req);

    const { status, message, } = result;
    res.status(status).send(message);
  } catch (error) {
    next(error);
  }
});

/**
 * 15	采购信息报价列表
 */
router.get('/purchase/bid', async (req, res, next) => {
  try {
    const result = await controllers.quota.bidPurchaseList(req);

    const { status, message, } = result;
    res.status(status).send(message);
  } catch (error) {
    next(error);
  }
});

/**
 * 16	发布产品
 */
router.post('/good', async (req, res, next) => {
  try {
    const result = await controllers.quota.createGoodInfo(req);

    const { status, message, } = result;
    res.status(status).send(message);
  } catch (error) {
    next(error);
  }
});

/**
 * 17	采购信息修改
 */
router.put('/purchase', async (req, res, next) => {
  try {
    const result = await controllers.quota.updatePurchaseInfo(req);

    const { status, message, } = result;
    res.status(status).send(message);
  } catch (error) {
    next(error);
  }
});

/**
 * 18	资产额度申请记录
 */
router.get('/apply/records', async (req, res, next) => {
  try {
    const result = await controllers.quota.queryAmountApplyList(req);

    const { status, message, } = result;
    res.status(status).send(message);
  } catch (error) {
    next(error);
  }
});
