import logo from './logo.svg';
import './App.css';
import explorer from './data/folderData';
import Folder from './components/Folder';
import { useState } from 'react';

function App() {

  const [explorerData, setExplorerData] = useState(explorer);

  return (
    <div className="App">

      <Folder explorer={explorerData}/>
      
    </div>
  );
}

export default App;
