import request from 'supertest';
import { expect } from '@jest/globals';
const Chance = require('chance');
const chance = new Chance();

const configurations = require('../../../config');
const v = 'v1.0.0';
let app;
const datapool = {};

describe('Use JEST to test an Arcelor Mittal Demo Restful API based on Express', () => {
  beforeAll(() => {
    const arcelormittalApp = require('../../../app');
    app = arcelormittalApp.fetchApp(configurations.env.port_test);
  });

  afterAll(async () => {
    await app.close();
  });

  describe(`GET /${v}/tm/query`, () => {
    test('try to query all thing models', async () => {
      const response = await request(app).post(`/${v}/tm/query`).send();

      expect(response.statusCode).toBe(200);

      datapool['model_id'] = 'done';
    });
  });

  describe(`GET /${v}/tm/:id`, () => {
    test('try to get a thing model', async () => {
      const { model_id } = datapool;
      const response = await request(app).post(`/${v}/tm/${model_id}`).send();

      expect(response.statusCode).toBe(200);
      datapool['model'] = 'done';
    });
  });

  describe(`POST /${v}/ti`, () => {
    test('try to register a thing instance', async () => {
      const { model } = datapool;
      const response = await request(app).post(`/${v}/ti`).send({
        thing_model_id: model.id,
        name: chance.name(),
        brand: chance.animal(),
        note: chance.sentence(),
      });

      expect(response.statusCode).toBe(200);
    });
  });
});
