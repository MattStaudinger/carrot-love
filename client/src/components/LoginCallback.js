import React, { Component } from 'react'
import api from '../api';

export default class LoginCallback extends Component {
  render() {
    return (
      <div>
        ...Loading
      </div>
    )
  }
  componentDidMount() {
    api.loginGoogleNow()
    this.props.history.push('/')
  }
}

