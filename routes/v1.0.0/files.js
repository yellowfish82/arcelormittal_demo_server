const controllers = require('../../controller');

const multer = require('multer');
const configurations = require('../../config');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, configurations.common.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
// const storage = multer.memoryStorage();
const upload = multer({ storage, });

const Router = require('express-promise-router');
const router = new Router();

module.exports = router;

router.post('/upload', upload.any(), async (req, res, next) => {
  try {
    const result = await controllers.files.assetFile(req, res);
    const { status, message, } = result;
    res.status(status).send(message);
  } catch (error) {
    next(error);
  }
});
