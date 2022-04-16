
import './App.css';
import Navbar from './Components/Navbar';
import { Routes,Route } from 'react-router-dom';
import HomePage from './Components/HomePage';
import AddCountry from './Components/AddCountry';
import AddCity from './Components/AddCity';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/add-country' element={<AddCountry/>} />
        <Route path='/add-city' element={<AddCity/>} />
      </Routes>
    </div>
  );
}

export default App;
