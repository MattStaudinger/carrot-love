import React, { Component } from "react";
import AddPlantView1 from "./AddPlant/AddPlantView1";
import AddPlantView2 from "./AddPlant/AddPlantView2";
import AddPlantView3 from "./AddPlant/AddPlantView3";
import api from "../../api";
import axios from 'axios'


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
    switch(viewNo) {
      case "view2":
      this.setState({view1Clicked: false,
        view2Clicked: false})
      break;
      case "view3":
      this.setState({view2Clicked: true,
        view3Clicked: false})
      break;
    }
  }

  handleNameSubmit(plantData) {

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
        let plantData = {
          name: this.state.name,
          watering_interval: this.state.watering_interval,
          starting_day: startingDay,
          note: "",
          picture_url: this.state.picture_url,
          description: this.state.description
        };

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
