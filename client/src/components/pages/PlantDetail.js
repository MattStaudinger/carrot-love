import React, { Component } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';
import {
  Box,
  Grid,
  Heading,
  Paragraph,
  Image,
  Button,
  Collapsible
} from "grommet";
import { AddCircle } from "grommet-icons";




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
    api.deletePlant(this.state.plantdetails._id)
    .then(res => {
      this.props.history.push('/collection')
    })
    .catch(err => console.log(err)) 
    }
  
  render() {
    return (
      <Box responsive='true' flex>
      <div className="BelowNav">
       <Heading levvel='1' alignSelf='center'>{this.state.plantdetails.name}</Heading>
       <Box margin="xsmall" height="small">
         <Image fit='contain' src={this.state.plantdetails.picture_url} alt={this.state.plantdetails.name}/>
       </Box>
       <Box alignSelf='center'>
         <Paragraph alignSelf='center'>next water appointment: WIP</Paragraph>
         <Paragraph alignSelf='center'>Watering interval: {this.state.plantdetails.watering_interval}</Paragraph>
         <Paragraph alignSelf='center'>Description: {this.state.plantdetails.description}</Paragraph>
         <Paragraph alignSelf='center'>Notes: {this.state.plantdetails.note}</Paragraph>
       </Box>
       <Box>
         <Link to={`/plant/${this.state.plantdetails._id}/edit`}><button>Edit</button></Link>
         <button onClick={this.handleClick}>{this.state.plantdetails.name} Died</button>
       </Box>
      </div>
      </Box>
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
