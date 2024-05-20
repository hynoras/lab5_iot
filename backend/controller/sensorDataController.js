const SensorData = require('../model/sensorDataModel');
const Device = require('../model/deviceModel');
const SensorType = require('../model/sensorTypeModel');

module.exports = {
  saveSystemInformation: async (req, res) => {
    try {
      const { devicename, sensorname, temperature, humidity, value, timestamp } = req.body;

      // Find or create the device
      let device = await Device.find({ devicename });
      if (!device) {
        device = new Device({ devicename });
        await device.save();
      }

      // Find or create the sensor type
      let sensorType = await SensorType.find({ sensorname, devicename: device._id });
      if (!sensorType) {
        sensorType = new SensorType({ devicename: device._id, sensorname });
        await sensorType.save();
      }

      // Save temperature data if present
      if (temperature !== undefined && sensorname === 'DHT22') {
        const newTemperatureData = new SensorData({
          deviceid: device._id,
          sensorid: sensorType._id,
          timestamp: timestamp || Date.now(),
          value: temperature
        });
        await newTemperatureData.save();
      }

      // Save humidity data if present
      if (humidity !== undefined && sensorname === 'DHT22') {
        const newHumidityData = new SensorData({
          deviceid: device._id,
          sensorid: sensorType._id,
          timestamp: timestamp || Date.now(),
          value: humidity
        });
        await newHumidityData.save();
      }

      // Save light intensity data if present
      if (value !== undefined && sensorname === 'BH1750') {
        const newLightData = new SensorData({
          deviceid: device._id,
          sensorid: sensorType._id,
          timestamp: timestamp || Date.now(),
          value: value
        });
        await newLightData.save();
      }

      res.status(201).json({
        error: false,
        message: "Sensor data saved successfully"
      });
    } catch (error) {
      console.error("Error saving sensor data:", error);
      res.status(500).json({
        error: true,
        message: "An error occurred while saving sensor data"
      });
    }
  },

  getTemperatureData: async (req, res) => {
      try {
          const temperatureData = await SensorData.find()
              .populate({
                  path: 'sensorid',
                  match: { sensorname: 'DHT22' }
              })
              .exec();
          
          const filteredTemperatureData = temperatureData.filter(data => data.sensorid && data.sensorid.sensorname === 'DHT22');

          res.status(200).json({
              error: false,
              data: filteredTemperatureData
          });
      } catch (error) {
          console.error("Error retrieving temperature data:", error);
          res.status(500).json({
              error: true,
              message: "An error occurred while retrieving temperature data"
          });
      }
  },

  getHumidityData: async (req, res) => {
    try {
        const humidityData = await SensorData.find()
            .populate({
                path: 'sensorid',
                match: { sensorname: 'DHT22' }
            })
            .exec();
        
        const filteredHumidityData = humidityData.filter(data => data.sensorid && data.sensorid.sensorname === 'DHT22');

        res.status(200).json({
            error: false,
            data: filteredHumidityData
        });
    } catch (error) {
        console.error("Error retrieving humidity data:", error);
        res.status(500).json({
            error: true,
            message: "An error occurred while retrieving humidity data"
        });
    }
  },

  getLightIntensityData: async (req, res) => {
    try {
        const lightIntensityData = await SensorData.find()
            .populate({
                path: 'sensorid',
                match: { sensorname: 'BH1750' }
            })
            .exec();
        
        const filteredLightIntensityData = lightIntensityData.filter(data => data.sensorid && data.sensorid.sensorname === 'BH1750');

        res.status(200).json({
            error: false,
            data: filteredLightIntensityData
        });
    } catch (error) {
        console.error("Error retrieving light intensity data:", error);
        res.status(500).json({
            error: true,
            message: "An error occurred while retrieving light intensity data"
        });
    }
  },

};
