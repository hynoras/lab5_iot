const express = require('express');
const router = express.Router();
const controller = require('../controller/sensorDataController');

router.post('/save', controller.saveData);
router.get('/getAll', controller.getData);
router.get('/getAllData', controller.getAllData);


module.exports = router;
