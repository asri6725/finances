import './App.css';
import CSVReader, {getFileDataHeadings} from './csvReader/CsvReader';
import React, { useState } from 'react';
import { DisplaySimpleTable, DisplayTable, DisplayBarGraph, ButtonGroupComponent} from './DisplayData';
import {display_cummulative_amount, display_cummulative_amount_bar} from './Analysis';

function App() {
  const [fileData, setFileData] = useState([]);
  const [fileDataHeadings] = useState(getFileDataHeadings());
  const [cummulativeData, setCummulativeData] = useState([]);
  const [cummulativeAmountBar, setCummulativeAmountBar] = useState({}); // bar graph data based on user input to cummulative data.

  const [userInput, setUserInput] = useState(['Home', 'Home - mortgage', 'Home - rent', 'Food', 'Food - grocery', 'Food - eat out', 'Food - beer',
  'Transport', 'Transport - personal', 'Transport - public', 'Transport - repair', 'Other']);

  const [userInputSelected, setUserInputSelected] = useState ([false, undefined]);
  
  const pull_data = (data) => {
    setFileData(data);
    setCummulativeData(display_cummulative_amount(data));
  }

  const updateUserInput = (data) => {
    setUserInput(prevUserInput => Array.from(new Set([...prevUserInput, data]))); 
  };

  const removeUserInput = (data) => {
    setUserInput(prevUserInput => prevUserInput.filter(item => item !== data));
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
            title={"Your cummulative transactions"} 
            rows = {cummulativeData} 
            userInput = {userInput} 
            userInputSelected = {userInputSelected}
            updateCummulativeData={updatedData => {
              setCummulativeData(updatedData);
              setCummulativeAmountBar(display_cummulative_amount_bar(updatedData));
            }}
            />
          <p>You can use this table to categorise your transactions.</p> <p>At the moment, you have the following categories to choose from. Update them as you wish ^-^</p>
          <ButtonGroupComponent 
          userInput={userInput} 
          updateUserInput = { updatedData => {
            updateUserInput(updatedData)
            }} 
          removeUserInput = {removeUserInput}
          userInputSelected = {userInputSelected}
          setUserInputSelected = {setUserInputSelected}
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
