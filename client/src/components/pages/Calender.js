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

  onOpenNotification = () => {
    let plantDates = this.plantsForMail.map(plant => {
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



  let email = JSON.parse(localStorage.getItem("user")).email
  api.mailNotification(email)
  this.setState({ open: undefined, openNotification: true })

  }
  

  onCloseNotification = () => this.setState({ openNotification: undefined });

  onCloseDrop = () => this.setState({ openDrop: false, openInnerDrop: false });

  onOpenDrop = () => this.setState({ openDrop: true, openInnerDrop: false });

  onOpen = () => this.setState({ open: true });

  onClose = () => this.setState({ open: undefined });

  onOpen2 = () => this.setState({ open2: true });

  onClose2 = () => this.setState({ open2: undefined });

  isToday(watering) {
    let wateringTime = new Date(watering)
    if (this.today.getFullYear() === wateringTime.getFullYear() && 
        this.today.getMonth() === wateringTime.getMonth() &&
          this.today.getDate() === wateringTime.getDate()) return true
          else return false;
    // console.log("wateringTime", wateringTime.getFullYear(), "today: ", this.today.getFullYear(), this.today.getMonth(),this.today.getDate())
    // if (this.today === wateringTime
  }

  render() {
    const { openNotification,open, openDrop, openInnerDrop } = this.state;


    return (

      <Grommet theme={grommet} full>
    <Box
                >
    <h2>Upcoming watering:</h2>
    <Button
            icon={<Mail />}
            label={
              <Text>
                <strong>Get notification</strong>
              </Text>
            }
            onClick={this.onOpen}
            gap="medium"
            fill="false"
            align="center"
          />
        </Box>
        {open && (
          <Layer
            position="center"
            modal
            onClickOutside={this.onClose}
            onEsc={this.onClose}
          >
            <Box 
            pad="medium" gap="small" width="medium" align="center" >
              <Heading level={3} margin="none">
                Choose your notification
              </Heading>
              <Box
                ref={this.boxRef}
                as="footer"
                gap="small"
                direction="row"
                align="center"
                justify="end"
                pad={{ top: "medium", bottom: "small" }}
              >
                <Button label="Google Calender" onClick={() => (console.log("Click"))} color="dark-6" />
                <Button
                  label={
                    <Text color="white">
                      <strong>Mail</strong>
                    </Text>
                  }
                  onClick={this.onOpenNotification}
                  primary
                  color="status-critical"
                />

                

                {/* {openDrop && (
            <Drop
              target={this.boxRef.current}
              onClickOutside={this.onCloseDrop}
              onEsc={this.onCloseDrop}
            >
              {!openInnerDrop && (
                <Box 
                pad="large"
                background="rgba(120, 188, 97, 1)"
                >
                 <Text color="white" align="center">Your Mail was sent</Text>
                </Box>
              )}
            </Drop>
          )} */}
              </Box>
            </Box>
          </Layer>
        )}
        {openNotification && (
                  <Layer
                    position="bottom"
                    full="horizontal"
                    modal={false}
                    responsive={false}
                    onEsc={this.onCloseNotification}
                  >
                    <Box
                      align="start"
                      pad={{ vertical: "medium", horizontal: "small" }}
                    >
                      <Box
                        align="center"
                        direction="row"
                        gap="small"
                        round="medium"
                        elevation="medium"
                        pad={{ vertical: "xsmall", horizontal: "small" }}
                        background="status-ok"
                      >
                        <Box align="center" direction="row" gap="xsmall">
                          <StatusGood />
                          <Text>The notification is setup</Text>
                        </Box>
                        <Button icon={<FormClose />} onClick={this.onCloseNotification} plain />
                      </Box>
                    </Box>
                  </Layer>
                )}


<Box>
      <InfiniteScroll items={this.state.plants} step={10} onMore={()=> this.handleMore()} >
        {(plant, index) => (
           <Box
            key={index}
            pad="medium"
            border={{ side: "bottom" }}
            align="center"
            background={this.isToday(plant.wateringTimeNumber) ? "green" : "white"}
          >
        
           <Link  to={`/plant/${plant._id}`}><Text color='black'>{plant.name}</Text></Link>
            <Text color='black'>{plant.wateringTimeString}</Text>
          </Box>
        )}
      </InfiniteScroll>
    </Box>
  </Grommet>
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
