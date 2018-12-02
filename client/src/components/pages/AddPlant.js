import React, { Component } from "react";
import AddPlantView1 from "./AddPlant/AddPlantView1";
import AddPlantView2 from "./AddPlant/AddPlantView2";
import AddPlantView3 from "./AddPlant/AddPlantView3";
import api from "../../api";



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
  if (!api.isLoggedIn()) {
    this.props.history.push('/login')
    return
   }
   //Adjusts the starting day to midnight, so it will always be the same day when later calculated in the
   let startingDayAdjusted = startingDay.setHours(0);
   startingDayAdjusted = startingDay.setMinutes(0);
   startingDayAdjusted = startingDay.setSeconds(0);
   startingDayAdjusted = startingDay.setMilliseconds(0);

   let plantData = {
     name: this.state.name,
     watering_interval: this.state.watering_interval,
     starting_day: startingDayAdjusted,
     note: "",
     picture_url: this.state.picture_url,
     description: this.state.description
    };
  console.log("Type: ", typeof(plantData.starting_day));
  console.log("Data: ", plantData);
    
        api.addPlant(plantData)
        .then(res => this.props.history.push("/collection"))
      }

  render() {
    return (
      <div className="AddPlantView">
      
        {!this.state.view1Clicked && (
          <AddPlantView1 onClick={this.handleNameSubmit} />
        )}
        {this.state.view2Clicked && (
          <AddPlantView2 onBack={this.handleGoBack} onSubmit={this.handleWateringSubmit} />
        )}
        {this.state.view3Clicked && (
          <AddPlantView3 onBack={this.handleGoBack} onSubmit={this.handleStartingDaySubmit} />
        )}
      </div>
    );
  }
}

export default AddPlant;
