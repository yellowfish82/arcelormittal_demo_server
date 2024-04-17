const common = {
  uploadPath: process.env.CCE_UPLOAD_PATH || './uploads',
  StorePath: process.env.CCE_STORE_PATH || './files',
  cce_paas_server_name: process.env.CCE_PAAS_SERVER_NAME || 'http://localhost:8000',
  cce_barter_server_name: process.env.CCE_BARTER_SERVER_NAME || 'http://localhost:3000',
  auth_white_list_inner: [
    '/v2.1.1/co/login',
    '/v2.1.1/product/all/category',
    '/v2.1.1/product/query'
  ],
  auth_white_list_outer: [
    `/v2.1.1/co/login`
  ],
  session_invalid_status: 418,
  secret: 'ccesecret',
  issuer: 'cceadmin',
  cce_org: 'cce',
  jwt_algorithms: [
    'HS256'
  ],
  jwt_user: 'user',
  jwt_userId: 'userId',
  jwt_proposer: 'proposer',
  jwt_app: 'app',
  jwt_appowner: 'appowner',
  jwt_issue_time: 'issueTime',
  jwt_issuer: 'issuer',
  jwt_org: 'orgId',
  dashboard_top_thing_num: 3,
  token_effective: {
    take_effect: 1,
    lose_effect: 0,
  },
  cce: '65968a0a7725bff451792429',
  cce_account: '65968a787725bff451792755',
  cce_admin: '6582482ea2ebd68d3a42aae3',
  cce_fee_auth_mark: 'AUTH_ORDER',
  cce_app_auth_mark: 'AUTH_APPKEY',
  cce_order_query_auth_mark: 'AUTH_ORDER',
  cce_service_fee: 0.03,
  api_invoke_price: 0.2,
  test_symbol: 'AAAA ',
  default_test_pwd: process.env.DEFAULT_TEST_PWD,
  lang: {
    'zh': 'zh',
    'en': 'en',
    'ru': 'ru',
  },
  app: {
    CCEBARTER: 'ccebarter',
    owner: 'cce',
    org: 'cce',
  },
  company_status: {
    co: {
      no_info: '0',
      have_info: '1',
      editing_co_info: '2',
    },
    bg: {
      no_cert: '0',
      processing: '1',
      approved: '2',
      reject: '3',
    },
    finance: {
      no_cert: '0',
      processing: '1',
      approved: '2',
      reject: '3',
    },
    member: {
      no_cert: '0',
      processing: '1',
      approved: '2',
      reject: '3',
    },
    quota: {
      no_cert: '0',
      processing: '1',
      approved: '2',
      reject: '3',
    },
  },
  quota_transaction_flow_type: {
    incharge: `0`,
    freeze: `1`,
    trade: `2`,
    withdraw: `3`,
    release: `4`,
  },
  goods_status: {
    procesing: `1`,
    on_shelf: `2`,
    off_shelf: `3`,
    reject: `4`,
  },
  order_status: {
    offered: `1`,
    completed: `2`,
    break_off: `-1`,
  },
  app_status: {
    no_auth_applied: `0`,
    appkey_in_effect: `1`,
    appkey_expired: `-1`,
    appkey_revoke: `-2`,
  },
  remove_role: 'null',
};

module.exports = common;
