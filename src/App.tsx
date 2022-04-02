import React from 'react';
import Home from './components/views/Home';
import LoginForm from './components/views/LoginForm';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Produto from './components/views/Produto';
import { useCookies } from 'react-cookie';
import User from './components/views/User';
import Cart from './components/views/Cart';
import Orders from './components/views/Orders';

function App() {

  const [cookies, setCookie] = useCookies();

  return (
    <div className="pb-10">
      <Router>
      <Routes>
        <Route path="/" element={<Orders/>}></Route>
        <Route path="/category/:category" element={<Home/>} ></Route>
        <Route path="/login" element={<LoginForm/>}></Route>
        <Route path="/item/:id" element={<Produto/>}></Route>
        <Route path="/user" element={<User/>}/>
        <Route path="/user/:username" element={<User/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
