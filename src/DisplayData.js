import * as React from 'react';
import { useState } from 'react';
import './DisplayData.css';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { BarChart } from '@mui/x-charts/BarChart';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

function cummulative_amount_headings(userInput){
  return [
      { field: 'id', headerName: 'ID',flex:1, },
      {
          field: 'description',
          headerName: 'Description',
          flex:1,
          minWidth:350,
        },
      {
        field: 'amount',
        headerName: 'Amount',
        type: 'number',flex:1,
      },
      {
          field: 'count',
          headerName: 'Count',
          type: 'number',flex:1,
        },
        {
          field: 'frequency',
          headerName: 'Frequency (every x days)',
          type: 'number',flex:1,
        },
        {
          field: 'category',
          headerName: 'Category',
          type: 'singleSelect',flex:1, editable:true,
          valueOptions: Array.from(new Set(userInput))
        }
    ];
}

export function DisplayTable(props) { 
  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    var tmp = [...props.rows]
    for(let i=0; i<tmp.length; i++){
      if(tmp[i].id === updatedRow.id){
        tmp[i] = updatedRow;
        break;
      }
    }
    //handle send data to api
    props.updateCummulativeData(tmp)
    return updatedRow;
  };
  return (
    <div className='DisplayTable'>
      <h3>{props.title}</h3>
      <Box sx={{ height: 650, width: '100%' }}>
        <DataGrid
          rows={props.rows}
          columns={cummulative_amount_headings(props.userInput)}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 15]}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={(error) => {console.log(error)}}
        />
      </Box>
    </div>
  );
}

export function DisplayBarGraph(props){
  var rows = [];
  var columns = [];

  if(props.rows.length !== undefined){
    props.rows.forEach(element => {
      rows.push(element.text)
      columns.push(element.value)
    });
    var width = 500
    var height = 300
    if(rows.length > 6){
      width = 800
      height=400
    }
    return (
      <Paper>
        <BarChart
        width={width}
        height={height}
        series={[{ data: columns}]}
        xAxis={[{ data: rows, scaleType: 'band' }]}
      />
      </Paper>
    );
  }
  
}

export function DisplaySimpleTable(props) { 
  return (
    <div className='DisplayTable'>
      <h3>{props.title}</h3>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={props.rows}
          columns={props.columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </Box>
    </div>
  );
}

export function ButtonGroupComponent(props) {
  var buttonNames = props.userInput
  const [inputText, setInputText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleButtonClick = () => {
    props.updateUserInput(inputText);
    setInputText('');
  };
  
  const chipSelection = (event, label) => {
    if(event.type === "click"){

    }
    if(event.type === "delete" && label !== "Other"){
      props.removeUserInput(label);
    }
  }

  var chunkedButtonNames = [];
  const chunkSize = 7;

  for (let i = 0; i < buttonNames.length; i += chunkSize) {
    chunkedButtonNames.push(buttonNames.slice(i, i + chunkSize));
  }

  return (
    <div>
    <>
      {chunkedButtonNames.map((chunk, index) => (
        <Grid container spacing={2} key={index}>
          <Grid item xs={12}>
            <div className="chip-container">
              {chunk.map((buttonName, idx) => (
                <Chip 
                label={buttonName}
                onClick={(event) => chipSelection(event, buttonName)}
                onDelete={() => chipSelection({ type: 'delete' }, buttonName)}
                key={idx}
                />
              ))}
            </div>
          </Grid>
        </Grid>
      ))}
    </>
    <br></br>
    <div className="button-container">
      <TextField id="add-input" label="Add category" variant="outlined" value={inputText} 
      onChange={handleInputChange} 
      style={{ flex: '1', marginRight: '8px' }}
      />
      <Button onClick={handleButtonClick} style={{ height: '100%' }}>+</Button>
    </div>
    </div>
  );
};