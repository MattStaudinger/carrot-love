import React, { Component } from 'react';
import api from '../../api';
import { Route, Link, Switch } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';


class EditPlant extends Component {
  constructor(props) {
    super(props)
    this.state = {
      plantdetails: []
    } 
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            name="name"
            type="string"
            value={this.state.plantdetails.name}
            onChange={this.handleChange} />
        </label>
        <label>
          Watering Interval:
          <input
            name="name"
            type="string"
            placeholder={this.state.plantdetails.name}
            onChange={this.handleChange} />
        </label>
        <label>
          Note:
          <input
            name="name"
            type="string"
            placeholder={this.state.plantdetails.name}
            onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
    );
  }
  componentDidMount() {
    api.getPlantDetail(this.props.match.params.name)
      .then(plant => {
        console.log(plant)
        this.setState({
          plantdetails: plant
        })
      })
      .catch(err => console.log(err))
  }
}

export default EditPlant;
