import React, { Component } from 'react';

class Input extends Component {
  render() {                
    return (
      <div className="input">
      <input type={this.props.type} value={this.props.value} onChange={this.props.onChange} />
      </div>
    );
  }
}

export default Input;
