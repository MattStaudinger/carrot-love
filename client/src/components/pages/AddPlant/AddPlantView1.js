import Button from "../../button/Button";
import Input from "../../input/Input";
import DropDownInput from "../../dropDownInput/DropDownInput";
import axios from 'axios'
import { Search } from "grommet-icons";
import { Box, Image, Grommet, Text, TextInput } from "grommet";
import React, { createRef, Component } from "react";
import { grommet } from "grommet/themes";
import { deepMerge } from "grommet/utils";

const myCustomTheme = deepMerge(grommet, {
  global: {
    drop: {
      background: "#444444",
      shadowSize: "medium",
      extend: `
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;

        overflow: hidden;
      `
    },
    elevation: {
      dark: {
        medium: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
      },
      light: {
        medium: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
      }
    },
    input: {
      weight: 400
    },
    font: {
      size: "14px"
    }
  }
});


class AddPlantView1 extends Component {
  constructor(props) {
    super(props);

      this.state = {
      name: "",
      value: "", 
      suggestionOpen: false, 
      suggestedFolks: []
    };
  this.boxRef = createRef();
  }

  handleSubmit(value) {
        this.props.onClick(value)
  }


  onChange = event => {

  let inputUser = event.target.value
  let inputUserLowerCaps = inputUser.toLowerCase()
  let plantNamesUpdated
  let url = `https://openfarm.cc/api/v1/crops?filter=${inputUserLowerCaps}`
  console.log("API", url)
  this.setState({ name: inputUser });

  axios.get(url)
  .then(plants => {
    console.log(plants);
    let plantNames = plants.data.data.map(
      plant => (plant.attributes.name.toLowerCase())
    )
    console.log("Plannames: ",plantNames)
    plantNamesUpdated = plantNames.filter((plant, i) => {
      console.log("i")
      return (plant.includes(inputUserLowerCaps) && i < 7);
    })
  
  // console.log(plantNamesUpdated)
  // this.setState({ value: inputUser })
  // const { value } = this.state;
  
 
    // simulate an async call to the backend
 this.setState({ suggestedFolks: plantNamesUpdated })
    // this.setState({ suggestedFolks: plantNamesUpdated })
  
})


}

  onSelect = event => this.setState({ name: event.suggestion.name });

  renderSuggestions = () => {
    const { name, suggestedFolks } = this.state;
    console.log(suggestedFolks)

    return suggestedFolks
      .filter(
        (name => name.toLowerCase().indexOf(name.toLowerCase()) >= 0
      ))
      .map(( name , index, list) => ({
        label: (
          <Box
            direction="row"
            align="center"
            gap="small"
            border={index < list.length - 1 ? "bottom" : undefined}
            pad="small"
          >
            {/* <Image
              width="48px"
              src={imageUrl}
              style={{ borderRadius: "100%" }}
            /> */}
            <Text>
              <strong>{name}</strong>
            </Text>
          {console.log(name)}

          </Box>
        ),
        name: name
      }));
  };


  render() {
    const { suggestionOpen, name } = this.state;

    return (
      <div className="AddPlantView1 Home">
            <h1>Carrot Love</h1>
            <p>What plants do you want to water?</p>



 <Grommet theme={myCustomTheme} auto>
        <Box fill align="center" pad={{ top: "medium" }} flex-shrink="true">
          <Box
            ref={this.boxRef}
            width="large"
            direction="row"
            align="center"
            pad={{ horizontal: "small", vertical: "xsmall" }}
            round="small"
            elevation={suggestionOpen ? "medium" : undefined}
            border={{
              side: "all",
              color: suggestionOpen ? "transparent" : "border"
            }}
            style={
              suggestionOpen
                ? {
                    borderBottomLeftRadius: "0px",
                    borderBottomRightRadius: "0px"
                  }
                : undefined
            }
          >
            <Search color="brand" />
            <TextInput
              type="search"
              dropTarget={this.boxRef.current}
              plain
              value={this.state.name}
              onChange={this.onChange}
              onSelect={this.onSelect}
              suggestions={this.renderSuggestions()}
              onSuggestionsOpen={() => this.setState({ suggestionOpen: true })}
              onSuggestionsClose={() =>
                this.setState({ suggestionOpen: false })
              }
            />
          </Box>
        </Box>
      </Grommet>
           
            <Button className="btn-submit" name="view1" onClick={() => this.handleSubmit(this.state.name)}>
              Go
            </Button>
      </div>
    );
  }

  componentDidMount() {
    this.forceUpdate();
  }
}

export default AddPlantView1;
