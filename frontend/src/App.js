import React from 'react';
import Header from './components/Header/Header';
import DeviceList from './components/Device List/DeviceList';
import GeneralInfo from './components/General Info/GeneralInfo';
import Visualization from './components/Visualization/index';
import RealTimeData from './components/RealTimeData';

function App() {
  return (
    <div className="App">
      <Header /> {/* Render the Header component */}
      <main>
        <GeneralInfo /> {/* Render the GeneralInfo component */}
        <DeviceList /> {/* Render the DeviceList component */}
        <Visualization />
      </main>
    </div>
  );
}

export default App;