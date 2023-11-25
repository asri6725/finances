import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import './DisplayData.css';
import Paper from '@mui/material/Paper';
import BarChart from 'react-bar-chart';

export function DisplayTable(props) { 
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
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </div>
  );
}

export function DisplayBarGraph(props){
  const data = props.rows;
  const margin = {top: 20, right: 50, bottom: 30, left: 100};
  return (
    <Paper>
    <BarChart ylabel='Quantity'
                  width={200}
                  height={500}
                  margin={margin}
                  data={data}/>
  </Paper>
  );
}
