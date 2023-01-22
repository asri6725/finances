import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID',flex:1, },
  {
    field: 'date',
    headerName: 'Date',
    type: 'date',flex:1,
  },
  {
    field: 'amount',
    headerName: 'Amount',
    type: 'number',flex:1,
  },
  {
    field: 'description',
    headerName: 'Description',
    flex:1,
    minWidth:350,
  }
];

export default function TransactionTable(props) {
  const rows = props.fileData;
 
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}