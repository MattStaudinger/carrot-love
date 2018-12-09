import React, { Component } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';

import {
  Grommet,
  FormField,
  TextInput,
  Button,
  Heading,
  Box,
  Image,
} from "grommet";

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
    console.log("CLICK")
    e.preventDefault()
    let data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    }
    api.signup(data)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/add") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }))
  }


  render() {
    return (
      <div className="form">
      <h2>Signup</h2>
        <Box
        margin="large">
        <FormField align="center" htmlFor="text-input" {...this.props}>
          <TextInput
           flex
            justify="center"
            placeholder="username"
            value={this.state.username}
            onChange={(e) => this.handleInputChange("username", e)}
            gap="medium"
            size="medium"
          />
          </FormField>
          <br />
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
          <img  style={{width:"200px"}} src="../../../btn_google_signin_light_normal_web@2x.png" />
          </a>
          </Button>
          </Box >
          <Button color="rgba(120, 188, 97, 1)"  label="Signup"  onClick={(e) => this.handleClick(e)} />
          </Box>
          <Box>
          <p>Already signed up? <Link to="/login">Login</Link></p>

        {this.state.message && <div className="info info-danger">
        {this.state.message}
        </div>}
          </Box>
          </div>
    )


    //   <div className="Signup">
    //     <h2>Signup</h2>
    //     <form>
    //       Username: <input type="text" value={this.state.username} onChange={(e) => this.handleInputChange("username", e)} /> <br />
    //       Email: <input type="email" value={this.state.email} onChange={(e) => this.handleInputChange("email", e)} /> <br />
    //       Password: <input type="password" value={this.state.password} onChange={(e) => this.handleInputChange("password", e)} /> <br />
    //       <button onClick={(e) => this.handleClick(e)}>Signup</button>
    //     </form>
    //     {this.state.message && <div className="info info-danger">
    //       {this.state.message}
    //     </div>}
    //     <Box border={{
    //       "side": "all",
    //       "color": "#78bc61",
    //       "size": "small",
          
    //       }}
    //       round='medium'
    //       width='small'
    //       >
    //       <a href={api.service.defaults.baseURL+"/auth/google"}>
    //         <Google color='#78bc61'/>
    //         <br />
    //         Signup with Google
    //       </a>
    //     </Box>
    //   </div>
    // );
  }
}

export default Signup;
