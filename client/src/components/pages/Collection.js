import React, { Component } from 'react';
import api from '../../api';
import { Route, Link, Switch } from 'react-router-dom';
import PlantDetail from './PlantDetail';
import { Box, Grid, Heading, Paragraph, Image, Button, Collapsible } from 'grommet';
import {AddCircle} from 'grommet-icons';


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
      <Box align='center' margin='xsmall' pad='xsmall'>
      </Box>
        <Box align="start" gap="small">
          <Link to='/'><AddCircle color='#78bc61' /></Link>
        </Box> 
      <Box direction='row-responsive' wrap='true' flex='shrink'>
      {this.state.plants.map(p =>
        <Box key={p._id} /* basis='1/4' */   margin='small' border={{side: "top", color: '#78bc61', size: 'medium'}}>
            <Image fit='cover' src={p.picture_url} margin='xsmall' style={{ width:200, height:150 }}/>
              {/* <Link to={`/plant/${p._id}`}>1</Link> */}
          <Link to={`/plant/${p._id}`}><h3>{p.name}</h3></Link>
          <Paragraph alignSelf='center'>{`next water appointment: WIP`}</Paragraph>
        </Box>)}
        <Switch>
          <Route path="/plant/:id" component={PlantDetail} />
        </Switch>
      </Box>
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
