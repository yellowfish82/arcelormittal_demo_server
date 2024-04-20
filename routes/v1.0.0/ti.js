const controllers = require('../../controller');
const configurations = require('../../config');

const Router = require('express-promise-router');
const router = new Router();

module.exports = router;

router.post('/', async (req, res, next) => {
    try {
        const result = await controllers.thing.createInstance(req);

        const { status, message, } = result;
        res.status(status).send(message);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const result = await controllers.thing.delInstance(req);
        const { status, message } = result;
        res.status(status).send(message);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const result = await controllers.thing.getInstance(req);

        const { status, message, } = result;
        res.status(status).send(message);
    } catch (error) {
        next(error);
    }
});

router.get('/query', async (req, res, next) => {
    try {
        const result = await controllers.thing.queryInstances(req);

        const { status, message, } = result;
        res.status(status).send(message);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const result = await controllers.thing.updateInstance(req);

        const { status, message, } = result;
        res.status(status).send(message);
    } catch (error) {
        next(error);
    }
});
