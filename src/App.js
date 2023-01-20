import './App.css';
import CSVReader from './CsvReader';
import React, { useState } from 'react';
import TransactionTable from './TransactionTable';
function App() {
  const [fileData, setFileData] = useState([]);
  const pull_data = (data) => {
    console.log(data)

    setFileData(data.data)
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
        <p>{fileData}</p>
        <div className='TransactionTable'>
          <TransactionTable fileData = {fileData}/>
        </div>
      </div>
  </div>
  );
}

export default App;
