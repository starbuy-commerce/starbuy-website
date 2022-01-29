import React from 'react';
import Home from './components/views/Home';
import LoginForm from './components/views/LoginForm';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/category/:category" element={<Home/>}></Route>
        <Route path="/login" element={<LoginForm/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
