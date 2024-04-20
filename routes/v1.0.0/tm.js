const controllers = require('../../controller');
const configurations = require('../../config');

const Router = require('express-promise-router');
const router = new Router();

module.exports = router;

router.post('/', async (req, res, next) => {
    try {
        const result = await controllers.thing.createModel(req);

        const { status, message, } = result;
        res.status(status).send(message);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const result = await controllers.thing.delModel(req);
        const { status, message } = result;
        res.status(status).send(message);
    } catch (error) {
        next(error);
    }
});

router.get('/get/:id', async (req, res, next) => {
    try {
        const result = await controllers.thing.getModel(req);

        const { status, message, } = result;
        res.status(status).send(message);
    } catch (error) {
        next(error);
    }
});

router.get('/query', async (req, res, next) => {
    try {
        const result = await controllers.thing.queryModels(req);

        const { status, message, } = result;
        res.status(status).send(message);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const result = await controllers.thing.updateModel(req);

        const { status, message, } = result;
        res.status(status).send(message);
    } catch (error) {
        next(error);
    }
});
