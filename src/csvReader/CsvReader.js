import React, { useState } from 'react';
import moment from 'moment';
import {styles} from './csvStyles';

import {
  useCSVReader,
  lightenDarkenColor,
  formatFileSize,
} from 'react-papaparse';
import { CircularProgress, Button } from '@mui/material';

import demoData from '../constants/demo.json';


const DEFAULT_REMOVE_HOVER_COLOR = '#A01919';
const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(
  DEFAULT_REMOVE_HOVER_COLOR,
  40
);




export function getFileDataHeadings(){
  return [
    { field: 'id', headerName: 'ID',flex:1, },
    {
      field: 'date',
      headerName: 'Date',
      type: 'date',flex:1,
    },
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
    }
  ];
}

export default function CSVReader(props) {
  const { CSVReader } = useCSVReader();
  const [zoneHover, setZoneHover] = useState(false);
  const [removeHoverColor, setRemoveHoverColor] = useState(
    DEFAULT_REMOVE_HOVER_COLOR
  );
  const [loading, setLoading] = useState(false);

  const determineStructure = (data) => {
    const headings = {};
    const numbers = {};
    const alphanumeric_regex = new RegExp('[a-zA-Z]');
    const number_regex = new RegExp('^[+-][0-9]*.[0-9][0-9]$');
    const results = data.slice(0, Math.min(6, data.length));
    const date_formats = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
    let date_style;

    results.forEach((result) => {
      result.forEach((value, index) => {
        date_formats.forEach((date) => {
          console.log("checking if date:", value, moment(value, date, true).isValid());
          if (moment(value, date, true).isValid()) {
            headings.date = index;
            date_style = date;
            console.log('date found:', value);
          }
        });
        if (number_regex.test(value)) {
          if (parseFloat(value) < 0) {
            numbers[index] = (numbers[index] || 0) + 1;
          }
        } else if (alphanumeric_regex.test(value)) {
          headings.description = index;
        }
      });
    });

    let max_key = Object.keys(numbers)[0];
    for (const [key, value] of Object.entries(numbers)) {
      if (value > numbers[max_key]) {
        max_key = key;
      }
    }
    headings.amount = max_key;
    console.log("Final headings indices:", headings);
    return [headings, date_style];
  };

  const processResults = (results) => {
    let contains_headings = true;
    for (let j = 0; j < results[0].length; j++) {
      if (!new RegExp('^[a-zA-Z ]*$').test(results[0][j])) {
        contains_headings = false;
      }
    }
    if (contains_headings) {
      results.shift();
    }

    const result = determineStructure(results);

    const headings = result[0];
    const date_style = result[1];
    const tmp = [];

    for (let i = 0; i < results.length; i++) {
      if (results[i].length > 1) {
        tmp.push({
          id: i,
          date: moment(results[i][headings.date], date_style, true),
          amount: parseFloat(results[i][headings.amount]),
          description: results[i][headings.description]
        });
      }
    }
    props.pull_data(tmp);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      props.setDisplayFileInfo(false);
      props.setUploaded(true);
    }, 1000);
  };

  return (
    <>
    { loading ? <CircularProgress /> : 
    <div>
    <CSVReader
      onUploadAccepted={(results) => {
      processResults(results.data);
        setZoneHover(false);
      }}
      onDragOver={(event) => {
        event.preventDefault();
        setZoneHover(true);
      }}
      onDragLeave={(event) => {
        event.preventDefault();
        setZoneHover(false);
      }}
    >
      {({
        getRootProps,
        acceptedFile,
        ProgressBar,
        getRemoveFileProps,
        Remove,
      }) => (
        <>
          <div
            {...getRootProps()}
            style={Object.assign(
              {},
              styles.zone,
              zoneHover && styles.zoneHover
            )}
          >
            {acceptedFile ? (
              <>
                <div style={styles.file}>
                  <div style={styles.info}>
                    <span style={styles.size}>
                      {formatFileSize(acceptedFile.size)}
                    </span>
                    <span style={styles.name}>{acceptedFile.name}</span>
                  </div>
                  <div style={styles.progressBar}>
                    <ProgressBar />
                  </div>
                  <div
                    {...getRemoveFileProps()}
                    style={styles.remove}
                    onMouseOver={(event) => {
                      event.preventDefault();
                      setRemoveHoverColor(REMOVE_HOVER_COLOR_LIGHT);
                    }}
                    onMouseOut={(event) => {
                      event.preventDefault();
                      setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR);
                    }}
                  >
                    <Remove color={removeHoverColor} />
                  </div>
                </div>
              </>
            ) : (
              'Drop CSV file here or click to upload'
            )}
          </div>
        </>
      )}
    </CSVReader>
    <Button variant="contained" onClick={() =>{ processResults(demoData); props.setDisplayDemoUploadedInfo(true)}}>Demo Data</Button>
    </div>
            }
            </>
  );
}