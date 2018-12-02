import React, { Component } from 'react';
import api from '../../api';
import { Route, Link, Switch } from 'react-router-dom';
import PlantDetail from './PlantDetail'


class Calender extends Component {
  constructor(props) {
    super(props)
    this.state = {
      plants: []
    }
  }
  render() {
    return (

      <div className="calender">
        <h2>Your collection of plants:</h2>
        {this.state.plants.map(plant => (
        <div className="calender-card">
        <span>{plant.wateringTime}</span>
        <span>{plant.name}</span>
        </div>
        ))}

        {/* {this.state.plants.map(p =>
        <div key={p._id}>
          <Link to={`/plant/${p._id}`}><img src={p.picture_url} /></Link>
          <Link to={`/plant/${p._id}`}><h3>{p.name}</h3></Link>
          <p>next water appointment: WIP</p>
        </div>)} */}
        {/* <Switch>
          <Route path="/plant/:id" component={PlantDetail} />
        </Switch> */}
      </div>
        )
  }
  componentDidMount() {
    let today = new Date()
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0)
    const dayInMs = 86400000
    let amountOfIntervals = 1;

    api.getPlants()
      .then(plants => {
        console.log(plants)
        let plantDates = plants.map(plant=> {
          let startingDay = plant.starting_day;
          let interval = plant.watering_interval*dayInMs;
          while ((startingDay + (amountOfIntervals*interval)) < today) {
            amountOfIntervals++;
          }
          let  date = startingDay + (amountOfIntervals * interval)
          let upcomingWateringDate = new Date(date).toLocaleString();
          amountOfIntervals = 1; // reset
          console.log("Dates: ", upcomingWateringDate)
          return ({name: plant.name,
          wateringTime : upcomingWateringDate})
        })

console.log(plantDates)
        this.setState({plants:plantDates})


     
      })
      .catch(err => console.log(err))
  }
}

export default Calender;
