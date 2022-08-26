import React, { Component } from 'react';
import Home from './components/views/Home';
import LoginForm from './components/views/LoginForm';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Item from './components/views/Item';
import User from './components/views/User';
import Cart from './components/views/Cart';
import Orders from './components/views/Orders';
import Settings from './components/views/Settings';
import { checkBackupHost } from "./api/spec"
import OrderCheckout from './components/views/OrderCheckout';
import RegisterForm from './components/views/register/RegisterForm';
import { createMuiTheme, createTheme, ThemeProvider } from '@material-ui/core';
import { theme } from './theme/theme';
import ItemAdd from "./components/views/ItemAdd";

class App extends Component {
  container;

  constructor(props: any) {
    super(props)
    this.container = React.createRef();
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div ref={this.container as React.RefObject<HTMLDivElement>}>
          <Router>
            <Routes>
              <Route path="/" element={<Home/>}></Route>
              <Route path='/search/:query' element={<Home />}></Route>
              <Route path="/category/:category" element={<Home />} ></Route>
              <Route path="/login" element={<LoginForm />}></Route>
              <Route path="/item/:id" element={<ThemeProvider theme={theme}><Item/></ThemeProvider>}></Route>
              <Route path="/user" element={<User />} />
              <Route path="/user/:username" element={<User />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<OrderCheckout />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/additem" element={<ItemAdd />} />
            </Routes>
          </Router>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
