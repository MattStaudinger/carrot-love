import React, { Component } from "react";

import { FormDown, FormNext, Notification, CaretPrevious
} from "grommet-icons";

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
         
          <Box flex direction="row">
            <Box flex >
           
       <Button
              onClick={() =>
                this.setState({ openNotification: !openNotification })
              }
              icon={<CaretPrevious
                color="green" />}
            />
      <Collection />

            </Box>
            <Collapsible direction="horizontal" open={openNotification}>
              <Box
                width="500px"
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
      