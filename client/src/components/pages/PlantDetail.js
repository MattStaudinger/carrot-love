import React, { Component } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';
import { Box, Button, Collapsible, Heading, Grommet, Text, Layer } from "grommet";
import { CaretPrevious} from "grommet-icons";
import EditPlant from './EditPlant';



class PlantDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      plantdetails: [],
      showLayer: false,
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
    handleClick(e) {
    e.preventDefault();
    console.log("deleted!")
    api.deletePlant(this.state.plantdetails._id)
    .then(res => {
      this.props.history.push('/collection')
    })
    .catch(err => console.log(err)) 
    }

    handleClose(){
      this.setState({showLayer:false,
      newEdit : true})
    }
  
  render() {
    return (
      <div className="PlantDetail">
       <Button onClick={() => {this.props.onClick()}} icon={<CaretPrevious color="green" />}></Button>
       <h1>{this.state.plantdetails.name}</h1>
       <img src={this.state.plantdetails.picture_url} alt={this.state.plantdetails.name}/>
       <p>next water appointment: WIP</p>
       <p>Watering interval: {this.state.plantdetails.watering_interval}</p>
      {this.state.plantdetails.description && <p>Description: {this.state.plantdetails.description}</p>}
      {this.state.plantdetails.note && <p>Notes: {this.state.plantdetails.note}</p>}
       <Link to={`/plant/${this.state.plantdetails._id}/edit`}><button>Edit</button></Link>
       <Button onClick={this.handleClick}>{this.state.plantdetails.name} Died</Button>
      </div>
    );
  }
  componentDidMount() {
    console.log("PROPS", this.props)
    api.getPlantDetail(this.props.id)
      .then(plant => {
        console.log(plant)
        this.setState({
          plantdetails: plant
        })
      })
      .catch(err => console.log(err))
  }
  componentDidUpdate() {

    if(this.props.id !== this.state.plantdetails._id) {
    console.log("PROPS", this.props)
    api.getPlantDetail(this.props.id)
      .then(plant => {
        console.log(plant)
        this.setState({
          plantdetails: plant,
          newEdit : false
        })
      })
      .catch(err => console.log(err))
  }}
}

export default PlantDetail;
