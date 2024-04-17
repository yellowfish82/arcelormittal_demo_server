const env = {
  port: process.env.CCE_PORT || 8000,
  port_test: process.env.CCE_TEST_PORT || 7000,
};

module.exports = env;
