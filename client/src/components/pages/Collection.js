import React, { Component } from 'react';
import api from '../../api';
import { Route, Link, Switch } from 'react-router-dom';
import PlantDetail from './PlantDetail'


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
        {this.state.plants.map(p =>
        <div key={p._id}>
          <Link to={`/plant/${p._id}`}><img src={p.picture_url} /></Link>
          <Link to={`/plant/${p._id}`}><h3>{p.name}</h3></Link>
          <p>next water appointment: WIP</p>
        </div>)}
        <Switch>
          <Route path="/plant/:id" component={PlantDetail} />
        </Switch>
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
