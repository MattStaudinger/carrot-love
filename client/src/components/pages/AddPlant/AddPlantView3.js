import React, { Component } from "react";
import Button from "../../button/Button";
import Input from "../../input/Input";

class AddPlantView3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starting_day: new Date()
    };
  }

  handleSubmit(startingDay) {
    this.props.onClick(startingDay)
  }

  handleChange(e) {
        this.setState({ starting_day: e.target.value });
    }

  render() {
    return (
      <div className="AddPlantView3">
            <h2>When do you want to start?</h2>
            <Input
              type="date"
              onChange={e => this.handleChange(e)}
              value={this.state.starting_day}
            />
            <Button className="btn-submit" onClick={() => this.handleSubmit(this.state.starting_day)}>
              Add
            </Button>
      </div>
    );
  }
}

export default AddPlantView3;