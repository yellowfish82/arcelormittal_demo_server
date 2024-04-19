const common = {
  demo_server_ip: process.env.DEMO_SERVER_IP || 'http://localhost:8000',
  demo_web_app_ip: process.env.DEMO_WEB_APP_IP || 'http://localhost:3000',
  auth_white_list_inner: [
  ],
  auth_white_list_outer: [
  ],
};

module.exports = common;
