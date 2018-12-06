import React, { Component } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';
import {
  Box,
  Heading,
  Paragraph,
  Image,
  Button,
  Collapsible
} from "grommet";
import {Edit, Trash, CaretPrevious } from "grommet-icons";



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
      <Box background='white'>
        <Box>
        <Button onClick={() => {this.props.onClick()}} icon={<CaretPrevious />}/>
        </Box>
      <Box responsive='true' /*  direction="row-responsive" justify='between' */>
       <Box margin={{"top":"100px"}}  flex='true'>
       <Box basis='xlarge'>
         <Image fit='contain' src={this.state.plantdetails.picture_url} alt={this.state.plantdetails.name}/>
         <Heading level='3'  alignSelf='center'>{this.state.plantdetails.name}</Heading>
         </Box>
         <Box width='small' alignSelf='center' className='smallScreen'>
          <Link to={"/plant/"+this.state.plantdetails._id+"/edit"}><Button fill color='#78bc61' icon={<Edit color='#78bc61' />} label='Edit'/>
          </Link>
          <Button fill margin={{'top':'xsmall'}} color='#78bc61' onClick={this.handleClick}label={this.state.plantdetails.name+' died'} icon={<Trash color='#78bc61' />} />
         </Box>
       </Box>
       <Box basis='large' flex='true' margin={{"top":"75px"}} alignSelf='center'>
         <Paragraph>
          <Heading level='4' margin='xsmall'>next water appointment:</Heading>
            WIP</Paragraph>
         <Paragraph>
         <Heading level='4' margin='xsmall'>Watering interval:</Heading>
          {this.state.plantdetails.watering_interval}</Paragraph>
         {this.state.plantdetails.description &&<Paragraph><Heading level='4' margin='xsmall'>Description:</Heading>
          {this.state.plantdetails.description}</Paragraph>}
         {this.state.plantdetails.note &&<Paragraph><Heading level='4' margin='xsmall'>Notes:</Heading>
         {this.state.plantdetails.note}</Paragraph>}
       </Box>
       <Box>
      </Box>
      </Box>
      </Box>
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
