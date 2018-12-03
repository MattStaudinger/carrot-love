import React, { Component } from "react";
import api from "../../api";
import { Route, Link, Switch } from "react-router-dom";
import PlantDetail from "./PlantDetail";
import Waypoint from "react-waypoint";

class Calender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plants: [],
      isLoading: false
    };
    this.allPlants = [];
    this.today = new Date();
    this.amountOfIntervals = 1;
    this.dayInMs = 86400000;
    this.today.setHours(0);
    this.today.setMinutes(0);
    this.today.setSeconds(0);
    this.today.setMilliseconds(0);
    this._loadMoreItems = this._loadMoreItems.bind(this);
  }

  _loadMoreItems() {
    console.log("load more items..");

    let plantSorted = [];
    this.allPlants.forEach(plant => {
      let newRepetion = plant.repetions + 3;
      console.log(newRepetion);

      for (let i = plant.repetions; i < newRepetion; i++) {
        let date = plant.wateringTimeNumber + plant.interval * i;
        let plantTimeSortedString = new Date(date).toLocaleString();
        plantSorted.push({
          name: plant.name,
          wateringTimeNumber: date,
          wateringTimeString: plantTimeSortedString,
          repetions: newRepetion,
          interval: plant.interval
        });
      }
    });
    plantSorted.sort((a, b) => a.wateringTimeNumber - b.wateringTimeNumber);
    console.log(plantSorted);
    this.allPlants = [...this.state.plants, ...plantSorted];
    this.setState({ plants: this.allPlants });
    this.setState({ isLoading: false });
  }


  _renderWaypoint() {
    if (!this.state.isLoading) {
      return (
        <div>
          {console.log("Waypoint")}
          <Waypoint
            onEnter={this._loadMoreItems}
            threshold={0.5}
          />
        </div>
      );
    }
  }

  render() {
    return (
      <div className="calender">
        <h2>Upcoming watering:</h2>
        {this.state.plants.map((plant, i) => (
          <div className="calender-card" key={i}>
            <span>{plant.wateringTimeString}</span>
            <span>{plant.name}</span>
          </div>
        ))}
        {this._renderWaypoint()}
      </div>
    );
  }

  componentDidMount() {
    console.log("DIDMOUNT");
    api
      .getPlants()
      .then(plants => {
        let plantDates = plants.map(plant => {
          let startingDay = plant.starting_day;
          let interval = plant.watering_interval * this.dayInMs;

          //A loop to asses how many intervals are needed to "jump" to the present day
          while (startingDay + this.amountOfIntervals * interval < this.today) {
            this.amountOfIntervals++;
          }

          let date = startingDay + this.amountOfIntervals * interval;
          let upcomingWateringDate = new Date(date).toLocaleString();
          let repetions = Math.floor((4 * this.dayInMs) / interval);
          this.amountOfIntervals = 1; // reset
          return {
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
            let plantTimeSortedString = new Date(date).toLocaleString();
            plantSorted.push({
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
