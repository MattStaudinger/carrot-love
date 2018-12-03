import React, { Component } from 'react';
import api from '../../api';
import { Box, Grid, Heading, Paragraph, Image, Button, Collapsible } from 'grommet';
import {Google} from 'grommet-icons';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      message: null
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
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  render() {
    return (
      <div className="Login">
        <h2>Login</h2>
        <Box>
        <form>
          Email: <input type="text" value={this.state.email} onChange={(e) => this.handleInputChange("email", e)} /> <br />
          Password: <input type="password" value={this.state.password} onChange={(e) => this.handleInputChange("password", e)} /> <br />
          <button onClick={(e) => this.handleClick(e)}>Login</button>
        </form>
        {this.state.message && <div className="info info-danger">
          {this.state.message}
        </div>}
        </Box>
        <Box border={{
          "side": "all",
          "color": "#78bc61",
          "size": "small",
          
          }}
          round='medium'
          width='small'
          >
          <a href={api.service.defaults.baseURL+"/auth/google"}>
            <Google color='#78bc61'/>
            <br />
            Login with Google
          </a>
        </Box>
      </div>
    );
  }
}

export default Login;
