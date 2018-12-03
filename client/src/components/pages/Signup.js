import React, { Component } from 'react';
import api from '../../api';
import { Box, Grid, Heading, Paragraph, Image, Button, Collapsible } from 'grommet';
import {Google} from 'grommet-icons';

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
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
    let data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    }

    api.signup(data)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  render() {
    return (
      <div className="Signup">
        <h2>Signup</h2>
        <form>
          Username: <input type="text" value={this.state.username} onChange={(e) => this.handleInputChange("username", e)} /> <br />
          Email: <input type="email" value={this.state.email} onChange={(e) => this.handleInputChange("email", e)} /> <br />
          Password: <input type="password" value={this.state.password} onChange={(e) => this.handleInputChange("password", e)} /> <br />
          <button onClick={(e) => this.handleClick(e)}>Signup</button>
        </form>
        {this.state.message && <div className="info info-danger">
          {this.state.message}
        </div>}
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
            Signup with Google
          </a>
        </Box>
      </div>
    );
  }
}

export default Signup;
