const Chance = require('chance');
const chance = new Chance();

const configurations = require('../../../config');
const service = require('../../../service');

const ThingModel = require('../../../service/db/ormapping/thing_model');
const datapool = {};

describe('Use JEST to test CRUD SQLite in Express', () => {
  beforeAll(() => {

  });

  afterAll(async () => {

  });

  describe(`operation RDS sqlite service`, () => {
    test('insert and query RDS sqlite', async () => {
      expect(configurations.db.type).toEqual('sqlite');
      let e = undefined;
      try {
        const thingModelEntity = new ThingModel();
        const name = chance.word();
        const description = chance.sentence();
        thingModelEntity.setValue({
          name,
          description,
        });
        await service.dbService.add(thingModelEntity.insertSQL());

        thingModelEntity.setValue({
          name,
        });

        const thingModels = await service.dbService.query(thingModelEntity.querySQL());
        expect(Array.isArray(thingModels.result)).toEqual(true);
        expect(thingModels.result.length > 0).toEqual(true);

        datapool['id'] = thingModels.result[0].id;
        datapool['name'] = thingModels.result[0].name;
      } catch (error) {
        e = error;
      }

      expect(e).toBeUndefined();
    });

    test('update & get by id RDS sqlite', async () => {
      const { id, name, } = datapool;
      const thingModelEntity = new ThingModel();
      const newName = chance.word();
      thingModelEntity.setValue({
        id,
        name: newName,
      });
      await service.dbService.update(thingModelEntity.updateSQL());

      const thingModel = await service.dbService.getById(new ThingModel(), id);
      expect(thingModel).not.toBeUndefined();
      expect(thingModel.name).not.toEqual(name);
      expect(thingModel.name).toEqual(newName);
    });

    test('delete RDS sqlite', async () => {
      const { id, } = datapool;
      const thingModelEntity = new ThingModel();
      thingModelEntity.setValue({
        id,
      });
      await service.dbService.del(thingModelEntity.delSQL());

      const thingModels = await service.dbService.query(thingModelEntity.querySQL());
      expect(Array.isArray(thingModels.result)).toEqual(true);
      expect(thingModels.result.length == 0).toEqual(true);
    });
  });
});
