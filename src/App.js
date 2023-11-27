import './App.css';
import CSVReader, {getFileDataHeadings} from './CsvReader';
import React, { useState } from 'react';
import {DisplayTable, DisplayBarGraph} from './DisplayData';
import {display_cummulative_amount , cummulative_amount_headings, display_cummulative_amount_bar} from './Analysis';

function App() {
  const [fileData, setFileData] = useState([]);
  const [fileDataHeadings] = useState(getFileDataHeadings());
  const [cummulativeData, setCummulativeData] = useState([]);
  const [cummulativeHeadings] = useState(cummulative_amount_headings());
  const [cummulativeAmountBar, setCummulativeAmountBar] = useState([]);
  
  const pull_data = (data) => {
    setFileData(data);
    setCummulativeData(display_cummulative_amount(data));
  }

  return (
    <div className='app'>
      <div className='title'>
        <h1> Spending Analysis </h1>
      </div>
      <div className='importData'> 
        <CSVReader pull_data={pull_data}/> 
      </div>
      <div className='output'>
        <div className='transactionTable'>
          <DisplayTable rows = {fileData} columns = {fileDataHeadings} title={"Your parsed transactions"}/>
        </div>
        <div className='simplifiedFindings'>
          <DisplayTable 
            rows = {cummulativeData} 
            columns = {cummulativeHeadings} 
            title={"Your cummulative transactions"} 
            updateCummulativeData={updatedData => {
              setCummulativeData(updatedData);
              setCummulativeAmountBar(display_cummulative_amount_bar(updatedData));
            }}
            />
        </div>
        <div className='oneGraph'>
          <DisplayBarGraph rows = {cummulativeAmountBar} />
        </div>
      </div>
  </div>
  );
}

export default App;
