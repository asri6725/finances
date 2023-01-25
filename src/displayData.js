import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import './DisplayData.css';
import Paper from '@mui/material/Paper';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  BarSeries,
} from '@devexpress/dx-react-chart-material-ui';

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
  return (
    <Paper>
    <Chart
      data={props.rows}
    >
      <ArgumentAxis />
      <ValueAxis />
      <BarSeries valueField="amount" argumentField="category" />
    </Chart>
  </Paper>
  );
}