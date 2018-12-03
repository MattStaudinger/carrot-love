import React, { Component } from "react";
import Button from "../../button/Button";
import Input from "../../input/Input";


class Home extends Component {
  constructor(props) {
    super(props);
      this.checkBox1 = React.createRef();
      this.checkBox2 = React.createRef();
      this.checkBox3 = React.createRef();
      this.checkBox = [this.checkBox1, this.checkBox2, this.checkBox3]
  
    this.state = {
      watering_interval: "",
      watering_interval_input: "",
      isChecked: false,
    };
  }

  handleSubmit(checkBoxValue, inputValue, isCheckbox) {
    if (checkBoxValue === "" && inputValue==="") {
      alert("ENTER SOMETHING")
    } else this.props.onSubmit(checkBoxValue, inputValue, isCheckbox)
  }

  handleGoBack() {
    this.props.onBack("view2")
  }

  handleChange(e) {
    let checkBox = [this.checkBox1, this.checkBox2, this.checkBox3]
      for (let i = 0; i < 3; i++) {
        checkBox[i] = this.checkBox[i].current;
      }
      let inputUser = Math.round(e.target.value)
        this.setState({
          watering_interval_input: e.target.value,
          checkedBoxes: false,
          isChecked:false,
        })
        for (let i = 0; i < 3; i++) {
          checkBox[i].checked = false
        } 
  }

  handleCheckbox(e, checkBoxNo) {
    this.setState({watering_interval_input:""})
    if (!e.target.checked) {this.setState({ watering_interval: "", isChecked: false })
  }
   
    else if(this.state.isChecked){
    let checkBox = [this.checkBox1, this.checkBox2, this.checkBox3]
      for (let i = 0; i < 3; i++) {
        checkBox[i] = this.checkBox[i].current;
      }

      for (let i=0; i < 3; i++) {
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

   
  }
}




  render() {
    return (
      <div className="AddPlantView2">
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
            </div>
            <Input 
              type="number"
              onChange={e => this.handleChange(e)}
              value={this.state.watering_interval_input}
            />
            <p>
              You don't know? <a href="#">Get help</a>
            </p>
            <Button className="btn-submit" onClick={() => this.handleSubmit(this.state.watering_interval, this.state.watering_interval_input, this.state.isChecked)}>
              Next
            </Button>
            <Button className="btn-submit" onClick={() => this.handleGoBack()}>Back</Button>
          </div>
        )}


}

export default Home;
