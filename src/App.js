import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";

import './App.css';
import CSVReader, {getFileDataHeadings} from './csvReader/CsvReader';
import { DisplaySimpleTable, DisplayTable, DisplayBarGraph, ButtonGroupComponent, DisplayCategories} from './DisplayData';
import {display_cummulative_amount, display_cummulative_amount_bar} from './Analysis';
import Review from './Review';
import {Error} from './static_pages/error';
import {Description} from './static_pages/description'

import { Alert, Button } from '@mui/material';
import {SlideDown} from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';


function App(){
  return(
    <Routes>
        <Route path="/spending-analysis">
          <Route index element={<Description />} />
          <Route path="tracker" element={<Calculator />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
  )
}

function Calculator() {
  const [fileData, setFileData] = useState([]);
  const [fileDataHeadings] = useState(getFileDataHeadings());
  const [cummulativeData, setCummulativeData] = useState([]);
  const [cummulativeAmountBar, setCummulativeAmountBar] = useState({}); // bar graph data based on user input to cummulative data.

  const [categories, setcategories] = useState(['Home', 'Grocery', 'Eating out', 'Transport', 'Other']);

  const [categoriesSelected, setcategoriesSelected] = useState ([false, undefined]);
  
  const [displayFileInfo, setDisplayFileInfo] = useState(true);
  const [displayInfo1, setDisplayInfo1] = useState(false);
  const [displayDemoUPloadedInfo, setdisplayDemoUPloadedInfo] = useState(false);
  const [uploaded, setUploaded] = useState(false)
  
  const pull_data = (data) => {
    setFileData(data);
    setCummulativeData(display_cummulative_amount(data));
    setDisplayInfo1(true);
  }

  const updatecategories = (data) => {
    setcategories(prevcategories => Array.from(new Set([...prevcategories, data]))); 
  };

  const removecategories = (data) => {
    setcategories(prevcategories => prevcategories.filter(item => item !== data));
  }

  return (
    <div className='app'>
      <div className='title'>
        <h1> Spend Tracker </h1>
      </div>
      <div className='Review'>
        <Review />
      </div>
      <SlideDown className={'my-dropdown-slidedown'}>
      <div className='importData'> 
        {displayFileInfo ? (
          <>
            <CSVReader pull_data={pull_data} setDisplayFileInfo={setDisplayFileInfo} setdisplayDemoUPloadedInfo={setdisplayDemoUPloadedInfo} setUploaded={setUploaded}/> 
            <div>
              <br/><br/>
              <Alert severity="info">The reader looks for the following fields in the CSV file by looking at its text:<br /><br />1. 'description': containing text and spaces.<br />2. 'transactions': numbers begining with +/- ending with .XX . As this is a spending tool, only the outgoing amounts are filtered for further consideration.<br /> 3. 'date': one of the following string types: ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'].<br />The headings are ignored to reduce dependency on the banks' format.<br /><br /> All of this happens automatically, and there is no manual way for users to specify these fields. Please tell me if there are any issues using the feedback section. </Alert>
              <br/><br/>
            </div>
            <div className='transactionTable'>
              {
                uploaded ? <>
                  <DisplaySimpleTable rows={fileData} columns={fileDataHeadings} title={"Your parsed transactions"}/> 
                  <Button variant="contained" onClick={() => setDisplayFileInfo(false)}>Hide this stuff</Button>
                  </>
                : <></>
             }
            </div>
          </>
        ) : (
          <Button variant="contained" onClick={() => setDisplayFileInfo(true)}>Display file info or upload new file</Button>
        )}
        {displayDemoUPloadedInfo ? (
          <><br /><br /><Alert severity="warning" onClose={() => {setdisplayDemoUPloadedInfo(false)}}>Populated all tables with demo data.<br /> Have a look around!<br /></Alert></>
        ):<></>}
      </div>
      </SlideDown>
      {uploaded ? 
      <div className='output'>
        <div className='simplifiedFindings'>
          {displayInfo1 ? <><br /><Alert severity="success" onClose={() => {setDisplayInfo1(false)}}>Reduced data to categorise by {((cummulativeData.length/fileData.length)*100).toFixed(1)}%.</Alert><br /> </> :
          <></>}
          
          <DisplayTable 
            title={"Your cummulative transactions"} 
            rows = {cummulativeData} 
            categories = {categories} 
            categoriesSelected = {categoriesSelected}
            updateCummulativeData={updatedData => {
              setCummulativeData(updatedData);
              setCummulativeAmountBar(display_cummulative_amount_bar(updatedData));
            }}
            />
          <ButtonGroupComponent 
          categories={categories} 
          updatecategories = { updatedData => {
            updatecategories(updatedData)
            }} 
          removecategories = {removecategories}
          categoriesSelected = {categoriesSelected}
          setcategoriesSelected = {setcategoriesSelected}
            />
        </div>
        <div className='oneGraph'>
          <DisplayBarGraph rows = {cummulativeAmountBar} />
        </div>
        <div>
        <DisplayCategories rows = {cummulativeAmountBar} title="Categories" />
          </div>
      </div>
      :<></>}
  </div>
  );
}

export default App;
