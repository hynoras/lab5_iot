const express = require('express');
const router = express.Router();
const controller = require('../controller/sensorDataController');

router.post('/postsensordata', controller.saveSystemInformation);
router.get('/temperature', controller.getTemperatureData);
router.get('/humidity', controller.getHumidityData);
router.get('/lightIntensity', controller.getLightIntensityData);
// router.post('/postdata', controller.postSensorData)
// router.get('/getDevice', controller.getDevice);


module.exports = router;
