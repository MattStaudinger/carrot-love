import React, { Component } from 'react';

class Input extends Component {
  render() {                
    return (
      <div className="button">
      <input type={this.props.type} value={this.props.value} className={this.props.className} onChange={this.props.onChange} />
      </div>
    );
  }
}

export default Input;
