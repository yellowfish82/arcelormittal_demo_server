const v1 = require('./v1.0.0');

module.exports = (app) => {
  app.use('/v1.0.0', v1);

  app.get('/', function(req, res, next) {
    res.json({ msg: 'This is CORS-enabled for all origins!', });
  });
};
