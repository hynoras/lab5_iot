// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Visualization = () => {
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [lightIntensityData, setLightIntensityData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tempResponse = await axios.get('http://localhost:3001/api/sensor/get');
        const humResponse = await axios.get('http://localhost:3001/api/sensor/get');
        const lightResponse = await axios.get('http://localhost:3001/api/sensor/get');

        setTemperatureData(tempResponse.data.data);
        setHumidityData(humResponse.data.data);
        setLightIntensityData(lightResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const processChartData = (data, label) => {
    const labels = data.map(d => new Date(d.timestamp).toLocaleString());
    const values = data.map(d => d.value);

    return {
      labels,
      datasets: [
        {
          label,
          data: values,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div className="App">
      <h1>Sensor Data Dashboard</h1>
      <div>
        <h2>Temperature Data</h2>
        <Line data={processChartData(temperatureData, 'Temperature')} />
      </div>
      <div>
        <h2>Humidity Data</h2>
        <Bar data={processChartData(humidityData, 'Humidity')} />
      </div>
      <div>
        <h2>Light Intensity Data</h2>
        <Bar data={processChartData(lightIntensityData, 'Light Intensity')} />
      </div>
    </div>
  );
};

export default Visualization;
