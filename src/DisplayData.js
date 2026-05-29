import * as React from 'react';
import { useState } from 'react';
import './DisplayData.css';
import { DataGrid } from '@mui/x-data-grid';
import { BarChart } from '@mui/x-charts/BarChart';
import SendIcon from '@mui/icons-material/Send';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Paper, Chip, TextField, Grid, Alert, IconButton, InputAdornment, Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import CSVDownloader from './csvReader/CSVDownloader';

function cummulative_amount_headings(categories){
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
          flex:1, editable:true
        }
    ];
}

export function DisplayTable(props) {
  const [paginationModel, setPaginationModel] = useState({ pageSize: 7, page: 0 });
  const [height, setHeight] = useState(500);

  const getHeightForPageSize = (pageSize) => {
    const heightMap = { 7: 500, 14: 850, 21: 1220 };
    return heightMap[pageSize] || 500;
  };

  const handlePaginationModelChange = (newModel) => {
    setPaginationModel(newModel);
    setHeight(getHeightForPageSize(newModel.pageSize));
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    const updated = props.rows.map(row => row.id === updatedRow.id ? updatedRow : row);
    props.updateCumulativeData(updated);
    return updatedRow;
  };

  const handleRowClick = (row) => {
    if (props.categoriesSelected[0]) {
      const updatedRow = { ...row.row, category: props.categoriesSelected[1] };
      processRowUpdate(updatedRow);
    }
  };

  return (
    <div className='DisplayTable'>
      <h3>{props.title}</h3>
      {props.categoriesSelected[0] ? (
        <Alert severity="success">
          Category selection is active, just click on the rows to categorise them as {props.categoriesSelected[1]}.
        </Alert>
      ) : (
        <Alert severity="info">
          Category selection is inactive. Please double click the category section on each row to categorise, or select a category from under the table to activate quick category selection.
        </Alert>
      )}

      <Box sx={{ height, width: '100%' }}>
        <DataGrid
          rows={props.rows}
          columns={cummulative_amount_headings(props.categories)}
          paginationModel={paginationModel}
          onPaginationModelChange={handlePaginationModelChange}
          pageSizeOptions={[7, 14, 21]}
          disableSelectionOnClick
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={(error) => {
            console.error('Row update error:', error);
          }}
          onRowClick={handleRowClick}
        />
      </Box>
      <CSVDownloader rows={props.rows} />
    </div>
  );
}

export function DisplayBarGraph(props) {
  const rows = [];
  const columns = [];

  if (props.rows.length !== undefined) {
    props.rows.forEach(element => {
      rows.push(element.text);
      columns.push(element.value);
    });
    let width = 500;
    let height = 300;
    if (rows.length > 6) {
      width = 800;
      height = 400;
    }
    return (
      <Paper>
        <BarChart
          width={width}
          height={height}
          series={[{ data: columns }]}
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
          paginationModel={{ pageSize: 5, page: 0 }}
          pageSizeOptions={[5]}
          disableSelectionOnClick
        />
      </Box>
    </div>
  );
}

export function ButtonGroupComponent(props) {
  const buttonNames = props.categories;
  const [inputText, setInputText] = useState('');
  const [selection, setSelection] = useState([false, undefined]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSendClick = () => {
    props.updateCategories(inputText);
    setInputText('');
  };
  
  const chipSelection = (event, label) => {
    if (event.type === "click") {
      if (selection[0] === false) {
        props.setCategoriesSelected([true, label]);
        setSelection([true, label]);
      } else if (selection[0] === true && label !== selection[1]) {
        props.setCategoriesSelected([true, label]);
        setSelection([true, label]);
      } else if (selection[0] === true && label === selection[1]) {
        props.setCategoriesSelected([false, undefined]);
        setSelection([false, undefined]);
      }
    }
    if (event.type === "delete" && label !== "Other") {
      props.removeCategories(label);
    }
  };

  const chunkedButtonNames = [];
  const chunkSize = 7;

  for (let i = 0; i < buttonNames.length; i += chunkSize) {
    chunkedButtonNames.push(buttonNames.slice(i, i + chunkSize));
  }

  return (
    <div className='button-group-component'>
      {chunkedButtonNames.map((chunk, index) => (
        <Grid container key={index}>
          <Grid item>
            <div className="chip-container">
              {chunk.map((buttonName, idx) => (
                <Chip 
                  label={buttonName}
                  onClick={(event) => chipSelection(event, buttonName)}
                  onDelete={() => chipSelection({ type: 'delete' }, buttonName)}
                  variant={
                    selection[0] === true && selection[1] === buttonName ? 'default' : 'outlined'
                  }
                  key={idx}
                  sx={{ margin: '0 5px' }}
                />
              ))}
            </div>
          </Grid>
        </Grid>
      ))}
      <br />
      <div className="button-container">
        <TextField 
          id="add-input" 
          label="Add category" 
          variant="outlined" 
          value={inputText} 
          onChange={handleInputChange} 
          style={{ flex: '1', marginRight: '8px' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSendClick}>
                  <SendIcon style={{ color: 'primary' }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
    </div>
  );
}

export function DisplayCategories(props) {
  const { enqueueSnackbar } = useSnackbar();

  const copyTableToClipboard = () => {
    const tableContent = props.rows.map(row => `${row.text}\t${row.value}`).join('\n');
    navigator.clipboard.writeText(tableContent)
      .then(() => {
        enqueueSnackbar('Table content copied to clipboard!', { variant: 'success' });
      })
      .catch(err => {
        console.error('Failed to copy:', err);
        enqueueSnackbar('Failed to copy table content.', { variant: 'error' });
      });
  };

  if (props.rows.length === 0) {
    return null;
  }

  return (
    <div className='DisplayTable'>
      <h3>{props.title}</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.text}</TableCell>
                <TableCell>{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" onClick={copyTableToClipboard}>
        Copy Table to Clipboard
      </Button>
    </div>
  );
}