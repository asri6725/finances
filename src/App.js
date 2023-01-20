import './App.css';
import CSVReader from './CsvReader';
import React, { useState } from 'react';
import TransactionTable from './TransactionTable';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function App() {
  const [fileData, setFileData] = useState([]);
  const pull_data = (data) => {
    console.log(data)

    setFileData(data.data)
  }
  const shiftData = () => {
    if(fileData){
      setFileData(fileData.shift())
      console.log(fileData)
    }
  }
  return (
    <div className="App">
      <div className='Title'>
        <h1> Finances </h1>
      </div>
      <div className='Import data'> 
        <CSVReader pull_data={pull_data}/> 
      </div>
      <div className='Output'>
        <div className='TransactionTable'>
        <FormControlLabel onClick={() => shiftData} control={<Checkbox defaultChecked />} label="Does the csv contain headings?" />
          <TransactionTable fileData = {fileData} containsHeading={true}/>
        </div>
      </div>
  </div>
  );
}

export default App;
