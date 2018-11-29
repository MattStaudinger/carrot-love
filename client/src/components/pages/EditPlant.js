import React, { Component } from 'react';
import api from '../../api';
import { Route, Link, Switch } from 'react-router-dom';


class EditPlant extends Component {
  constructor(props) {
    super(props)
    this.state = {
      plantdetails: []
    } 
  }
  render() {
    return (
      <div className="PlantDetail">
       HERE COMES THE EDIT PAGE
       {this.state.plantdetails.name}
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
