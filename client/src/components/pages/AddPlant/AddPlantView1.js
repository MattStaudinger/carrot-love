import axios from "axios";
import { Search } from "grommet-icons";
import { Box, Grommet, Text, TextInput, Button } from "grommet";
import React, { createRef, Component } from "react";
import { grommet } from "grommet/themes";
import { deepMerge } from "grommet/utils";

const myCustomTheme = deepMerge(grommet, {
  global: {
    drop: {
      background: "white",
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
      suggestedFolks: [],
      plant: {}
    };
    this.boxRef = createRef();
    this.plantData = [];
  }

  handleSubmit(name) {
    let plant = {};
    if (name === "") {
      alert("ENTER SOMETHING");
    } else {
      for (let plantNo = 0; plantNo < this.plantData.length; plantNo++) {
        if (this.plantData[plantNo].name.toLowerCase() === name.toLowerCase()) {
          plant = this.plantData[plantNo];
          break;
        }
      }
      if (!plant.hasOwnProperty("name"))
        plant = {
          name: name,
          description: "",
          pictureUrl: "https://res.cloudinary.com/dzfricfvq/image/upload/v1544114014/CarrotLove/flower-puns.jpg"
        };

      this.props.onClick(plant);
    }
  }

  onChange = event => {
    let inputUser = event.target.value;
    let inputUserLowerCaps = inputUser.toLowerCase();
    let url = `https://openfarm.cc/api/v1/crops?filter=${inputUserLowerCaps}`;
    this.setState({ name: inputUser });

    axios.get(url).then(plants => {
      this.plantData = plants.data.data.map(plant => ({
        name: plant.attributes.name,
        description: plant.attributes.description,
        pictureUrl: plant.attributes.main_image_path
      }));

      let plantNames = plants.data.data
        .map(plant => plant.attributes.name)
        .filter((plantFiltered, i) => {
          let plantFilteredLowerCase = plantFiltered.toLowerCase();
          return plantFilteredLowerCase.includes(inputUserLowerCaps) && i < 4;
        });

      this.setState({ suggestedFolks: plantNames });
    });
  };

  onSelect = event => {
    return this.setState({ name: event.suggestion.value });
  };

  renderSuggestions = () => {
    const { suggestedFolks } = this.state;

    return suggestedFolks
      .filter(name => name.toLowerCase().indexOf(name.toLowerCase()) >= 0)
      .map((name, index, list) => ({
        label: (
          <Box
            direction="row"
            align="center"
            gap="small"
            border={index < list.length - 1 ? "bottom" : undefined}
            pad="small"
          >
            <Text>
              <strong>{name}</strong>
            </Text>
          </Box>
        ),
        value: name
      }));
  };

  render() {
    const { suggestionOpen } = this.state;

    return (
      <div className="AddPlantView1">
      <div className="center">
        <h2>Write the name of the plant you want to water</h2>

        <Grommet theme={myCustomTheme} auto>
          <Box fill align="center" pad='small' flex-shrink="true" background='#78bc61'>
            <Box
              ref={this.boxRef}
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
              background='#f1f7ed'
            >
              <Search color='#78bc61' />
              <TextInput
                type="search"
                dropTarget={this.boxRef.current}
                plain
                value={this.state.name}
                onChange={this.onChange}
                onSelect={this.onSelect}
                suggestions={this.renderSuggestions()}
                onSuggestionsOpen={() =>
                  this.setState({ suggestionOpen: true })
                }
                onSuggestionsClose={() =>
                  this.setState({ suggestionOpen: false })
                }
              />
            </Box>
          </Box>
        </Grommet>

        <Button
          label="Add" color="white" className="btn-submit"
          onClick={() => this.handleSubmit(this.state.name)}
        />
        
      </div>
      </div>
    );
  }

  componentDidMount() {
    this.forceUpdate();
  }
}

export default AddPlantView1;
