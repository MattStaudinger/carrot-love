import React, { Component } from "react";
import { Box, Collapsible, Grommet } from "grommet";
import { grommet } from "grommet/themes";
import Collection from "./Collection";
import CalenderView from "./Calender";
import PlantDetail from "./PlantDetail";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openNotification: false,
      plantId: "",
      isDeleted: false,
      openCalender: false,
      isUpdated: false
    };
    this.handleDetail = this.handleDetail.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  hasBeenUpdated() {
    this.setState({
      isDeleted: false
    });
  }

  handleDetail(id) {
    this.setState({
      openNotification: true,
      plantId: id,
      openCalender: false
    });
  }
  handleClose() {
    this.setState({
      openNotification: false,
      isDeleted: true,
      isUpdated: true
    });
  }

  render() {
    const { openNotification, openCalender } = this.state;
    return (
      <div className="main">
        {!this.state.openNotification && (
          <button
            onClick={() => {
              this.setState({ openCalender: !openCalender });
            }}
            className="btn"
          >
            <i className="far fa-calendar-alt" />
            <span>Upcoming watering</span>
          </button>
        )}
        <Grommet full theme={grommet}>
          <Box fill>
            <Box flex direction="row">
              <Box flex>
                <Collection
                  isToggled={this.state.openNotification}
                  onClick={this.handleDetail}
                />
              </Box>
              <Collapsible direction="horizontal" open={openNotification}>
                <Box
                  width="100vw"
                >
                 {openNotification && ( <PlantDetail
                    onClick={this.handleClose}
                    id={this.state.plantId}
                 /> )}
                </Box>
              </Collapsible>
              <Collapsible direction="horizontal" open={openCalender}>
                <Box
                  className="collapsible" /* background="light-2" */
                  /* pad="small" */
                  /* elevation="small" */
                >
                  <CalenderView
                    isUpdated={this.state.isDeleted}
                    hasBeenUpdated={() => {
                      this.hasBeenUpdated();
                    }}
                    onClick={this.handleClose}
                  />
                </Box>
              </Collapsible>
            </Box>
          </Box>
        </Grommet>
        <footer />
      </div>
    );
  }
}
