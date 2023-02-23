# Simple finances app

Creating an app that would load bank statements. 

The structure of the statements is - 
1. Amount - Money coming in, going out (focusing mostly on money going out).
2. Description - I noticed that for most transactions, the description at one location is the same.
3. Date.

test

### App.js

Home file that calls the other modules.

### CSVReader

1. Uses `react-papaparse` library to parse a csv file to a nested array.  
2. From that, identify the relevant fields - Date, Amount, Transaction Details, Balance; and convert it to a dictionary/json.
3. sends it back to parent (App.js).

### DisplayData

Displays the parsed data.

1. Using Material UI data gird table.

### Analysis

Set of functions that check for the following things - 
1. Cummulative spending based on description.
2. Frequence of spending based on description.