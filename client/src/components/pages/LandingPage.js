import { Box, Grommet, Button, Text, TextInput } from "grommet";
import React, { createRef, Component } from "react";
import { Link } from 'react-router-dom';



class AddPlantView1 extends Component {

handleSubmit = (component) => {
}
  render() {
    return (
      <div className="landing-page">
      <div className="block-white">
        <h1>Carrot Love</h1>
        <p>Take care of yours plants!</p>
  </div>
  <br />
  <br />
  <div className="flex-row">
        <Link  to="/login">Login</Link>
        <Link to="/signup">
        Signup
        </Link>
        </div>
      </div>
    );
  }

}

export default AddPlantView1;
