import React, { Component } from 'react';
import { TextArea, TextInput, Box} from 'grommet';
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
  console.log(this.state)
}

fuckingloading(){
  this.props.history.push('/collection')
}

  handleSubmit(event) {
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
      console.log("res heeeeellllllooooo", res)
      if (this.state.file) {
        api.addPicture(this.state.file, this.state._id)
        .then(res => {
          console.log('res is outside if!', res)
          this.props.history.push('/collection')
        })
      }
      else {
        this.props.history.push('/collection')
      }     
    })
    .catch(err => console.log(err))
  
}

  render() {
    return (
      <div className='BelowNav'>
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