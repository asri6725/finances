import React, { useState } from 'react';
import moment from 'moment';
import {styles} from './csvStyles';

import {
  useCSVReader,
  lightenDarkenColor,
  formatFileSize,
} from 'react-papaparse';


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

  /*
    Determine the structure of csv. I need - Date, Amount, Description.
    Date - location is determined by moment js.
    Amount - This is the column of csv with max amounts of negative transactions - $-1 coffee, etc
    Description - Is not a number.

    Check whether the first row contains headings - to skip it. If there is a number in the first row, it doens't contain headings.

    Regex to check for +/- XXX.XX numbers - ^[+-][0-9]*.[0-9][0-9]$
    Regex to check for atleast one alphabet - [a-zA-Z]
    Regex to check for just alphabets - ^[a-zA-Z]*$
  */

  const determineStructure = (data) => {
    var headings = {}
    var numbers = {}
    const alphanumeric_regex = new RegExp('[a-zA-Z]');
    const number_regex = new RegExp('^[+-][0-9]*.[0-9][0-9]$');
    var results = data.slice(0,Math.min(6, data.length));
    results.map( (result) => {
      result.map ( (value, index) => {
        if(moment(value, 'DD/MM/YYYY', true).isValid()){
          headings.date = index;
        }
        else if(number_regex.test(value)){
          if(parseFloat(value) < 0){
            if(!numbers[index]){
              numbers[index] = 1;
            }
            else{
              numbers[index] += 1;
            }
          }
        }
        else if(alphanumeric_regex.test(value)){
          headings.description = index;
        }
        return 0;
      })
      return 0;
    })

    var max_key = Object.keys(numbers)[0];
    for(const[key, value] of Object.entries(numbers)){
      if(value > numbers[max_key]){
        max_key = key;
      }
    }
    headings.amount = max_key;
    return headings;
  }

  const processResults = (results) => {

    // shift if first row contains headings
    var contains_headings = true;
    for(var j=0; j<results[0].length; j++){
      if(!new RegExp('^[a-zA-Z ]*$').test(results[0][j])){
        contains_headings = false;
      }
    }
    if(contains_headings){
      results.shift();
    }

    var headings = determineStructure(results);
    var tmp = []

    for(var i=0; i<results.length; i++){
      if (results[i].length > 1){
        tmp.push({
          'id':i,
          'date':moment(results[i][headings.date], 'DD/MM/YYYY', true),
          // 'date':results[i][headings.date],
          'amount':parseFloat(results[i][headings.amount]),
          'description':results[i][headings.description]
      });
      }
    }
    props.pull_data(tmp);
    results = {}
  }

  return (
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
  );
}