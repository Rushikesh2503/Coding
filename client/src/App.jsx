import logo from './logo.svg';
import './App.css';
import { Table } from '@mui/material';
import CustomizedTables from './Components/Table';
import BasicModal from './Components/AllStud';
import BasicSelect from './Components/Sorting';

function App() {
  return (
    <div className="App">
      <h1>CRUD APP</h1>
      <BasicModal />
      <CustomizedTables/>
    </div>
  );
}

export default App;
