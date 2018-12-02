import React, { Component } from 'react';
import api from '../../api';


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
    } 
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  
  }
  handleChange (e, inputName) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    //const name = target.name;
    console.log(this.state)


    this.setState({
        [inputName]: value
    });
}

  handleSubmit(event) {
   console.log("updated!")
   console.log( this.state,this.props.match.params.name)

    event.preventDefault();
    let plantData = {
      _id: this.state._id,
      name: this.state.name,
      watering_interval: this.state.watering_interval,
      starting_date: this.state.starting_date,
      _owner: this.state._owner,
      description: this.state.description,
      note: this.state.note,
      picture_url: this.state.picture_url,
    } 
    api.editPlant(plantData, this.props.match.params.name)
    .then(res => {
      console.log("res", res)
      this.props.history.push('/collection')
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
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
        <label>
          Starting:
          <input
            name="starting_date"
            type="date"
            placeholder={this.state.watering_interval}
            value={this.state.starting_date}
            onChange={(e)=> this.handleChange(e, "plant.starting_date")} />
        </label>
        <br />
        <label>
          Note:
          <input
            name="note"
            type="string"
            //placeholder={this.state.note}
            value={this.state.note}
            onChange={(e)=> this.handleChange(e, "note")} />
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
        this.setState({
          _id: plant._id,
          name: plant.name,
          watering_interval: plant.watering_interval,
          starting_date: plant.starting_date,
          _owner: plant._owner,
          description: plant.description,
          note: plant.note,
          picture_url: plant.picture_url,
        })
      })
      .catch(err => console.log(err))
  }

}

export default EditPlant;
