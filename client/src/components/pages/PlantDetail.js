import React, { Component } from 'react';
import api from '../../api';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import EditPlant from './EditPlant'



class PlantDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      plantdetails: []
    }
    this.handleClick = this.handleClick.bind(this);
  }
    handleClick(e) {
    e.preventDefault();
    console.log("deleted!")
    }
    
  
  render() {
    return (
      <div className="PlantDetail">
       <h1>{this.state.plantdetails.name}</h1>
       <img src={this.state.plantdetails.picture_url} alt="picture of the plant"/>
       <p>next water appointment: WIP</p>
       <p>Watering interval: {this.state.plantdetails.watering_interval}</p>
       <p>Description: {this.state.plantdetails.description}</p>
       <p>Notes: {this.state.plantdetails.note}</p>
       <Link to={`/plant/${this.state.plantdetails._id}/edit`}><button>Edit</button></Link>
       <button onClick={this.handleClick}>{this.state.plantdetails.name} Died</button>
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

export default PlantDetail;
