const common = {
  demo_server_ip: process.env.DEMO_SERVER_IP || 'http://localhost:8000',
  demo_web_app_ip: process.env.DEMO_WEB_APP_IP || 'http://localhost:3000',
  auth_white_list_inner: [
  ],
  auth_white_list_outer: [
  ],
  THING_STATUS: {
    // 停转启停
    STOP: 0,
    RUNNING: 1,
  },
  CONDITION_EXPRESSION: {
    EQUAL: 0, // =
    LARGER: 0, // >
    LARGER_EQUAL: 0, // >=
    SMALLER: 0, // <
    SMALLER_EQUAL: 0, // <=
  },
};

module.exports = common;
