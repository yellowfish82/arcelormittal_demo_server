// const moment = require('moment');
// const dbService = require('../db');
const configurations = require('../../config');
const dbService = require('../db');

const OT = require('../db/ormapping/ot');
const ThingModel = require('../db/ormapping/thing_model');
const ThingModelProperties = require('../db/ormapping/thing_model_properties');
const AlertCondition = require('../db/ormapping/alert_condition');

const handleMessage = async (message) => {
    // TODO check message
    console.log('handleMessage', message);
    // parese message

    // query related thing instance
    // TODO 鉴权 check sn compare key is correct? 

    // insert OT data
    const otDataEntity = new OT();
    otDataEntity.setValue({

    });

    await dbService.add(otDataEntity.insertSQL());

    // check alert data
    // query thing instance related thing model
    const thingModel = await dbService.getById(new ThingModel(), thing.id);

    const pE = new ThingModelProperties();
    pE.setValue({
        thing_model_id: thingModel.id,
    });
    const properties = await dbService.query(pE.querySQL());

    const alertConditionEntity = new AlertCondition();
    alertConditionEntity.setValue({
        thing_model_id: thingModel.id,
    });
    const alertConditions = await dbService.query(alertConditionEntity.querySQL());

    // assemble properties & alertConditions together

    // traverse message data by property check whether trigger the alert condition
    const alertData = [];

    // store alert data
    const alertDataPromise = alertData.map(async (ad) => {
        try {
            await dbService.add(ad);
        } catch (error) {
            console.error(`add alert data(${ac}): ${error}`);
        }
    });
    await Promise.all(alertDataPromise);

};

const mqttService = {
    handleMessage,
};

module.exports = mqttService;


