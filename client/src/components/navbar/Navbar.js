import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import api from '../../api';

class Navigation extends Component {

  handleLogoutClick(e) {
    api.logout()
  }
  
  render() {
    return (
         <header className="App-header">
          <NavLink to="/" exact>Add</NavLink>
          {api.isLoggedIn() && <NavLink to="/collection">Collection</NavLink>}
          {api.isLoggedIn() && <NavLink to="/home">Home</NavLink>}
          {api.isLoggedIn() && <NavLink to="/calender">Calender</NavLink>}
          {!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
          {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
          {api.isLoggedIn() && <Link to="/add" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link>}
        </header>
    );
  }
}

export default Navigation;
