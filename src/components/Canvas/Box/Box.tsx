import React from "react";

import "./Box.scss";
import Tooltip from "./Tooltip/Tooltip";
import BoxWrapper from "../BoxWrapper/BoxWrapper";
import TextBox from "../TextBox/TextBox";
import { TextBlockProps } from "../Text/Text";
import Button from "../Button/Button";

type BoxProps = {
  x: number;
  y: number;
  width: string;
  height: string;
  externalWidth: string;
  externalHeight: string;
  color: string;
  textHandle: Function;
};

class Box extends React.Component<BoxProps> {
  state = {
    isClick: false,
    arr: [] as JSX.Element[],
    text: "",
  };

  textInBox = (word: TextBlockProps) => {
    this.props.textHandle(word);
  };

  buttonPressed = (val: number) => {
    if (val === 4) {
      this.setState({
        arr: this.state.arr.concat(
          <TextBox
            width={this.props.width}
            height={this.props.height}
            color="#FCF3E1"
            textInBox={this.textInBox}
          />
        ),
      });
    }

    if (val === 3) {
      this.setState({
        arr: this.state.arr.concat(
          <BoxWrapper
            width={this.props.width}
            height={this.props.height}
            color="#4287d5"
            getText={this.textInBox}
          />
        ),
      });
    }

    if (val === 2) {
      this.setState({
        arr: this.state.arr.concat(
          <BoxWrapper
            width={this.props.width}
            height={this.props.height}
            color="#42d5bc"
            getText={this.textInBox}
          />
        ),
      });
    }

    if (val === 1) {
      this.setState({
        arr: this.state.arr.concat(
          <BoxWrapper
            width={this.props.width}
            height={this.props.height}
            color="#42bfd5"
            getText={this.textInBox}
          />
        ),
      });
    }

    if (val === 0) {
      this.setState({ isClick: !this.state.isClick });
    }
  };

  render() {
    const {
      x,
      y,
      width,
      height,
      externalWidth,
      externalHeight,
      color,
    } = this.props;

    const externalH = parseInt(externalHeight);
    const externalW = parseInt(externalWidth);
    const boxWidth = parseInt(width);
    const boxHeight = parseInt(height);
    const xUpperLeft = x;
    const yUpperLeft = y;
    const xUpperRight = x + boxWidth;
    // const yUpperRight = y;
    // const xDownLeft = x;
    const yDownLeft = y + boxHeight;
    // const xDownRight = x + boxWidth;
    // const yDownRight = y + boxHeight;

    return (
      <>
        <div
          style={{
            backgroundColor: color,
            margin: 0,
            height: "100%",
            padding: 0,
          }}
          className="wrapper removable"
        >
          <Button
            width={[0, 19, 19, 19, 21]}
            height={[15, 15, 15, 15, 15]}
            border="0.5px solid #e4dfdf"
            borderRadius={1}
            fontSize={8}
            marginRight={[2, 2, 2, 2, 2]}
            backgroundColor={[
              "#fff",
              "#42bfd5",
              "#42d5bc",
              "#4287d5",
              "#9E9E9E",
            ]}
            buttonPressed={this.buttonPressed}
            bottonNumber={5}
            buttonText={["?", "B", "B", "B", `«T»`]}
            color={["#000", "#fff", "#fff", "#fff", "#fff"]}
          />
        </div>
        {this.state.arr}
        {this.state.isClick && (
          <Tooltip
            leftDistance={xUpperLeft}
            topDistance={yUpperLeft}
            rightDistance={externalW - xUpperRight}
            bottomDistanse={externalH - yDownLeft}
          />
        )}
      </>
    );
  }
}

export default Box;
