import React, { Component } from "react";

import { FormDown, FormNext, Notification } from "grommet-icons";

import { Box, Button, Collapsible, Heading, Grommet, Text } from "grommet";
import { grommet } from "grommet/themes";
import Collection from './Collection';
import CalenderView from './Calender';

export default class HorizontalCollapsible extends Component {
  state = {
    openNotification: false
  };

  render() {
    const { openNotification } = this.state;
    return (
      <Grommet full theme={grommet}>
        <Box fill>
          <Box
            as="header"
            direction="row"
            align="center"
            pad={{ vertical: "small", horizontal: "medium" }}
            justify="between"
            background="neutral-4"
            elevation="large"
            style={{ zIndex: "1000" }}
          >
            <Heading level={3} margin="none" color="white">
              <strong>My App</strong>
            </Heading>
            <Button
              onClick={() =>
                this.setState({ openNotification: !openNotification })
              }
              icon={<Notification color="white" />}
            />
          </Box>
          <Box flex direction="row">
            <Box flex align="center" justify="center">
      <Collection />
            </Box>
            <Collapsible direction="horizontal" open={openNotification}>
              <Box
                
                width="large"
                background="light-2"
                pad="small"
                elevation="small"
              >
                <CalenderView />
              </Box>
            </Collapsible>
          </Box>
        </Box>
      </Grommet>
    );
  }
}
      