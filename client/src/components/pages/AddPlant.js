import React, { Component } from "react";
import Button from "../button/Button";
import Input from "../input/Input";
import api from "../../api";


class Home extends Component {
  constructor(props) {
    super(props);

      this.checkBox1 = React.createRef();
      this.checkBox2 = React.createRef();
      this.checkBox3 = React.createRef();
      this.checkBox4 = React.createRef();
      this.checkBox = [this.checkBox1, this.checkBox2, this.checkBox3, this.checkBox4]
  

    this.state = {
      name: "",
      view1Clicked: false,
      view2Clicked: false,
      view3Clicked: false,
      watering_interval: "",
      watering_interval_input: "",
      isChecked: false,
      starting_day: new Date(),
    };
  }

  handleSubmit(viewNo) {
    switch (viewNo) {
      case 1:
        this.setState({
          name: this.state.name,
          view1Clicked: true,
          view2Clicked: true
        });
        break;

      case 2:
        if (this.state.isChecked) {
          this.setState({
            watering_interval: this.state.watering_interval,
            view2Clicked: false,
            view3Clicked: true
          });
        } else {
          console.log("HHH")

          this.setState({
            watering_interval: this.state.watering_interval_input,
            view2Clicked: false,
            view3Clicked: true
          });
        }
        break;

      case 3:
        console.log(this.state.starting_day, this.props);
        let plantData = {
          name: this.state.name,
          watering_interval: this.state.watering_interval,
          starting_day: this.state.starting_day
        };

        api.addPlant({ plantData });
        this.props.history.push("/collection");
        break;
    }
  }
  handleChange(e, viewNo) {
    let checkBox = [this.checkBox1, this.checkBox2, this.checkBox3, this.checkBox4]
      for (let i = 0; i < 4; i++) {
        checkBox[i] = this.checkBox[i].current;
      }

    switch (viewNo) {
      case 1:
        this.setState({ name: e.target.value });
        break;

      case 2:
        this.setState({
          watering_interval_input: e.target.value,
          checkedBoxes: false
        })
        for (let i = 0; i < 4; i++) {
          checkBox[i].checked = false
        } 
    
        break;

      case 3:
        this.setState({ starting_day: e.target.value });
        break;
    }
  }

  handleCheckbox(e, checkBoxNo) {
    this.setState({watering_interval_input:""})
    if (!e.target.checked) {this.setState({ watering_interval: "", isChecked: false })
  }
   
    else if(this.state.isChecked){
    let checkBox = [this.checkBox1, this.checkBox2, this.checkBox3, this.checkBox4]
      for (let i = 0; i < 4; i++) {
        checkBox[i] = this.checkBox[i].current;
      }

      for (let i=0; i < 4; i++) {
        if (i === checkBoxNo) {
        continue}
        checkBox[i].checked = false
      }
      this.setState({isChecked:true,
        watering_interval: e.target.value})

    }
    else {
      this.setState({ watering_interval: e.target.value,
    isChecked: true })
    console.log("3. If Statement");

   
  }
}




  render() {
    return (
      <div className="Home">

        {!this.state.view1Clicked && (
          <div>
            <h1>Carrot Love</h1>
            <p>What plants do you want to water?</p>
            <Input
              type="text"
              onChange={e => this.handleChange(e, 1)}
              value={this.state.name}
            />
            <Button className="btn-submit" onClick={() => this.handleSubmit(1)}>
              Go
            </Button>
          </div>
        )}


        {this.state.view2Clicked && (
          <div>
            <h2>How often you want to water your love?</h2>
            <div className="radio-buttons">
              <input ref={this.checkBox1}
                onChange={e => this.handleCheckbox(e,0)}
                type="checkbox"
                name="watering_interval"
                value="1"
              />
              Daily
              <input ref={this.checkBox2}
                onChange={e => this.handleCheckbox(e,1)}
                type="checkbox"
                name="watering_interval"
                value="2"
              />
              Every 2nd day
              <input ref={this.checkBox3}
                onChange={e => this.handleCheckbox(e,2)}
                type="checkbox"
                name="watering_interval"
                value="7"
              />
              weekly
              <input ref={this.checkBox4}
                onChange={e => this.handleCheckbox(e,3)}
                type="checkbox"
                name="watering_interval"
                value="30"
              />
              monthly
            </div>
            <Input 
              type="number"
              onChange={e => this.handleChange(e, 2)}
              value={this.state.watering_interval_input}
            />
            <p>
              You don't know? <a href="#">Get help</a>
            </p>
            <Button className="btn-submit" onClick={() => this.handleSubmit(2)}>
              Next
            </Button>
          </div>
        )}


        {this.state.view3Clicked && (
          <div>
                    {console.log(this.state.watering_interval)}

            <h2>When do you want to start?</h2>

            <Input
              type="date"
              onChange={e => this.handleChange(e, 3)}
              value={this.state.starting_day}
            />
            <Button className="btn-submit" onClick={() => this.handleSubmit(3)}>
              Add
            </Button>
          </div>
        )}

      </div>
    );
  }
}

export default Home;
