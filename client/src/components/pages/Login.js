import React, { Component } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';

import {
  FormField,
  TextInput,
  Button,
  Box,
} from "grommet";


class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      message: null,
    }
  }

  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value
    })
  }

  handleClick(e) {
    e.preventDefault()
    api.login(this.state.email, this.state.password)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/home") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  render() {
    return (
      <div className="form">
      <h2>Login</h2>
        <Box
        margin="large">
        <FormField align="center" htmlFor="text-input" {...this.props}>
          <TextInput
           flex
            justify="center"
            placeholder="email"
            value={this.state.email}
            onChange={(e) => this.handleInputChange("email", e)}
            gap="large"
            size="medium"
            type="email"

          />
          </FormField>
          <br />
<         FormField align="center" htmlFor="text-input" {...this.props}>
          <TextInput
          flex
            justify="center"
            placeholder="password"
            value={this.state.password}
            onChange={(e) => this.handleInputChange("password", e)}
            size="medium"
            type="password"
          />
          </FormField>
          <Box
          margin="medium">
          <Button >
          <a href={api.service.defaults.baseURL+"/auth/google"}> 
          <img  style={{width:"200px"}} src="../../../btn_google_signin_light_normal_web@2x.png" alt="google-login"/>
          </a>
          </Button>
          </Box>
          <Button color="rgba(120, 188, 97, 1)"  label="Login"  onClick={(e) => this.handleClick(e)} />
          </Box>
          <Box>
          <p>Not signed up yet? <Link to="/signup">Signup</Link></p>
        {this.state.message && <div className="info info-danger">
        {this.state.message}
        </div>}
          </Box>
          </div>
    );
  }
}

export default Login;
