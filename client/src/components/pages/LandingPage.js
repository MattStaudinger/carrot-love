import { Box, Grommet, Button, Text, TextInput } from "grommet";
import React, { createRef, Component } from "react";
import { Link } from 'react-router-dom';
import api from '../../api';



class AddPlantView1 extends Component {

handleSubmit = (component) => {
}
  render() {
    return (
      <div className="landing-page">
        <h1>Carrot Love</h1>
        <p>The site which takes care of your plants!</p>
      <div className="block-white">
        <Link  to={api.isLoggedIn() ? "/home" : "/login"}>Get started</Link>
  </div>
  <div className="img">
      <img className="img1" src="../../../carrot-1.png" />
  </div>
       
      </div>
    );
  }

}

export default AddPlantView1;
