import React from "react";
import { Rnd } from "react-rnd";

import Text from "../Text/Text";

type Props = {
  width: string;
  height: string;
  color: string;
  textInBox: Function;
};

class TextBox extends React.Component<Props> {
  state = {
    width: "100",
    height: "30",
    x: 0,
    y: 0,
  };

  handleChange = (word: string) => {
    this.props.textInBox(word);
  };

  render() {
    const { color } = this.props;
    return (
      <Rnd
        default={{
          x: this.state.x,
          y: this.state.y,
          width: this.state.width,
          height: this.state.height,
        }}
        minWidth={68}
        minHeight={20}
        bounds="parent"
        onDrag={(e: any, { x, y }: any) => {
          this.setState({ x, y });
          e.stopImmediatePropagation();
        }}
        onResize={(
          e: any,
          direction: any,
          ref: any,
          delta: any,
          position: any
        ) => {
          this.setState({
            width: ref.style.width,
            height: ref.style.height,
            ...position,
          });
        }}
      >
        <Text
          width={this.state.width}
          height={this.state.height}
          color={color}
          handleChange={this.handleChange}
        />
      </Rnd>
    );
  }
}

export default TextBox;
