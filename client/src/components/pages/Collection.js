import React, { Component } from 'react';
import api from '../../api';

class Collection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      plants: []
    }
  }
  render() {
    return (
      <div className="Collection">
        <h2>Your collection of plants:</h2>
        {this.state.plants.map(c =>
        <div key={c._id}>
          <img src={c.picture_url} />
          <h3>{c.name}</h3>
          <p>next water appointment: WIP</p>
        </div>)}
      </div>
    );
  }
  componentDidMount() {
    api.getPlants()
      .then(plants => {
        console.log(plants)
        this.setState({
          plants: plants
        })
      })
      .catch(err => console.log(err))
  }
}

export default Collection;
