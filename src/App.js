import './App.css';
import CSVReader from './CsvReader';
import React, { useState } from 'react';
import TransactionTable from './TransactionTable';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function App() {
  const [fileData, setFileData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [spliced, setSpliced] = useState(false)
  
  const pull_data = (data) => {
    setFileData(data)
    setTableData(fileData)
    // console.log('filedata:', fileData)
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
          <TransactionTable fileData = {fileData}/>
        </div>
      </div>
  </div>
  );
}

export default App;
