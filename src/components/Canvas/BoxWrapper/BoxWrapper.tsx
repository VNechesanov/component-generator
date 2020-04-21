import React from "react";
import { Rnd } from "react-rnd";

import Box from "../Box/Box";

type Props = {
  width: string;
  height: string;
  color: string;
};

class BoxWrapper extends React.Component<Props> {
  state = {
    width: "100",
    height: "40",
    x: 0,
    y: 0,
  };

  render() {
    const { width, height, color } = this.props;
    return (
      <Rnd
        default={{
          x: this.state.x,
          y: this.state.y,
          width: this.state.width,
          height: this.state.height,
        }}
        minWidth={68}
        minHeight={16}
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
        <Box
          x={this.state.x}
          y={this.state.y}
          width={this.state.width}
          height={this.state.height}
          externalHeight={height}
          externalWidth={width}
          color={color}
        />
      </Rnd>
    );
  }
}

export default BoxWrapper;
