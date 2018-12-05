import React, { Component } from 'react';
import api from '../../api';
import { Route, Link, Switch } from 'react-router-dom';
import PlantDetail from './PlantDetail';
import { Box, Grid, Heading, Paragraph, Image, Button, Collapsible } from 'grommet';
import {AddCircle} from 'grommet-icons';


class Collection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      plants: []
    }
    this.today = new Date();
    this.amountOfIntervals = 1;
    this.dayInMs = 86400000;
    this.today.setHours(0);
    this.today.setMinutes(0);
    this.today.setSeconds(0);
    this.today.setMilliseconds(0);
  }
  render() {
    return (
      <div className="Collection">
      <Box margin='xsmall' pad='xsmall' />
        <Box align="start" gap="small">
          <Link to='/'><AddCircle color='#78bc61' /></Link>
        </Box> 
      <Box direction='row-responsive' wrap='true' flex='shrink'>
      {this.state.plants.map(p =>
        <Box key={p._id} basis='medium' margin='xsmall' height='medium' border={{side: "top", color: '#78bc61', size: 'medium'}}>
            <Image fit='contain' src={p.picture_url} margin='xsmall'>
              {/* <Link to={`/plant/${p._id}`}>1</Link> */}
              </Image>
          <Link to={`/plant/${p._id}`}><h3>{p.name}</h3></Link>
          <Paragraph alignSelf='center'>{`upcoming appointment: ${p.upcomingWatering}`}</Paragraph>
          <Paragraph alignSelf='center'>{`Did you water him  ${p.lastWatering}`}</Paragraph>
        </Box>)}
        <Switch>
          <Route path="/plant/:id" component={PlantDetail} />
        </Switch>
      </Box>
      </div>
    );
  }
  componentDidMount() {
    api.getPlants()
      .then(plants => {
        this.setState({
          plants: plants
        })
        let plantDates = plants.map(plant => {
          let startingDay = plant.starting_day;
          let interval = plant.watering_interval * this.dayInMs;

          //A loop to asses how many intervals are needed to "jump" to the present day
          while (startingDay + this.amountOfIntervals * interval < this.today) {
            this.amountOfIntervals++;
          }
          let wateringTimeNumber = startingDay + this.amountOfIntervals * interval;
          this.amountOfIntervals = 1; // reset
           date;
        
          let date = wateringTimeNumber + interval * -1;
          let lastWatering = new Date(date).toLocaleDateString()
          date = wateringTimeNumber
          let upcomingWatering = new Date(date).toLocaleDateString();
          // let daysAgo = this.today - date
          
          return {
            _id: plant._id,
            name: plant.name,
            wateringTimeNumber: date,
            upcomingWatering: upcomingWatering,
            lastWatering: lastWatering,
            interval: interval,
            description: plant.description,
            _owner: plant._owner,
            note: plant.note,
            picture_url: plant.picture_url
          };
        })
       
        console.log("Sorted? ", plantDates);
        this.setState({ plants: plantDates });
       })
      .catch(err => console.log(err));
  }
}

export default Collection;
