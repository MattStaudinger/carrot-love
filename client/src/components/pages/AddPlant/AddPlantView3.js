import React, { Component } from "react";
import Input from "../../input/Input";
import { Box, Calendar, Button, Grommet, Heading, Text } from "grommet";

import { Previous } from "grommet-icons";



class AddPlantView3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starting_day: new Date()
    };
  }

  handleSubmit(startingDay) {
    if (startingDay === undefined) {
      alert("ENTER SOMETHING")
    } else {
      let startingDateInMs = new Date(startingDay).getTime()
      console.log(startingDateInMs)
      this.props.onSubmit(startingDay)
    }
  }

  handleGoBack() {
   this.props.onBack("view3")
  }

  onSelect = nextDate => {
      const { starting_day } = this.state;
      this.setState({ starting_day: nextDate !== starting_day ? nextDate : undefined });
    };

  render() {
    return (
      <div className="addPlantView3">
      <div className="center">
            <h2>What day do you want to start watering?</h2>
            <Calendar
          date={this.state.starting_day}
          onSelect={this.onSelect}
          size="medium"
          bounds={["2018-01-08", "2019-12-13"]}
        />

            <Button margin="5px" label="Add" color="white" className="btn-submit" onClick={() => this.handleSubmit(this.state.starting_day)} />
</div>
            <Button className="btn-back" icon={<Previous color="white" size='medium' />} onClick={() => this.handleGoBack()}/>

      </div>
    );
  }
}

export default AddPlantView3;
