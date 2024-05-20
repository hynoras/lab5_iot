const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sensorTypeSchema = new mongoose.Schema({
  deviceid: {
    type: Schema.Types.ObjectId,
    ref: 'Device'
  },
  sensorname: {
    type: String,
  }
});

const SensorType = mongoose.model('SensorType', sensorTypeSchema);

module.exports = SensorType;
