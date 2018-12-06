import React, { Component, createRef } from "react";
import api from "../../api";
import { Route, Link, Switch } from "react-router-dom";
import PlantDetail from "./PlantDetail";
import Waypoint from "react-waypoint";
import { grommet } from "grommet/themes";
import { Add, Close, FormClose, StatusGood, Trash, Mail} from "grommet-icons";
import { Box, Button, FormField, Grommet, Heading, Layer, Drop, Select, Text, TextArea, TextInput, InfiniteScroll}
from "grommet";


class Calender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plants: [],
      isLoading: false,
      openDrop: false,
      openInnerDrop: false
    };
    this.allPlants = [];
    this.today = new Date();
    this.amountOfIntervals = 1;
    this.dayInMs = 86400000;
    this.today.setHours(0);
    this.today.setMinutes(0);
    this.today.setSeconds(0);
    this.today.setMilliseconds(0);
    this.amountOfDaysInList=200;
    this.boxRef = createRef();
    this.plantsForMail = []
  }

  
  isToday(watering) {
    let wateringTime = new Date(watering)
    if (this.today.getFullYear() === wateringTime.getFullYear() && 
        this.today.getMonth() === wateringTime.getMonth() &&
          this.today.getDate() === wateringTime.getDate()) return true
          else return false;
  }

  render() {
    return (
      <div className="calender">
      <Grommet theme={grommet}> 
    <Box>
    <h2>Upcoming watering</h2>
    {console.log(this.state.plants)}
        </Box>
        
        <Box>
      <InfiniteScroll step={10} items={this.state.plants}>
        {(plant, index) => (
           <Box
            key={index}
            pad="medium"
            border={{ side: "bottom" }}
            align="center"
            background= '#78bc61'
            // {this.isToday(plant.wateringTimeNumber) ? "green" : "white"}
          >
        
           <Link  to={`/plant/${plant._id}`}><Text color='black'>{plant.name}</Text></Link>
            <Text color='black'>{plant.wateringTimeString}</Text>
          </Box>
        )}
      </InfiniteScroll>
    </Box>
  </Grommet>
  </div>
    );
  }

  componentDidMount() {
    console.log("DIDMOUNT");
    api
      .getPlants()
      .then(plants => {
        this.plantsForMail = plants
        let plantDates = plants.map(plant => {
          let startingDay = plant.starting_day;
          let interval = plant.watering_interval * this.dayInMs;

          //A loop to asses how many intervals are needed to "jump" to the present day
          while (startingDay + this.amountOfIntervals * interval < this.today) {
            this.amountOfIntervals++;
          }

          let date = startingDay + this.amountOfIntervals * interval;
          let upcomingWateringDate = new Date(date).toLocaleString();
          let repetions = Math.floor((this.amountOfDaysInList * this.dayInMs) / interval);
          this.amountOfIntervals = 1; // reset
          return {
            _id: plant._id,
            name: plant.name,
            wateringTimeNumber: date,
            wateringTimeString: upcomingWateringDate,
            repetions: repetions,
            interval: plant.watering_interval * this.dayInMs
          };
        });
        this.allPlants = plantDates;
        let plantSorted = [];

        plantDates.forEach(plant => {
          for (let i = 0; i < plant.repetions; i++) {
            let date = plant.wateringTimeNumber + plant.interval * i;
            let plantTimeSortedString = new Date(date).toLocaleDateString();
            plantSorted.push({
              _id: plant._id,
              name: plant.name,
              wateringTimeNumber: date,
              wateringTimeString: plantTimeSortedString,
              repetions: plant.repetions,
              interval: plant.interval
            });
          }
        });

        plantSorted.sort((a, b) => a.wateringTimeNumber - b.wateringTimeNumber);
        console.log("Sorted? ", plantSorted);
        this.setState({ plants: plantSorted });
      })
      .catch(err => console.log(err));
  }
}

export default Calender;