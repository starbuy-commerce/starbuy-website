import React from 'react';
import Home from './components/views/Home';
import LoginForm from './components/views/LoginForm';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Produto from './components/views/Produto';
 
//import para o teste da página do produto
import notebook from "../src/images/test/notebook.jpg"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/category/:category" element={<Home/>}></Route>
        <Route path="/login" element={<LoginForm/>}></Route>
        <Route path="/produto" element={<Produto img={notebook} formated={'Notebook Ultra UB320 Intel Pentium - Quad-Core 4GB 120GB SSD 14,1” HD LCD'} price={300} delivery={'Segunda-feira, 31 de jan'} description={'O Nobebook Ultra UB320 possui processador Intel Pentium Quad-Core com 4GB de memória RAM e SSD de 120GB para você desfrutar do melhor com mais potência. Tem uma tela de 14,1” de LCD e com Windows 10 para você poder assistir seus filmes e séries com ótima qualidade no seu serviço de streaming predileto, Ah e falando nisso ele também possui um botão atalho que abre automaticamente o aplicativo Netflix para você assistir com rapidez e praticidade(não inclui assinatura). Com o seu design fino e elegante, se torna ideal para qualquer ambiente. Compacto e muito leve, podendo levar para qualquer lugar.'}/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
