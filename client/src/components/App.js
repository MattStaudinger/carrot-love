import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import AddPlant from './pages/AddPlant';
import Collection from './pages/Collection';
import PlantDetail from './pages/PlantDetail';
import EditPlant from './pages/EditPlant';
import Login from './pages/Login';
import Calender from './pages/Calender';
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
          {api.isLoggedIn() && <Route path="/collection" component={Collection} />}
        {api.isLoggedIn() && <Route path="/calender" component={Calender} /> }
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          {api.isLoggedIn() && <Route exact path="/plant/:name" component={PlantDetail} />}
          {api.isLoggedIn() &&  <Route path="/plant/:name/edit" component={EditPlant} />}
          {/* <Route path="/plant/:name/add" component={EditPlant} /> */}
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
