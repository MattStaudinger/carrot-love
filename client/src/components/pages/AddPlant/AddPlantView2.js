import React, { Component } from "react";
import Input from "../../input/Input";
import { Box, Grommet, Text, TextInput, FormField, Button, CheckBox } from "grommet";
import { Previous } from "grommet-icons";


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

handleImgError = () => {
  console.log("ERROR IMG", this.props.img)
  this.props.onError();
}


  render() {
    return (
      <div className="addPlantView2">
      <img className="hidden" onError={this.handleImgError} src={this.props.img} />
      <div className="center">
            <h2>How often you want to water your beloved one?</h2>
            <div className="radio-buttons">

            <div className="checkbox-container">
               <input 
                ref={this.checkBox1}
                onChange={e => this.handleCheckbox(e,0)}
                type="checkbox"
                name="watering_interval"
                value="1"
                id="check-1"
                name="check"
              />
        <label for="check-1">
          <div></div>daily
        </label>
              {/* <p>daily</p> */}
             

                                          </div>
                                          <div className="checkbox-container">

              <input ref={this.checkBox2}
                onChange={e => this.handleCheckbox(e,1)}
                type="checkbox"
                name="watering_interval"
                value="2"
                id="check-2"
                name="check"
              />
              <label  for="check-2">
          <div></div>every 2nd day
        </label>
              </div>
              
            <div className="checkbox-container">


              <input ref={this.checkBox3}
                onChange={e => this.handleCheckbox(e,2)}
                type="checkbox"
                name="watering_interval"
                value="7"
                id="check-3"

              />
              <label for="check-3">
          <div></div>weekly
        </label>

</div>
            </div>

            
          <input
          className="user-input margin"
          value={this.state.watering_interval_input}
          onChange={e => this.handleChange(e)}
          type="number"
          />
          <p>alternatively type your prefered watering interval</p>
            
            <Button margin="20px" label="Next" className="btn-submit margin-btn" color="white" onClick={() => this.handleSubmit(this.state.watering_interval, this.state.watering_interval_input, this.state.isChecked)} />
            <Button icon={<Previous color="white" size='medium' />} className="btn-back" color="white" onClick={() => this.handleGoBack()} />
            <p className="margin">
              You don't know? <a href={`https://www.google.de/search?q=how+often+to+water+a+${this.props.searchTerm}`} target="_blank" rel="noopener noreferrer">Get help</a>
            </p>
                      </div>
                      </div>
        )}


}

export default Home;
