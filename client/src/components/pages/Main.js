import React, { Component } from "react";

import { FormDown, FormNext, Notification, CaretPrevious
} from "grommet-icons";

import { Box, Button, Collapsible, Heading, Grommet, Text } from "grommet";
import { grommet } from "grommet/themes";
import Collection from './Collection';
import CalenderView from './Calender';
import PlantDetail from './PlantDetail';
import EditPlant from './EditPlant';

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      openNotification: false,
      plantId : "",
      isDeleted: false,
      openCalender: false
    };
    this.handleDetail = this.handleDetail.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }


  handleDetail(id){
    this.setState({
      openNotification:true,
      plantId: id,
      openCalender: false,
    })
  }
  handleClose(){
    this.setState({
      openNotification:false,
      isDeleted : true
    })
  }

  


  render() {
    const { openNotification, openCalender } = this.state;
    return (
      <div className="main">
     
     
     {!this.state.openNotification && ( <button onClick={()=> {this.setState({openCalender:!openCalender})}} className="btn">
      <i class="far fa-calendar-alt"></i>
            <span>Upcoming watering</span>
      </button>)}
      <Grommet full theme={grommet}>
        <Box fill>
         
          <Box flex direction="row">
            <Box flex >
           
      
      <Collection isToggled={this.state.openNotification} onClick={this.handleDetail}/>
            </Box>
            <Collapsible direction="horizontal" open={openNotification}>
              <Box
                width="100vw"
                /* background="light-2" */
                /* pad="small" */
                /* elevation="small" */
              >
              <PlantDetail onClick={this.handleClose} id={this.state.plantId} />
              </Box>
            </Collapsible>
          <Collapsible direction="horizontal" open={openCalender}>
              <Box
className="collapsible"                /* background="light-2" */
                /* pad="small" */
                /* elevation="small" */
              >
                      <CalenderView onClick={this.handleClose} />
              </Box>
            </Collapsible>
          </Box>
        </Box>
      </Grommet>
      </div>
    );
  }
}
      


