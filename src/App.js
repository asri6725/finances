import './App.css';
import {ExtractText} from './pdf.js';

function App() {
  return (
    <div className="App">
    <input type="file" id="file-id" name="file_name" onChange={() => ExtractText()} />
    <div id="output"></div>
    <div id="json"></div>
  </div>
  );
}

export default App;
