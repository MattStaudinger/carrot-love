import React, { Component } from "react";
import api from "../../api";
import { Route, Link, Switch } from "react-router-dom";
import PlantDetail from "./PlantDetail";
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
import Axios from "axios";

class Collection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plants: [],
      plantId: ""
    };
    this.today = new Date();
    this.amountOfIntervals = 1;
    this.dayInMs = 86400000;
    this.today.setHours(0);
    this.today.setMinutes(0);
    this.today.setSeconds(0);
    this.today.setMilliseconds(0);
    this.newText = [];
  }

  render() {
    return (
      <div className="collection">
        <Box margin="xsmall" pad="xsmall" />
        {!this.props.isToggled && (
          <Box align="start" gap="small" className="fixedbutton">
            <Link to="/add">
              <AddCircle color="#78bc61" size="large" />
            </Link>
          </Box>
        )}

        <Box direction="row-responsive" wrap="true" flex="shrink">
          {this.state.plants.map((p, i) => (
            <Box
              key={p._id}
              basis="medium"
              margin="xsmall"
              height="medium"
              border={{ side: "top", color: "#78bc61", size: "medium" }}
              background='#f1f7ed'
              /* onClick={() => this.handlePlantDetail(p._id)} */              
            >
              <Image fit="contain" src={p.picture_url} margin="xsmall" />
              <Button onClick={() => {this.props.onClick(p._id)}}>
                <h3>{p.name}</h3>
              </Button>
              <Paragraph alignSelf="center">{`upcoming appointment: ${
                p.upcomingWatering
              }`}</Paragraph>
              {/* <Paragraph alignSelf='center'>{`Did you water him  ${p.lastWatering}`}  */}

              {/* </Paragraph> */}
            </Box>
          ))}
        </Box>
      </div>
    );
  }
  componentDidMount() {
    api
      .getPlants()
      .then(plants => {
        console.log("Plants", plants);
        let plantDates = plants.map(plant => {
          let startingDay = plant.starting_day;
          let interval = plant.watering_interval * this.dayInMs;

          //A loop to asses how many intervals are needed to "jump" to the present day
          while (startingDay + this.amountOfIntervals * interval < this.today) {
            this.amountOfIntervals++;
          }
          //for displaying-purposes only -------------
          let wateringTimeNumber =
            startingDay + this.amountOfIntervals * interval;
          let date = wateringTimeNumber + interval * -1;
          let lastWatering = new Date(date).toLocaleDateString();
          date = wateringTimeNumber;
          let upcomingWatering = new Date(date).toLocaleDateString();
          console.log("UPcoming", upcomingWatering);
          this.amountOfIntervals = 1; // reset
          // ----------------------------------

          return {
            _id: plant._id,
            name: plant.name,
            watering_interval: plant.watering_interval,
            starting_day: plant.startingDay,
            upcomingWatering: upcomingWatering,
            description: plant.description,
            _owner: plant._owner,
            note: plant.note,
            picture_url: plant.picture_url
          };
        });

        this.setState({ plants: plantDates });
      })
      .catch(err => console.log(err));
  }

  componentDidUpdate() {

  
    api
    .getPlants()
    .then(plants => {
      console.log("Plants", plants);
      let plantDates = plants.map(plant => {
        let startingDay = plant.starting_day;
        let interval = plant.watering_interval * this.dayInMs;

        //A loop to asses how many intervals are needed to "jump" to the present day
        while (startingDay + this.amountOfIntervals * interval < this.today) {
          this.amountOfIntervals++;
        }
        //for displaying-purposes only -------------
        let wateringTimeNumber =
          startingDay + this.amountOfIntervals * interval;
        let date = wateringTimeNumber + interval * -1;
        let lastWatering = new Date(date).toLocaleDateString();
        date = wateringTimeNumber;
        let upcomingWatering = new Date(date).toLocaleDateString();
        console.log("UPcoming", upcomingWatering);
        this.amountOfIntervals = 1; // reset
        // ----------------------------------

        return {
          _id: plant._id,
          name: plant.name,
          watering_interval: plant.watering_interval,
          starting_day: plant.startingDay,
          upcomingWatering: upcomingWatering,
          description: plant.description,
          _owner: plant._owner,
          note: plant.note,
          picture_url: plant.picture_url
        };
      });

      //check if something has been updated  otherwise there will be an infinite loop
      if(this.state.plants.length !== plantDates.length) {
      this.setState({ plants: plantDates });
      }
    })
    .catch(err => console.log(err));
  }

}

export default Collection;
