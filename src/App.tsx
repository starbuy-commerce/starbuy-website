import React from 'react';
import Home from './components/views/Home';
import LoginForm from './components/views/LoginForm';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Item from './components/views/Item';
import { useCookies } from 'react-cookie';
import User from './components/views/User';
import Cart from './components/views/Cart';
import Orders from './components/views/Orders';
import UserDropDownMenu from './components/UserDropDownMenu';

function App() {

  const [cookies, setCookie] = useCookies();

  return (
    <div>
      <Router>
      <Routes>

        <Route path="/" element={<Home/>}></Route>
        <Route path="/category/:category" element={<Home/>} ></Route>
        <Route path="/login" element={<LoginForm/>}></Route>
        <Route path="/item/:id" element={<Item/>}></Route>
        <Route path="/user" element={<User/>}/>
        <Route path="/user/:username" element={<User/>}/>
        <Route path="/orders" element={<Orders/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
