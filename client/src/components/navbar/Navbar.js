import React, { Component } from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom';
import api from '../../api';

class Navigation extends Component {
  constructor(props) {
    super(props)
   
  }

  handleLogoutClick(e) {
    api.logout()
  }
  
  render() {
    return (
         <header className="App-header">
          <NavLink to="/" exact>Home</NavLink>
          {api.isLoggedIn() && <NavLink to="/collection">Collection</NavLink>}
          {api.isLoggedIn() && <NavLink to="/calender">Calender</NavLink>}
          {!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
          {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
          {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link>}
        </header>
    );
  }
}

export default Navigation;
