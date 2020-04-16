import React from "react";

import "./Box.scss";
import Tooltip from "./Tooltip/Tooltip";
import BoxWrapper from "../BoxWrapper/BoxWrapper";
import { Container } from "../Canvas";

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

    return (
      <>
        <div
          style={{
            margin: 0,
            height: "100%",
            padding: 0,
            backgroundColor: color,
          }}
        >
          <div className="wrapper">
            <button
              style={{
                width: 0,
                height: "14px",
                border: "0.5px solid #e4dfdf",
                borderRadius: "1px",
                backgroundColor: "#fff",
                display: "flex",
                justifyContent: "center",
                fontSize: 9,
                marginRight: 2,
              }}
              onClick={() => this.setState({ isClick: !this.state.isClick })}
            >
              ?
            </button>
            <button
              style={{
                width: 0,
                height: "14px",
                border: "0.5px solid #e4dfdf",
                borderRadius: "1px",
                backgroundColor: "#42bfd5",
                display: "flex",
                justifyContent: "center",
                fontSize: 9,
                marginRight: 2,
              }}
              onClick={() => this.buttonPressed(Container.globalContainer)}
            />
            <button
              style={{
                width: 0,
                height: "14px",
                border: "0.5px solid #e4dfdf",
                borderRadius: "1px",
                backgroundColor: "#42d5bc",
                display: "flex",
                justifyContent: "center",
                fontSize: 9,
                marginRight: 2,
              }}
              onClick={() => this.buttonPressed(Container.localContainer)}
            />
            <button
              style={{
                width: 0,
                height: "14px",
                border: "0.5px solid #e4dfdf",
                borderRadius: "1px",
                backgroundColor: "#4287d5",
                display: "flex",
                justifyContent: "center",
                fontSize: 9,
                marginRight: 2,
              }}
              onClick={() => this.buttonPressed(Container.unit)}
            />
          </div>
          {this.state.arr}
        </div>
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
