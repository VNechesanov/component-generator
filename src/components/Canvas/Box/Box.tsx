import React, { CSSProperties } from "react";

import "./Box.scss";
import Tooltip from "./Tooltip/Tooltip";
import BoxWrapper from "../BoxWrapper/BoxWrapper";
import Button from "../Button/Button";

type BoxProps = {
  x: number;
  y: number;
  width: string;
  height: string;
  externalWidth: string;
  externalHeight: string;
  color: string;
};

class Box extends React.Component<BoxProps> {
  state = {
    isClick: false,
    arr: [] as JSX.Element[],
  };

  buttonPressed = (val: number) => {
    if (val === 2) {
      this.setState({
        arr: this.state.arr.concat(
          <BoxWrapper
            width={this.props.width}
            height={this.props.height}
            color="#4287d5"
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
            color="#42d5bc"
          />
        ),
      });
    }

    if (val === 0) {
      this.setState({
        arr: this.state.arr.concat(
          <BoxWrapper
            width={this.props.width}
            height={this.props.height}
            color="#42bfd5"
          />
        ),
      });
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
    const yUpperRight = y;
    const xDownLeft = x;
    const yDownLeft = y + boxHeight;
    const xDownRight = x + boxWidth;
    const yDownRight = y + boxHeight;

    const buttonProps: CSSProperties = {
      width: 0,
      height: "14px",
      border: "0.5px solid #e4dfdf",
      borderRadius: "1px",
      display: "flex",
      justifyContent: "center",
      fontSize: 9,
      marginRight: 2,
    };

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
          <button
            style={{
              backgroundColor: "#fff",
              ...buttonProps,
            }}
            onClick={() => this.setState({ isClick: !this.state.isClick })}
          >
            ?
          </button>
          <Button
            width={[0, 0, 0]}
            height={[14, 14, 14]}
            border="0.5px solid #e4dfdf"
            borderRadius={1}
            fontSize={9}
            marginRight={[2, 2, 2]}
            backgroundColor={["#42bfd5", "#42d5bc", "#4287d5"]}
            buttonPressed={this.buttonPressed}
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
