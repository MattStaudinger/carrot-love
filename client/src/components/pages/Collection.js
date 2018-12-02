import React, { Component } from 'react';
import api from '../../api';
import { Route, Link, Switch } from 'react-router-dom';
import PlantDetail from './PlantDetail';
import { Box, Grid, Heading, Paragraph, Image } from 'grommet';


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
       {/*  <h2>Your collection of plants:</h2>
        {this.state.plants.map(p =>
        <div key={p._id}>
          <Link to={`/plant/${p._id}`}><img src={p.picture_url} /></Link>
          <Link to={`/plant/${p._id}`}><h3>{p.name}</h3></Link>
          <p>next water appointment: WIP</p>
        </div>)}
        <Switch>
          <Route path="/plant/:id" component={PlantDetail} />
        </Switch> */}
      <Box responsive='true'>
      <Heading level={2}>Your collection of plants:</Heading>
      {this.state.plants.map(p =>
        <Box key={p._id} 
        border={{ color: '#78bc61', "size": "medium" }} basis='medium' margin='xsmall' >
            <Image alignSelf='center' fit='contain' margin='xsmall' src={p.picture_url}>
              {/* <Link to={`/plant/${p._id}`}>1</Link> */}
              </Image>
          <Link to={`/plant/${p._id}`}><h3>{p.name}</h3></Link>
          <Paragraph alignSelf='center'>{`next water appointment: WIP`}</Paragraph>
        </Box>)}
        <Switch>
          <Route path="/plant/:id" component={PlantDetail} />
        </Switch>
      </Box>
      {/* <Box gridArea='plant' background='brand' />
      <Box gridArea='side' background='brand' />
      <Box gridArea='foot' background='accent-1' /> */}
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
