
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const SensorDataSchema = new Schema(
  {
    device: {type: Schema.Types.ObjectId, ref: "Device"},
    humidity: Number,
    temperature: Number,
    light: Number,
    // led_status:Boolean,
  },
  {
    timestamps: true,
  }
);

const SensorData = model("SensorData", SensorDataSchema);

module.exports = SensorData;