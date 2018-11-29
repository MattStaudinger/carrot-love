import React, { Component } from 'react';

class Button extends Component {
  constructor(props) {
    super(props)
    
  }
  render() {                
    return (
      <div className="button">
      <button className={this.props.className} onClick={this.props.onClick}>{this.props.children}</button>
      </div>
    );
  }
}

export default Button;
