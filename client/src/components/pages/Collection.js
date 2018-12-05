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
import Moment from 'react-moment';


class Collection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plants: [],
      pastWateringClick: false,
      newPlantText: []
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

  handleYes(id, index) {
    let plant = this.state.plants.filter(plant => plant._id === id);

    console.log("PLANT", plant)
console.log("STATE HANDLE", this.state.newPlantText)
    let lastWateringDatesUpdate = [...this.state.newPlantText]
    for (let i = 0; i<lastWateringDatesUpdate.length; i++ ) {
      if (i === index) {
        console.log("Length", lastWateringDatesUpdate[i])
        lastWateringDatesUpdate[i][lastWateringDatesUpdate[i].length-1] = {
          date: lastWateringDatesUpdate[i][lastWateringDatesUpdate[i].length-1].date, 
          isWatered: "Yes"}
      } 
    }

    let lastWateringDatesSaved = [...plant[0].lastWateringDate]
    console.log("CLONE", lastWateringDatesSaved)
  
        for (let x=lastWateringDatesSaved.length-1; x>=0; x--){
          if (lastWateringDatesSaved[x].isWatered === "") {
            console.log("x",x,lastWateringDatesSaved[x].isWatered )
          lastWateringDatesSaved[x] = {
            date: lastWateringDatesSaved[x].date, 
            isWatered: "Yes"}
            }
            break;

          }

        

      
      console.log("new", lastWateringDatesSaved)

      
      
   


    // // let wateringDateArray = [];
    // //     this.plants.forEach(plant => {
    // //       let last = plant.lastWateringDates.length - 1;
    // //       wateringDateArray.push(plant.lastWateringDates[last]);
    // //     });

        
    // let plantData = {
    //   name: plant[0].name,
    //   description: plant[0].description,
    //   _owner: plant[0]._owner,
    //   note: plant[0].note,
    //   picture_url: plant[0].picture_url,
    //   lastWateringDate: lastWateringDatesSaved,
    //   watering_interval: plant[0].watering_interval,
    //   starting_day: plant[0].startingDay
    // };
    // console.log("PLantData", plantData);

    // api.editPlant(plantData, plant[0]._id).then(res => console.log(res));

    let plantTimeArr = this.state.newPlantText[index];
    plantTimeArr.pop();

    let newPlantTextUpdated = this.state.newPlantText.map((item, i) =>
      i === index ? plantTimeArr : item
    );
    // let newPlantTextUpdated = this.state.newPlantText.filter((item, i) =>
    //   (i === index && plant ? plantTimeArr[plantTimeArr.length - 1] : item
    // );

   
    this.setState({
      newPlantText: newPlantTextUpdated
    });
  }



  handleNo(id, index) {
    console.log("No", id);
    let plant = this.state.plants.filter(plant => plant._id === id);

    console.log("PLANT", plant)
console.log("STATE HANDLE", this.state.newPlantText)
    let lastWateringDatesUpdate = [...this.state.newPlantText]
    for (let i = 0; i<lastWateringDatesUpdate.length; i++ ) {
      if (i === index) {
        console.log("Length", lastWateringDatesUpdate[i])
        lastWateringDatesUpdate[i][lastWateringDatesUpdate[i].length-1] = {
          date: lastWateringDatesUpdate[i][lastWateringDatesUpdate[i].length-1].date, 
          isWatered: "No"}
      } 
    }

    let lastWateringDatesSaved = [...plant[0].lastWateringDate]
    console.log("CLONE", lastWateringDatesSaved)
  
        for (let x=lastWateringDatesSaved.length-1; x>=0; x--){
          if (lastWateringDatesSaved[x].isWatered === "") {
            console.log("x",x,lastWateringDatesSaved[x].isWatered )
          lastWateringDatesSaved[x] = {
            date: lastWateringDatesSaved[x].date, 
            isWatered: "No"}
            }
            break;

          }

        

      
      console.log("new", lastWateringDatesSaved)

      
      
   


    // // let wateringDateArray = [];
    // //     this.plants.forEach(plant => {
    // //       let last = plant.lastWateringDates.length - 1;
    // //       wateringDateArray.push(plant.lastWateringDates[last]);
    // //     });

        
    // let plantData = {
    //   name: plant[0].name,
    //   description: plant[0].description,
    //   _owner: plant[0]._owner,
    //   note: plant[0].note,
    //   picture_url: plant[0].picture_url,
    //   lastWateringDate: lastWateringDatesSaved,
    //   watering_interval: plant[0].watering_interval,
    //   starting_day: plant[0].startingDay
    // };
    // console.log("PLantData", plantData);

    // api.editPlant(plantData, plant[0]._id).then(res => console.log(res));

    let plantTimeArr = this.state.newPlantText[index];
    plantTimeArr.pop();

    let newPlantTextUpdated = this.state.newPlantText.map((item, i) =>
      i === index ? plantTimeArr : item
    );
    // let newPlantTextUpdated = this.state.newPlantText.filter((item, i) =>
    //   (i === index && plant ? plantTimeArr[plantTimeArr.length - 1] : item
    // );

   
    this.setState({
      newPlantText: newPlantTextUpdated
    });
  }

  handleNewDate = date => {
    console.log(date);
    return <div>{date}</div>;
  };

  render() {
    console.log("State", this.state.newPlantText)
    let date = this.state.newPlantText.map(item => {
      return item.map(date => {
        let dateConversion = new Date(date.date).toLocaleDateString()
        return dateConversion
      })
    })
    console.log("StateNEW", date)
  
    
    return (
      <div className="collection">
        <Box align="center" margin="xsmall" pad="xsmall">
          <Heading level={2}>Your collection of plants:</Heading>
        </Box>
        <Box align="start" gap="small">
          <Link to="/">
            <AddCircle color="#78bc61" />
          </Link>
        </Box>
        <Box direction="row-responsive" wrap="true" flex="shrink">
          {this.state.plants.map((p, i) => (
            <Box
              key={p._id}
              basis="medium"
              margin="xsmall"
              height="medium"
              border={{ side: "top", color: "#78bc61", size: "medium" }}
            >
              <Image fit="contain" src={p.picture_url} margin="xsmall">
                {/* <Link to={`/plant/${p._id}`}>1</Link> */}
              </Image>
              <Link to={`/plant/${p._id}`}>
                <h3>{p.name}</h3>
              </Link>
              <Paragraph alignSelf="center">{`upcoming appointment: ${
                p.upcomingWatering
              }`}</Paragraph>
              {/* <Paragraph alignSelf='center'>{`Did you water him  ${p.lastWatering}`}  */}
              {console.log("p", date[i].length)}
              {p.lastWateringDatesNumber && date[i].length > 0 && (<div>
              <Button
                label={date[i][date[i].length-1]}
                color="green"
                onClick={() => this.handleYes(p._id, i)}
              />
              <Button
                label="No"
                color="red"
                onClick={() => this.handleNo(p._id, i)}
              />
              </div>
              )}
              {/* </Paragraph> */}
            </Box>
          ))}
          <Switch>
            <Route path="/plant/:id" component={PlantDetail} />
          </Switch>
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
          

          //Add new past watering dates to DB, in case it was updated since the last time the user logged in
          // - -- - - - - - - - - - -  - - - - -
          let i = 0;
          let newWaterTimesInPast = [];
          let allWaterTimesInPast = [];
          while (startingDay + i * interval < this.today - interval) {
            if (plant.lastWateringDate[i]) // wenn interval kleiner als heute ist und solange Element nicht schon in DB existiert
              newWaterTimesInPast.push({
              date: startingDay + i * interval,
              isWatered: ""
            });
            i++;
          }          
          if (newWaterTimesInPast.length > 0) {
            allWaterTimesInPast = [
              ...plant.lastWateringDate,
              ...allWaterTimesInPast
            ];

            let plantData = {
              name: plant.name,
              watering_interval: plant.watering_interval,
              starting_day: plant.starting_day,
              description: plant.description,
              note: plant.note,
              picture_url: plant.picture_url,
              lastWateringDate: allWaterTimesInPast
            };
            api.editPlant(plantData, plant._id);
          } else allWaterTimesInPast = plant.lastWateringDate;

          //- - - - - - - - - - 

         

          //get all wateringDates, that haven't been answered yet by the user
          let notAnsweredWateredTimesinPastNumber = allWaterTimesInPast.filter(
            el => !el.isWatered
          );
          
          

          // //convert to string
          // let notAsweredWateredTimesinPast = notAsweredWateredTimesinPastNumber.map(
          //   el => new Date(el.date).toLocaleDateString()
          // );

          //the returned object that will be stored in the state
          return {
            _id: plant._id,
            name: plant.name,
            watering_interval: plant.watering_interval,
            starting_day: plant.startingDay,
            upcomingWatering: upcomingWatering,
            lastWatering: lastWatering,
            description: plant.description,
            _owner: plant._owner,
            note: plant.note,
            picture_url: plant.picture_url,
            lastWateringDatesNumber: notAnsweredWateredTimesinPastNumber,
            // lastWateringDates: notAnsweredWateredTimesinPast,
            lastWateringDate: allWaterTimesInPast
          };
        });
        console.log("allWaterTimesInPast", plantDates)

        //initalize first value to be shown as the last Watering on the website - stored in the state
        let wateringDateArray = [];
        plantDates.forEach(plant => { 
          wateringDateArray.push(
            plant.lastWateringDatesNumber
        )});


        this.setState({ plants: plantDates, newPlantText: wateringDateArray });
        console.log("TEST",plantDates, "Only watering:", wateringDateArray )
      })
      .catch(err => console.log(err));
  }
}

export default Collection;
