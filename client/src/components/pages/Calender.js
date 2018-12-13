import React, { Component, createRef } from "react";
import api from "../../api";

import { InfiniteScroll } from "grommet";

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
    this.amountOfDaysInList = 200;
    this.boxRef = createRef();
    this.plantsForMail = [];
  }

  isToday(watering) {
    let wateringTime = new Date(watering);
    if (
      this.today.getFullYear() === wateringTime.getFullYear() &&
      this.today.getMonth() === wateringTime.getMonth() &&
      this.today.getDate() === wateringTime.getDate()
    )
      return true;
    else return false;
  }

  render() {
    return (
      <div className="calender">
        <InfiniteScroll step={10} items={this.state.plants}>
          {(plant, index) => (
            <div
              className="calender-box"
              style={
                index > 0 &&
                this.state.plants[index - 1].wateringTimeString !==
                  plant.wateringTimeString
                  ? { borderTop: "1px solid rgb(196, 196, 196)" }
                  : null
              }
            >
              {index === 0 && (
                <span className="day">
                  <p>{plant.wateringTimeString}</p>
                </span>
              )}
              {index > 0 &&
                this.state.plants[index - 1].wateringTimeString !==
                  plant.wateringTimeString && (
                  <span className="day">
                    <p>{plant.wateringTimeString}</p>
                  </span>
                )}
              {index > 0 &&
                this.state.plants[index - 1].wateringTimeString ===
                  plant.wateringTimeString && (
                  <span className="day">
                    <p>&nbsp;</p>
                  </span>
                )}

              <span className="name">
                <p>{plant.name}</p>
              </span>
            </div>
          )}
        </InfiniteScroll>
      </div>
    );
  }

  componentDidMount() {
    api
      .getPlants()
      .then(plants => {
        this.plantsForMail = plants;
        let plantDates = plants.map(plant => {
          let startingDay = plant.starting_day;
          let interval = plant.watering_interval * this.dayInMs;

          //A loop to asses how many intervals are needed to "jump" to the present day
          while (startingDay + this.amountOfIntervals * interval < this.today) {
            this.amountOfIntervals++;
          }
          let date = startingDay + this.amountOfIntervals * interval;
          let upcomingWateringDate = new Date(date).toLocaleString();
          let repetions = Math.floor(
            (this.amountOfDaysInList * this.dayInMs) / interval
          );
          this.amountOfIntervals = 1; // reset
          return {
            _id: plant._id,
            name: plant.name,
            wateringTimeNumber: date,
            wateringTimeString: upcomingWateringDate,
            repetions: repetions,
            interval: plant.watering_interval * this.dayInMs,
            starting_day: plant.startingDay,
            picture_url: plant.picture_url
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
              interval: plant.interval,
              starting_day: plant.startingDay,
              picture_url: plant.picture_url
            });
          }
        });

        plantSorted.sort((a, b) => a.wateringTimeNumber - b.wateringTimeNumber);
        this.setState({ plants: plantSorted });
      })
      .catch(err => console.log(err));
  }
  componentDidUpdate() {
    if (this.props.isUpdated) {
      api
        .getPlants()
        .then(plants => {
          this.plantsForMail = plants;
          let plantDates = plants.map(plant => {
            let startingDay = plant.starting_day;
            let interval = plant.watering_interval * this.dayInMs;

            //A loop to asses how many intervals are needed to "jump" to the present day
            while (
              startingDay + this.amountOfIntervals * interval <
              this.today
            ) {
              this.amountOfIntervals++;
            }
            let date = startingDay + this.amountOfIntervals * interval;
            let upcomingWateringDate = new Date(date).toLocaleString();
            let repetions = Math.floor(
              (this.amountOfDaysInList * this.dayInMs) / interval
            );
            this.amountOfIntervals = 1; // reset
            return {
              _id: plant._id,
              name: plant.name,
              wateringTimeNumber: date,
              wateringTimeString: upcomingWateringDate,
              repetions: repetions,
              interval: plant.watering_interval * this.dayInMs,
              starting_day: plant.startingDay,
              picture_url: plant.picture_url
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
                interval: plant.interval,
                starting_day: plant.startingDay,
                picture_url: plant.picture_url
              });
            }
          });

          plantSorted.sort(
            (a, b) => a.wateringTimeNumber - b.wateringTimeNumber
          );
          this.setState({ plants: plantSorted });
          this.props.hasBeenUpdated();
        })
        .catch(err => console.log(err));
    }
  }
}

export default Calender;
