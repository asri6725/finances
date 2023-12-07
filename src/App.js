import './App.css';
import CSVReader, {getFileDataHeadings} from './csvReader/CsvReader';
import React, { useState } from 'react';
import { DisplaySimpleTable, DisplayTable, DisplayBarGraph, ButtonGroupComponent} from './DisplayData';
import {display_cummulative_amount, display_cummulative_amount_bar} from './Analysis';
import CSVDownloader from './csvReader/CSVDownloader';
import Review from './Review';
import { Button } from '@mui/material';
import Alert from '@mui/material/Alert';

function App() {
  const [fileData, setFileData] = useState([]);
  const [fileDataHeadings] = useState(getFileDataHeadings());
  const [cummulativeData, setCummulativeData] = useState([]);
  const [cummulativeAmountBar, setCummulativeAmountBar] = useState({}); // bar graph data based on user input to cummulative data.

  const [userInput, setUserInput] = useState(['Home', 'Home - mortgage', 'Home - rent', 'Food', 'Food - grocery', 'Food - eat out', 'Food - beer',
  'Transport', 'Transport - personal', 'Transport - public', 'Transport - repair', 'Other']);

  const [userInputSelected, setUserInputSelected] = useState ([false, undefined]);
  
  const [displayFileInfo, setDisplayFileInfo] = useState(true);
  const [displayInfo, setDisplayInfo] = useState(true);
  const [displayInfo1, setDisplayInfo1] = useState(false);
  const [displayDemoUPloadedInfo, setdisplayDemoUPloadedInfo] = useState(false);
  
  const pull_data = (data) => {
    setFileData(data);
    setCummulativeData(display_cummulative_amount(data));
    setDisplayInfo1(true);
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
      <div className='Review'>
        <Review />
      </div>
      <div className='importData'> 
        {displayFileInfo ? (
          <>
            <CSVReader pull_data={pull_data} setDisplayFileInfo={setDisplayFileInfo} setdisplayDemoUPloadedInfo={setdisplayDemoUPloadedInfo} /> 
            <div className='transactionTable'>
              <DisplaySimpleTable rows={fileData} columns={fileDataHeadings} title={"Your parsed transactions"}/>
            </div>
            <Button variant="contained" onClick={() => setDisplayFileInfo(false)}>Hide this stuff</Button>
          </>
        ) : (
          <Button variant="contained" onClick={() => setDisplayFileInfo(true)}>Display file info or upload new file</Button>
        )}
        {displayDemoUPloadedInfo ? (
          <><br /><br /><Alert severity="warning" onClose={() => {setdisplayDemoUPloadedInfo(false)}}>Populated all tables with demo data. Have a look around!</Alert></>
        ):<></>}
      </div>
      <div className='output'>
        <div className='simplifiedFindings'>
          {displayInfo1 ? <><br /><Alert severity="success" onClose={() => {setDisplayInfo1(false)}}>Reduced data to categorise by {((cummulativeData.length/fileData.length)*100).toFixed(1)}%.</Alert><br /> </> :
          <></>}
          
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
            <CSVDownloader rows={cummulativeData} />
            <div>
              { displayInfo ? (<>
              <br/><br/>
              <Alert onClose={() => {setDisplayInfo(false)}} severity="info">You can use this table to categorise your transactions.<br/>At the moment, you have the following categories to choose from. Update them as you wish ^-^
              <br/><br/>
              <Button variant='outlined' onClick={()=>setDisplayInfo(false)}>Got it!</Button> </Alert>
              </>
              ) : <></>}
              <br/><br/>
            </div>
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
