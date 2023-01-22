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
    console.log('filedata:', fileData)
  }
  
  const shiftData = (event) => {
    if(fileData.length !== 0 && event.target.checked && spliced === false){
      console.log('checked removing first row')
      tableData.splice(0,1)
      setSpliced(true)
    }
    if(fileData.length !== 0 && !event.target.checked && spliced === true){
      console.log('not checked adding first row')
      setTableData(fileData)
      setSpliced(false)
      console.log(fileData.length)
      console.log(tableData.length)
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
        <FormControlLabel onChange={ (event) => shiftData(event)} control={<Checkbox />} label="Does the csv contain headings?" />
          <TransactionTable fileData = {fileData}/>
        </div>
      </div>
  </div>
  );
}

export default App;
