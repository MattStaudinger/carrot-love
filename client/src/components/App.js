import React, { Component } from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom';
import AddPlant from './pages/AddPlant';
import Countries from './pages/Countries';
import AddCountry from './pages/AddCountry';
import Secret from './pages/Secret';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './navbar/Navbar';
import api from '../api';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: []
    }
    // api.loadUser();
  }

  handleLogoutClick(e) {
    api.logout()
  }

  render() {
    return (
      <div className="App">
          <Navbar />
        <Switch>
          <Route path="/" exact component={AddPlant} />
          {/* <Route path="/collection" component={Collection} />
          <Route path="/calender" component={Calender} /> */}
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/secret" component={Secret} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
