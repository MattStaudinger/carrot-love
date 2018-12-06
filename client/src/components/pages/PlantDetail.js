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
import {Edit, Trash, CaretPrevious, Close } from "grommet-icons";



class PlantDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      plantdetails: [],
      showLayer: false,
      upcomingWateringDate: ""
    }
    this.amountOfIntervals = 1
    this.today = new Date();
    this.dayInMs = 86400000;
    this.today.setHours(0);
    this.today.setMinutes(0);
    this.today.setSeconds(0);
    this.today.setMilliseconds(0)
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
    handleClick(e) {
    e.preventDefault();
    console.log("deleted!")
    api.deletePlant(this.state.plantdetails._id)
    .then(res => {
      this.props.onClick()
    })
    .catch(err => console.log(err)) 
    }

    handleClose(){
      this.setState({showLayer:false,
      newEdit : true})
    }
  
  render() {
    return (
      <Box background='white' className="detail-view">
        <div className="back-container">
        <Button className="back" onClick={() => {this.props.onClick()}} icon={<Close />}/>
        </div>
      <Box responsive='true' /*  direction="row-responsive" justify='between' */>
       <Box margin={{"top":"100px"}}  flex='true'>
       <Box basis='xlarge'>
         <Image fit='contain' src={this.state.plantdetails.picture_url} alt={this.state.plantdetails.name}/>
         <Heading level='3'  alignSelf='center'>{this.state.plantdetails.name}</Heading>
         </Box>
         <Box width='small' alignSelf='center' className='smallScreen'>
          <Link to={"/plant/"+this.state.plantdetails._id+"/edit"}><Button fill color='#78bc61' icon={<Edit color='#78bc61' />} label='Edit'/>
          </Link>
          <Button fill margin={{'top':'xsmall'}} color='#78bc61' onClick={this.handleClick} label={this.state.plantdetails.name+' died'} icon={<Trash color='#78bc61' />} />
         </Box>
       </Box>
       <Box basis='large' flex='true' margin={{"top":"75px", "bottom":"75px"}} alignSelf='center'>
         <Paragraph>
          <Heading level='4' margin='xsmall'>next water appointment:</Heading>
            {this.state.upcomingWateringDate}</Paragraph>
         <Paragraph>
         <Heading level='4' margin='xsmall'>Watering interval:</Heading>
            Every 
            {console.log("INTEVAL", this.state.plantdetails.watering_interval)}
           {this.state.plantdetails.watering_interval === 1 && <span> day</span>}
           {this.state.plantdetails.watering_interval > 1 && (<span> {this.state.plantdetails.watering_interval} days</span>) }

           
            
           
           
           
           </Paragraph>


         {this.state.plantdetails.description &&<Paragraph><Heading level='4' margin='xsmall'>Description:</Heading>
          {this.state.plantdetails.description}</Paragraph>}
         {this.state.plantdetails.note &&<Paragraph><Heading level='4' margin='xsmall'>Notes:</Heading>
         {this.state.plantdetails.note}</Paragraph>}
       </Box>
      </Box>
      </Box>
    );
  }
  componentDidMount() {
    console.log("PROPS", this.props)
    api.getPlantDetail(this.props.id)
      .then(plant => {
        let startingDay = plant.starting_day;
          let interval = plant.watering_interval * this.dayInMs;
//A loop to asses how many intervals are needed to "jump" to the present day
while (startingDay + this.amountOfIntervals * interval < this.today) {
  this.amountOfIntervals++;
}
let date = startingDay + this.amountOfIntervals * interval;
let upcomingWateringDate = new Date(date).toLocaleDateString();
console.log("UPCOMING DETAIL", upcomingWateringDate)
          this.setState({
          plantdetails: plant,
          upcomingWateringDate: upcomingWateringDate
        })
      })
      .catch(err => console.log(err))
  }
  componentDidUpdate() {

    if(this.props.id !== this.state.plantdetails._id) {
    console.log("PROPS", this.props)
    api.getPlantDetail(this.props.id)
      .then(plant => {
        let startingDay = plant.starting_day;
          let interval = plant.watering_interval * this.dayInMs;
//A loop to asses how many intervals are needed to "jump" to the present day
while (startingDay + this.amountOfIntervals * interval < this.today) {
  this.amountOfIntervals++;
}
let date = startingDay + this.amountOfIntervals * interval;
let upcomingWateringDate = new Date(date).toLocaleDateString();
console.log("UPCOMING DETAIL", upcomingWateringDate)
          this.setState({
          plantdetails: plant,
          upcomingWateringDate: upcomingWateringDate
        })
      })
      .catch(err => console.log(err))
  }}
}

export default PlantDetail;
