import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import api from '../../api';
import { Home, Power, Logout } from "grommet-icons";


class Navigation extends Component {

  handleLogoutClick(e) {
    api.logout()
  }
  
  render() {
    return (
      <div>
         {api.isLoggedIn() && <div className='App-header'>
          {api.isLoggedIn() && <NavLink to="/home">
            <Home color='#f1f7ed' size='medium' className='HomeButton'/>
          </NavLink>}
          {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>
            <Power color='#f1f7ed' size='medium' className='LogoutButton'/>
          </Link>}
          {!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
          {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
          </div>}
      </div>
    
    );
  }
}

export default Navigation;
