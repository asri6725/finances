import * as React from 'react';
import './DisplayData.css';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { BarChart } from '@mui/x-charts/BarChart';
import Paper from '@mui/material/Paper';

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
          columns={props.columns}
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