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
      isDeleted: false
    };
    this.handleDetail = this.handleDetail.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }


  handleDetail(id){
    this.setState({
      openNotification:true,
      plantId: id
    })
  }
  handleClose(){
    this.setState({
      openNotification:false,
      isDeleted : true
    })
  }

  


  render() {
    const { openNotification } = this.state;
    return (
      <Grommet full theme={grommet}>
        <Box fill>
         
          <Box flex direction="row">
            <Box flex >
           
       <Button
              onClick={() =>
                this.setState({ openNotification: !openNotification, isDeleted:false })
              }
              icon={<CaretPrevious
                color="green" />}
            />
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
          </Box>
        </Box>
      </Grommet>
    );
  }
}
      


