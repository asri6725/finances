# Simple finances app

Creating an app that would load bank statements. 

## App.js

Home file that calls the other modules.

## CSVReader

1. Uses `react-papaparse` library to parse a csv file to a nested array.  
2. From that, identify the relevant fields - Date, Amount, Transaction Details, Balance; and convert it to a dictionary/json.
3. sends it back to parent (App.js).

## TransactionTable

Displays the parsed data in the form of a table using Material UI data gird.