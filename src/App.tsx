import React, { Component } from 'react';
import Home from './components/views/Home';
import LoginForm from './components/views/LoginForm';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Item from './components/views/Item';
import { useCookies } from 'react-cookie';
import User from './components/views/User';
import Cart from './components/views/Cart';
import Orders from './components/views/Orders';
import UserDropDownMenu from './components/UserDropDownMenu';
import Settings from './components/views/Settings';

class App extends Component {
  container;

  constructor(props: any) {
    super(props)
    this.container = React.createRef();
  }

  render() {
    const [cookies, setCookie] = useCookies();
    
    return (
      <div ref={this.container as React.RefObject<HTMLDivElement>}>
        <Router>
        <Routes>
  
          <Route path="/" element={<Home container={this.container}/>}></Route>
          <Route path="/category/:category" element={<Home/>} ></Route>
          <Route path="/login" element={<LoginForm/>}></Route>
          <Route path="/item/:id" element={<Item/>}></Route>
          <Route path="/user" element={<User/>}/>
          <Route path="/user/:username" element={<User/>}/>
          <Route path="/orders" element={<Orders/>}/>
          <Route path="/settings" element={<Settings/>}/>
        </Routes>
      </Router>
      </div>
    );
  }
}

export default App;
