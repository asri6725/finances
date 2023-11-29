import React from 'react';
import './CSVDownloader.css';
import { useCSVDownloader } from 'react-papaparse';

export default function CSVDownloader(props) {
  const { CSVDownloader } = useCSVDownloader();

  return (
    <div className='SecondaryButton'>
    <CSVDownloader
      filename={'categorised-transactions'}
      bom={true}
      config={{
        delimiter: ';',
      }}
      data={props.rows}
    >
      EXPORT TO CSV
    </CSVDownloader>
    </div>
  );
}