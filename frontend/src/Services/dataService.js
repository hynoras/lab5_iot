// src/services/dataService.js
import axios from 'axios';

const API_URL = 'http://localhoss:3000'; // Replace with your actual API endpoint

export const fetchData = async () => {
  try {
    const response = await axios.get(`${API_URL}/http://localhoss:3000`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data', error);
    return [];
  }
};
