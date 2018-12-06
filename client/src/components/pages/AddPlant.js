import React, { Component } from "react";
import AddPlantView1 from "./AddPlant/AddPlantView1";
import AddPlantView2 from "./AddPlant/AddPlantView2";
import AddPlantView3 from "./AddPlant/AddPlantView3";
import api from "../../api";
import { type } from "os";



class AddPlant extends Component {
  constructor(props) {
    super(props);

      this.state = {
      name: "",
      view1Clicked: false,
      view2Clicked: false,
      view3Clicked: false,
      watering_interval: "",
      starting_day: new Date(),
      description: "",
      note: "",
      picture_url: ""

    };
    this.handleNameSubmit = this.handleNameSubmit.bind(this)
    this.handleWateringSubmit = this.handleWateringSubmit.bind(this)
    this.handleStartingDaySubmit = this.handleStartingDaySubmit.bind(this)
    this.handleGoBack = this.handleGoBack.bind(this)
  }


  handleGoBack(viewNo) {
    if (!api.isLoggedIn()) {
      this.props.history.push('/login')
      return
     }

    switch(viewNo) {
      case "view2":
      this.setState({view1Clicked: false,
        view2Clicked: false})
      break;
      case "view3":
      this.setState({view2Clicked: true,
        view3Clicked: false})
      break;

      default:
      console.log("Error: Incorrect view was set as a parameter")
      break;
    }
  }

  handleNameSubmit(plantData) {
 if (!api.isLoggedIn()) {
  this.props.history.push('/login')
  return
 }
      this.setState({
        name: plantData.name,
        description: plantData.description,
        picture_url : plantData.pictureUrl,
        view1Clicked: true,
          view2Clicked: true
    })
    console.log("Data", plantData)
}


handleWateringSubmit(checkBoxValue, inputValue, isCheckbox) {
  if (!api.isLoggedIn()) {
    this.props.history.push('/login')
    return
   }

  if (isCheckbox) {
    this.setState({
      watering_interval: checkBoxValue,
      view2Clicked: false,
      view3Clicked: true
    });
  } else {
    this.setState({
      watering_interval: inputValue,
      view2Clicked: false,
      view3Clicked: true
    });
  }
}

handleStartingDaySubmit(startingDay) {
  let startingDayConverted = startingDay
  if (!api.isLoggedIn()) {
    this.props.history.push('/login')
    return
   }

if (typeof(startingDay)==="string"){
  startingDayConverted = new Date(startingDay)
} 
  let dayInMs = 86400000;
let amountOfIntervals = 0;
let today = new Date();
 today.setHours(0);
today.setMinutes(0);
today.setSeconds(0);
today.getMilliseconds(0);

   //Adjusts the starting day to midnight, so it will always be the same day when later calculated in the


   let startingDayAdjusted = startingDayConverted.setHours(0);
   startingDayAdjusted = startingDayConverted.setMinutes(0);
   startingDayAdjusted = startingDayConverted.setSeconds(0);
   startingDayAdjusted = startingDayConverted.setMilliseconds(0);
   
  //  let startingDay = this.state.startingDayAdjusted;
   let interval = this.state.watering_interval * dayInMs;
   let lastWateringDate = []
   

   while (startingDayAdjusted + amountOfIntervals * interval < today-interval) {
     amountOfIntervals++;
      lastWateringDate.push({
        date: startingDayAdjusted + amountOfIntervals * interval,
        isWatered: ""
      })
      console.log(lastWateringDate, "Last Watering Add")

    }
    // let lastWatering = startingDay + (this.amountOfIntervals-1) * interval;
      
    
   let plantData = {
     name: this.state.name,
     watering_interval: this.state.watering_interval,
     starting_day: startingDayAdjusted,
     note: "",
     picture_url: this.state.picture_url,
     description: this.state.description,
     lastWateringDate: lastWateringDate
    };    
        api.addPlant(plantData)
        .then(res => this.props.history.push("/home"))
      }

      addDefaultSrc() {
        this.setState({picture_url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/intermediary/f/76407001-87db-4853-8df3-85fc98ca7584/dc90vh4-5a135524-aa53-42cc-b4e5-02ca3deb43d8.png"})
      }

  render() {
    return (
      <div className="addPlantView">
      
        {!this.state.view1Clicked && (
          <AddPlantView1 onClick={this.handleNameSubmit} />
        )}
        {this.state.view2Clicked && (
          <AddPlantView2 onError={() => this.addDefaultSrc()} img={this.state.picture_url} onBack={this.handleGoBack} onSubmit={this.handleWateringSubmit} />
        )}
        {this.state.view3Clicked && (
          <AddPlantView3 onBack={this.handleGoBack} onSubmit={this.handleStartingDaySubmit} />
        )}
      </div>
    );
  }
}

export default AddPlant;
