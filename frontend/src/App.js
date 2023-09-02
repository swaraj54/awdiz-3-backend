import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import { useContext } from 'react';
import { AuthContext } from './Components/Context/AuthContext';
import Navbar from './Components/Common/Navbar';
import AddProduct from './Components/Seller/AddProduct';
import YourProducts from './Components/Seller/YourProducts';
import Profile from './Components/Profile';
import Allproducts from './Components/Common/Allproducts';
import SinglePorduct from './Components/Buyer/SinglePorduct';
import Cart from './Components/Buyer/Cart';

function App() {
  const { state } = useContext(AuthContext);
  console.log(state?.user, "- user")
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/add-product' element={<AddProduct />} />
        <Route exact path='/your-products' element={<YourProducts />} />
        <Route exact path='/profile' element={<Profile />} />

        <Route exact path='/all-products' element={<Allproducts />} />
        <Route exact path='/single-products/:id' element={<SinglePorduct />} />
        <Route exact path='/cart' element={<Cart />} />

      </Routes>
    </div>
  );
}

export default App;
