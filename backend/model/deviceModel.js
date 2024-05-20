const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const DeviceSchema = new Schema(
  {
    device_name: String,
    sensor_type: String,
    // isActive: Boolean,
    lastActive: { type: Date, default: Date.now },
  }
);

const DeviceModel = model("Device", DeviceSchema);

module.exports = DeviceModel;
