import React, { Component } from "react";
import Input from "../../input/Input";
import { Box, Calendar, Button, Grommet, Heading, Text } from "grommet";

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
      <div className="AddPlantView3">
            <h2>When do you want to start?</h2>
            <Calendar
          date={this.state.starting_day}
          onSelect={this.onSelect}
          size="medium"
          alignSelf="center"
          bounds={["2018-01-08", "2019-12-13"]}
        />
            <Button label="Add" className="btn-submit" onClick={() => this.handleSubmit(this.state.starting_day)} />
            <Button label="Back" className="btn-submit" onClick={() => this.handleGoBack()}/>

      </div>
    );
  }
}

export default AddPlantView3;
