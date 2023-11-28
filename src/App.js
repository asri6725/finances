import './App.css';
import CSVReader, {getFileDataHeadings} from './csvReader/CsvReader';
import React, { useState } from 'react';
import { DisplaySimpleTable, DisplayTable, DisplayBarGraph, ButtonGroupComponent} from './DisplayData';
import {display_cummulative_amount , cummulative_amount_headings, display_cummulative_amount_bar} from './Analysis';

function App() {
  const [fileData, setFileData] = useState([]);
  const [fileDataHeadings] = useState(getFileDataHeadings());
  const [cummulativeData, setCummulativeData] = useState([]);
  const [cummulativeAmountBar, setCummulativeAmountBar] = useState({}); // bar graph data based on user input to cummulative data.

  const [userInput, setUserInput] = useState(['Home', 'Home - mortgage', 'Home - rent', 'Food', 'Food - grocery', 'Food - eat out', 'Food - beer',
  'Transport', 'Transport - personal', 'Transport - public', 'Transport - repair', 'Other'])
  const [cummulativeHeadings, setCummulativeHeadings] = useState(cummulative_amount_headings(userInput));
  
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
          <DisplaySimpleTable rows = {fileData} columns = {fileDataHeadings} title={"Your parsed transactions"}/>
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
          <p>You can use this table to categorise your transactions.</p>
          <ButtonGroupComponent buttonNames={userInput} 
          updateUserInput = { updatedData => {
            setUserInput(prevUserInput => [...prevUserInput, updatedData]); 
            setCummulativeHeadings(cummulative_amount_headings(userInput));
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
