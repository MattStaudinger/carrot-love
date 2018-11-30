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


// const plants = this.props.plantsFromAPI
const folks = 
[
  {
    name: "Alan Souza",
    imageUrl:
      "https://s.gravatar.com/avatar/b226da5c619b18b44eb95c30be393953?s=80"
  },
  {
    name: "Bryan Jacquot",
    imageUrl:
      "https://s.gravatar.com/avatar/10d15019166606cfed23846a7f902660?s=80"
  },
  {
    name: "Chris Carlozzi",
    imageUrl:
      "https://s.gravatar.com/avatar/56ea1e2ecd0d3cc85479b2d09e31d071?s=80"
  },
  {
    name: "Eric Soderberg",
    imageUrl:
      "https://s.gravatar.com/avatar/99020cae7ff399a4fbea19c0634f77c3?s=80"
  },
  {
    name: "Marlon Parizzotto",
    imageUrl:
      "https://s.gravatar.com/avatar/e6684969375a4dcc0aa99f0bfae544c3?s=80"
  },
  {
    name: "Tales Chaves",
    imageUrl:
      "https://s.gravatar.com/avatar/1f80adca55d9f5d97932ff97f631a4e8?s=80"
  },
  {
    name: "Tracy Barmore",
    imageUrl:
      "https://s.gravatar.com/avatar/4ec9c3a91da89f278e4482811caad7f3?s=80"
  }
];



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


  handleChange(e) {
      let inputUser = e.target.value
        this.setState({ name: inputUser });
        axios.get("https://openfarm.cc/api/v1/crops?filter=rose")
        .then(plants => {
          let plantNames = plants.data.data.map (
            plant => (plant.attributes.name)
          )
          let plantNamesUpdated = plantNames.filter(plant => {
            return plant.includes(inputUser);
          })          
        })
  }

  onChange = event => {

  let inputUser = event.target.value
  let inputUserLowerCaps = event.target.value.toLowerCase()
  let plantNamesUpdated
  let url = `https://openfarm.cc/api/v1/crops?filter=${inputUserLowerCaps}`
  console.log(url)
  this.setState({ name: inputUser });

  axios.get(url)
  .then(plants => {
    let plantNames = plants.data.data.map(
      plant => (plant.attributes.name.toLowerCase())
    )
    console.log("Plannames: ",plantNames)
    plantNamesUpdated = plantNames.filter((plant, i) => {
      console.log("i", i)
      return (plant.includes(inputUser) && i < 7);
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



 <Grommet theme={myCustomTheme} full>
        <Box fill align="center" pad={{ top: "medium" }}>
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
              placeholder="Enter your name..."
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
