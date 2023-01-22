import React, { useState, CSSProperties } from 'react';
import moment from 'moment';

import {
  useCSVReader,
  lightenDarkenColor,
  formatFileSize,
} from 'react-papaparse';

const GREY = '#CCC';
const GREY_LIGHT = 'rgba(255, 255, 255, 0.4)';
const DEFAULT_REMOVE_HOVER_COLOR = '#A01919';
const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(
  DEFAULT_REMOVE_HOVER_COLOR,
  40
);
const GREY_DIM = '#686868';

const styles = {
  zone: {
    alignItems: 'center',
    border: `2px dashed ${GREY}`,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    padding: 20,
  } ,
  file: {
    background: 'linear-gradient(to bottom, #EEE, #DDD)',
    borderRadius: 20,
    display: 'flex',
    height: 120,
    width: 120,
    position: 'relative',
    zIndex: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  } ,
  info: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
  } ,
  size: {
    backgroundColor: GREY_LIGHT,
    borderRadius: 3,
    marginBottom: '0.5em',
    justifyContent: 'center',
    display: 'flex',
  } ,
  name: {
    backgroundColor: GREY_LIGHT,
    borderRadius: 3,
    fontSize: 12,
    marginBottom: '0.5em',
  } ,
  progressBar: {
    bottom: 14,
    position: 'absolute',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  } ,
  zoneHover: {
    borderColor: GREY_DIM,
  } ,
  default: {
    borderColor: GREY,
  } ,
  remove: {
    height: 23,
    position: 'absolute',
    right: 6,
    top: 6,
    width: 23,
  } ,
};

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
  */

  const determineStructure = (data) => {
    var headings = {}
    var numbers = {}
    var results = data.slice(0,Math.max(6, data.length));
    results.map( (result, index) => {
      var contains_headings = true;
      if(index===0){
        for(var i=0; i<result.length; i++){
          if(parseFloat(result[i]) !== NaN){
            contains_headings = false;
          }
        }
      }
      if(contains_headings){
        results = data.slice(1,Math.max(6, data.length));
      }

      for(var i=0; i<result.length; i++){
        if(moment(result[i], 'DD/MM/YYYY', true).isValid()){
          headings.date = i;
        }
        else if(parseFloat(result[i]) !== NaN){
          if(parseFloat(result[i]) < 0){
            if(!numbers[i]){
              numbers[i] = 1;
            }
            else{
              numbers[i] += 1;
            }
          }
        }
        else if(parseFloat(result[i]) === NaN){
          console.log("got here")
          headings.description = i;
        }
      }
    })
    var max_key = 0;
    for(const[key, value] of Object.entries(numbers)){
      if(value > numbers[max_key]){
        max_key = key;
      }
    }
    headings.amount = max_key;
    console.log(headings)
    return headings;
  }

  const processResults = (results) => {
    var tmp = []
    var headings = determineStructure(results);
    for(var i=0; i<results.length; i++){
      if (results[i].length > 1){
        tmp.push({
          'id':i,
          'date':moment(results[i][headings.date], 'DD/MM/YYYY', true),
          'amount':parseFloat(results[i][headings.amount]),
          'description':results[i][headings.description]
      });
      }
    }
    console.log('tmp:',tmp)
    props.pull_data(tmp);
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