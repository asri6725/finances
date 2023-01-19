import React, { useState } from 'react';
import Papa from 'papaparse';

function CsvUploader() {
  const [files, setFiles] = useState([]);
  const [fileData, setFileData] = useState([]);

  const handleFileSelect = (event) => {
    setFiles(event.target.files);
  };

  const handleFileUpload = () => {
    const fileDataArr = [];
    for (let i = 0; i < files.length; i++) {
      Papa.parse(files[i], {
        header: true,
        complete: (result) => {
          fileDataArr.push(result.data);
        }
      });
    }
    console.log(fileDataArr);
    setFileData(fileDataArr)
    console.log(fileData.length)
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileSelect} />
      <button onClick={handleFileUpload}>Upload</button>
      {
        fileData.length === 0 ? <p>Loading..</p>:
        <table>
            <tbody>
            {fileData.map((row, index) => (
                <tr key={index}>
                {row.map((cell, index) => (
                    <td key={index}>{cell}</td>
                ))}
                </tr>
            ))}
            </tbody>
        </table>
        }
    </div>
  );
}

export default CsvUploader;
