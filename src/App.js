import './App.css';
import CSVReader from './CsvReader';
import React, { useState } from 'react';
import {DisplayTable} from './displayData';

function App() {
  const [fileData, setFileData] = useState([]);
  
  const pull_data = (data) => {
    setFileData(data);
  }
  
  return (
    <div className='app'>
      <div className='title'>
        <h1> Finances </h1>
      </div>
      <div className='importData'> 
        <CSVReader pull_data={pull_data}/> 
      </div>
      <div className='output'>
        <div className='transactionTable'>
          <DisplayTable fileData = {fileData}/>
        </div>
        <div className='insights'>

        </div>
      </div>
  </div>
  );
}

export default App;
