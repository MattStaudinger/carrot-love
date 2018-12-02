import React, { Component } from "react";
import AddPlantView1 from "./AddPlant/AddPlantView1";
import AddPlantView2 from "./AddPlant/AddPlantView2";
import AddPlantView3 from "./AddPlant/AddPlantView3";
import api from "../../api";
import axios from 'axios';


const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px',
    },
  },
};


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
  }

  handleNameSubmit(value) {

  let url = `https://openfarm.cc/api/v1/crops?filter=${value}`
  console.log("url", url);
let plantUserLowerCase = value.toLowerCase();
  axios.get(url)
  .then(plants => {
  console.log("plants", plants)

    let plantName = plants.data.data.filter(plant => {
      let plantApiLowerCase = plant.attributes.name.toLowerCase()
      return(
        plantApiLowerCase === plantUserLowerCase
    )})
  console.log("plantname", plantName.length)

    if (plantName.length > 0) {
      this.setState({
        description: plantName[0].attributes.description,
        picture_url : plantName[0].attributes.main_image_path})
      console.log("Name", this.state)
    }
        this.setState({
          name: value,
          view1Clicked: true,
          view2Clicked: true
        });


  })
}


handleWateringSubmit(checkBoxValue, InputValue, isCheckbox) {
  if (isCheckbox) {
    this.setState({
      watering_interval: checkBoxValue,
      view2Clicked: false,
      view3Clicked: true
    });
  } else {
    this.setState({
      watering_interval: InputValue,
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
          <AddPlantView2 onClick={this.handleWateringSubmit} />
        )}
        {this.state.view3Clicked && (
          <AddPlantView3 onClick={this.handleStartingDaySubmit} />
        )}
      </div>
    );
  }
}

export default AddPlant;
