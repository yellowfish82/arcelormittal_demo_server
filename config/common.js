const common = {
  uploadPath: process.env.CCE_UPLOAD_PATH || './uploads',
  demo_server_ip: process.env.DEMO_SERVER_IP || 'http://localhost:8000',
  demo_web_app_ip: process.env.DEMO_WEB_APP_IP || 'http://localhost:3000',
  auth_white_list_inner: [
  ],
  auth_white_list_outer: [
  ],
  THING_STATUS: {
    // 运转启停
    STOP: 0,
    RUNNING: 1,
  },
  CONDITION_EXPRESSION: {
    EQUAL: 1, // =
    LARGER: 2, // >
    LARGER_EQUAL: 3, // >=
    SMALLER: 4, // <
    SMALLER_EQUAL: 5, // <=
  },
  MQTT_TOPIC: 'ARCELOR_MITTAL_DEMO_TOPIC',
  DICTIONARY_PATH: 'scowl-orig.txt',
  CONTRACT_TYPE: {
    TECH: 'TechnologyDevelopmentContract',
    SALES: 'SALES CONTRACT'
  }
};

module.exports = common;
