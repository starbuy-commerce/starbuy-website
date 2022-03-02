import React from 'react';
import Home from './components/views/Home';
import LoginForm from './components/views/LoginForm';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Produto from './components/views/Produto';
 
//import para o teste da página do produto
import notebook from "../src/images/test/notebook.jpg"

function App() {
  return (
    <div className="pb-10">
      <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/category/:category" element={<Home/>} ></Route>
        <Route path="/login" element={<LoginForm/>}></Route>
        <Route path="/item/:id" element={<Produto/>}></Route>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
