
const Chance = require('chance');
const chance = new Chance();

const configurations = require('../../../config');
const service = require('../../../service');

const User = require('../../../service/db/ormapping/user');
const Org = require('../../../service/db/ormapping/org');
const datapool = {};

describe('Use JEST to test an Spicefactory Restful API based on Express', () => {
  beforeAll(() => {

  });

  afterAll(async () => {

  });

  describe(`operation RDS sqlite service`, () => {
    test('insert RDS sqlite', async () => {
      expect(configurations.db.type).toEqual('sqlite');
      let e = undefined;
      try {
        const orgEntity = new Org();
        const orgName = chance.word();
        orgEntity.setValue({
          name: orgName,
          description: chance.sentence(),
        });
        await service.dbService.add(orgEntity.insertSQL());

        const userEntity = new User();
        const pwd = chance.string({ length: 5, });
        const name = chance.name();
        userEntity.setValue({
          org: orgName,
          name,
          pwd,
        });
        const userId = await service.dbService.add(userEntity.insertSQL());

        datapool['userId'] = userId;
        datapool['userName'] = name;
        datapool['originalpwd'] = pwd;
      } catch (error) {
        e = error;
      }

      expect(e).toBeUndefined();
    });

    test('update & get by id RDS sqlite', async () => {
      const { userId, originalpwd, } = datapool;
      const userEntity = new User();
      const pwd = chance.string({ length: 5, });
      userEntity.setValue({
        id: userId,
        pwd,
      });
      await service.dbService.update(userEntity.updateSQL());

      const user = await service.dbService.getById(new User(), userId);
      expect(user).not.toBeUndefined();
      expect(user.pwd).not.toEqual(originalpwd);
    });

    test('query RDS sqlite', async () => {
      const { userId, userName, } = datapool;
      const userEntity = new User();
      userEntity.setValue({
        id: userId,
        name: userName,
      });
      const userSet = await service.dbService.query(userEntity.querySQL());
      expect(userSet).not.toBeUndefined();
      expect(Array.isArray(userSet.result)).toEqual(true);
      expect(userSet.result.length > 0).toEqual(true);
    });

    test('query view RDS sqlite', async () => {
      const coinaccount = await service.dbService.getViewById('coinAccountView', configurations.common.spicefactory_account.BTH);
      expect(coinaccount).not.toBeUndefined();
      expect(coinaccount.owner).not.toBeUndefined();
      expect(coinaccount.ownerName).not.toBeUndefined();
    });

    test('delete RDS sqlite', async () => {
      const { userId, } = datapool;
      const userEntity = new User();
      userEntity.setValue({
        id: userId,
      });
      await service.dbService.del(userEntity.delSQL());

      const userSet = await service.dbService.query(userEntity.querySQL());
      expect(userSet).not.toBeUndefined();
      expect(Array.isArray(userSet.result)).toEqual(true);
      expect(userSet.result.length === 0).toEqual(true);
    });
  });
});
