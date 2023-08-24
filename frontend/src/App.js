import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import { useContext } from 'react';
import { AuthContext } from './Components/Context/AuthContext';

function App() {
  const { state } = useContext(AuthContext);
  console.log(state?.user, "- user")
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />

      </Routes>
    </div>
  );
}

export default App;
