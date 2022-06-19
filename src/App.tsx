import React, { Component } from 'react';
import Home from './components/views/Home';
import LoginForm from './components/views/LoginForm';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Item from './components/views/Item';
import User from './components/views/User';
import Cart from './components/views/Cart';
import Orders from './components/views/Orders';
import Settings from './components/views/Settings';
import { checkBackupHost } from "./API"
import OrderCheckout from './components/views/OrderCheckout';

class App extends Component {
  container;

  constructor(props: any) {
    super(props)
    this.container = React.createRef();
  }

  render() {
    return (
      <div ref={this.container as React.RefObject<HTMLDivElement>}>
        <Router>
        <Routes>
          <Route path="/" element={<Home container={this.container}/>}></Route>
          <Route path='/search/:query' element={<Home/>}></Route>
          <Route path="/category/:category" element={<Home/>} ></Route>
          <Route path="/login" element={<LoginForm/>}></Route>
          <Route path="/item/:id" element={<Item/>}></Route>
          <Route path="/user" element={<User/>}/>
          <Route path="/user/:username" element={<User/>}/>
          <Route path="/orders" element={<Orders/>}/>
          <Route path="/settings" element={<Settings/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/checkout" element={<OrderCheckout/>}/>
        </Routes>
      </Router>
      </div>
    );
  }
}

export default App;
