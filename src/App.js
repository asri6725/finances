import './App.css';
import CSVReader, {getFileDataHeadings} from './CsvReader';
import React, { useState } from 'react';
import {DisplayTable} from './DisplayData';
import {display_cummulative_amount , cummulative_amount_headings} from './Analysis';

function App() {
  const [fileData, setFileData] = useState([]);
  const [fileDataHeadings] = useState(getFileDataHeadings());
  const [cummulativeData, setCummulativeData] = useState([]);
  const [cummulativeHeadings] = useState(cummulative_amount_headings());
  
  const pull_data = (data) => {
    setFileData(data);
    setCummulativeData(display_cummulative_amount(data));
  }

  // useEffect(() =>{
  //   var data = cumulative_amount(fileData);
  //   console.log("Data updated, cummulative data:", data);
  //   setCummulativeData(data);
  // })
  
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
          <DisplayTable rows = {fileData} columns = {fileDataHeadings} title={"Your parsed transactions."}/>
        </div>
        <div className='insights'>
          <DisplayTable rows = {cummulativeData} columns = {cummulativeHeadings} title={"Your cummulative transactions."} />
        </div>
      </div>
  </div>
  );
}

export default App;
