import React, { Component } from 'react';
import api from '../../api';
import { TextArea, TextInput, Box, Calendar, Button, Grommet, Heading, Text } from "grommet";


class EditPlant extends Component {
  constructor(props) {
    super(props)
    this.state = {
      _id: "",
      name: "",
      watering_interval: "",
      starting_date: "",
      _owner: "",
      description: "",
      note: "",
      picture_url: "",
      file: null,
    } 
    this.handleChange = this.handleChange.bind(this);
    this.handleChangePicture = this.handleChangePicture.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);


  
  }
  handleChange (e, inputName) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
        [inputName]: value
    });
}

handleChangePicture (e, inputName) {
  this.setState({
    file: e.target.files[0],
  });
}

fuckingloading(){
  this.props.history.push('/home')
}

  handleSubmit(event) {
    event.preventDefault();
    let startingDateInMs
    let startingDay = this.state.starting_date    
    if (startingDay === undefined) {
      alert("ENTER SOMETHING")
      return
    } else {
      startingDateInMs = new Date(startingDay).getTime()
    }


    console.log("STATE", startingDateInMs, typeof(startingDateInMs))

    let plantData = {
        _id: this.state._id,
        name: this.state.name,
        watering_interval: this.state.watering_interval,
        starting_day: startingDateInMs,
        _owner: this.state._owner,
        description: this.state.description,
        note: this.state.note,
        picture_url: this.state.picture_url,
        lastWateringDate : this.state.lastWateringDate
      }

   api.editPlant(plantData, this.props.match.params.name)
    .then(res => {
      console.log("res heeeeellllllooooo", res)
      if (this.state.file) {
        api.addPicture(this.state.file, this.state._id)
        .then(res => {
          console.log('res is outside if!', res)
          this.props.history.push('/home')
        })
      }
      else {
        this.props.history.push('/home')
      }     
    })
    .catch(err => console.log(err))
  
}

onSelect = nextDate => {
  const { starting_date } = this.state;
  this.setState({ starting_date: nextDate !== starting_date ? nextDate : undefined });
};

  render() {
    return (
      <div className="edit-plant">
        {console.log(this.state.starting_date)}
      <form onSubmit={this.handleSubmit}>
      <img src={this.state.picture_url} style={{height: "200px"}}/>
      <br/>
      <input type="file" onChange={(e)=>this.handleChangePicture(e, "image")} />
      <br/>
        <label>
          Name:
          <TextInput
            name="name"
            type="string"
            value={this.state.name}
            onChange={(e)=> this.handleChange(e, "name")} />
        </label>
        <br />
        <label>
          Watering Interval:
          <input
            name="watering_interval"
            type="number"
            placeholder={this.state.watering_interval}
            value={this.state.watering_interval}
            onChange={(e)=> this.handleChange(e, "watering_interval")} />
        </label>
        <br />
        <Calendar
          date={this.state.starting_date}
          onSelect={this.onSelect}
          size="medium"
          alignSelf="center"
          bounds={["2018-01-08", "2019-12-13"]}
        />
        <br />
        <label>
          Note:
          <TextArea
            name="note"
            type="string"
            value={this.state.note}
            onChange={(e)=> this.handleChange(e, "note")} />
        </label>
        <br />
        <label>
          Description:
          <TextArea
            name="description"
            type="string"
            value={this.state.description}
            onChange={(e)=> this.handleChange(e, "description")} />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
    );
  }
  componentDidMount() {
    api.getPlantDetail(this.props.match.params.name)
      .then(plant => {
        console.log(plant)
        let startingDayConverted = new Date(plant.starting_day).toISOString()
        console.log("DIDMOUNT", startingDayConverted, plant)
        this.setState({
          _id: plant._id,
          name: plant.name,
          watering_interval: plant.watering_interval,
          starting_date: startingDayConverted,
          _owner: plant._owner,
          description: plant.description,
          note: plant.note,
          picture_url: plant.picture_url,
          lastWateringDate: plant.lastWateringDate
        })
      })
      .catch(err => console.log(err))
  }

}

export default EditPlant;