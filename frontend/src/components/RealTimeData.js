// src/components/RealTimeData.js
import React, { useState, useEffect } from 'react';
import { fetchData } from '../services/dataService';
import { CSVLink } from 'react-csv';
import * as XLSX from 'xlsx';

const RealTimeData = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const interval = setInterval(async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
      setFilteredData(fetchedData);
    }, 5000); // Fetch data every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    setFilteredData(data.filter(item => item.includes(value)));
  };

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    XLSX.writeFile(workbook, 'data.xlsx');
  };

  return (
    <div>
      <h2>Real-Time Data</h2>
      <input 
        type="text" 
        value={filter} 
        onChange={handleFilterChange} 
        placeholder="Filter data" 
      />
      <button onClick={handleExportToExcel}>Export to Excel</button>
      <CSVLink data={filteredData} filename={"data.csv"}>Export to CSV</CSVLink>
      <table>
        <thead>
          <tr>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RealTimeData;
