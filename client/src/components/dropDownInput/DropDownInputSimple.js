import { Search } from "grommet-icons";
import { Box, Image, Grommet, Text, TextInput } from "grommet";
import React, { createRef, Component } from "react";
import { grommet } from "grommet/themes";
import { deepMerge } from "grommet/utils";

const suggestions = Array(100)
  .fill()
  .map((_, i) => `suggestion ${i + 1}`);

class SuggestionsTextInput extends Component {
  state = { value: "" };

  onChange = event => this.setState({ value: event.target.value });

  onSelect = event => this.setState({ value: event.suggestion });

  render() {
    const { value } = this.state;
    return (
      <Grommet theme={grommet}>
        <TextInput
          value={value}
          onChange={this.onChange}
          onSelect={this.onSelect}
          suggestions={suggestions}
        />
      </Grommet>
    );
  }
}