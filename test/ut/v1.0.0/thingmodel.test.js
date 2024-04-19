import request from 'supertest';
import { expect } from '@jest/globals';
const configurations = require('../../../config');
const v = 'v1.0.0';
let app;
const datapool = {};

describe('Use JEST to test an Arcelor Mittal Demo Restful API based on Express', () => {
  beforeAll(() => {
    const spicefactoryApp = require('../../../app');
    app = spicefactoryApp.fetchApp(configurations.env.port_test);
  });

  afterAll(async () => {
    await app.close();
  });

  // describe(`POST /${v}/user/login`, () => {
  //   test('try to login with a not registered username and password', async () => {
  //     const userId = 'Spicefactory';
  //     const pwd = '1';

  //     const response = await request(app).post(`/${v}/user/login`).send({
  //       userId, pwd,
  //     });
  //     datapool['test11'] = 'done';

  //     console.log(JSON.stringify(datapool));

  //     expect(response.statusCode).toBe(200);
  //   });
  // });



});
