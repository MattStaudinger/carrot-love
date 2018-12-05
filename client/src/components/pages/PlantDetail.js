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
import {Edit, Trash } from "grommet-icons";




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
      <Box>
      <Box responsive='true' direction="row-responsive" justify='between' background='#78bc61'>
       <Box margin={{"top":"100px"}} height="medium" flex='true'>
         <Image fit='contain' src={this.state.plantdetails.picture_url} alt={this.state.plantdetails.name}/>
         <Heading level='3' alignSelf='center'>{this.state.plantdetails.name}</Heading>
         <Box width='small' alignSelf='center'>
          <Link to={"/plant/"+this.state.plantdetails._id+"/edit"}><Button fill color='#f1f7ed' icon={<Edit color='#f1f7ed' />} label='Edit'/>
          </Link>
          <Button fill margin={{'top':'xsmall'}} color='#f1f7ed' onClick={this.handleClick}label={this.state.plantdetails.name+' died'} icon={<Trash color='#f1f7ed' />} />
         </Box>
       </Box>
       <Box basis='large' flex='true' margin={{"top":"75px"}}>
         <Paragraph /* alignSelf='center' */>
          <Heading level='4' margin='xsmall'>next water appointment:</Heading>
            WIP</Paragraph>
         <Paragraph /* alignSelf='center' */>
         <Heading level='4' margin='xsmall'>Watering interval:</Heading>
          {this.state.plantdetails.watering_interval}</Paragraph>
         {this.state.plantdetails.description &&<Paragraph /* alignSelf='center' */><Heading level='4' margin='xsmall'>Description:</Heading>
          {this.state.plantdetails.description}</Paragraph>}
         {this.state.plantdetails.note &&<Paragraph /* alignSelf='center' */><Heading level='4' margin='xsmall'>Notes:</Heading>
         {this.state.plantdetails.note}</Paragraph>}
       </Box>
       <Box>
       </Box>
      </Box>
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
