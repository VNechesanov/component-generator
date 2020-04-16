import React from "react";
import ReactDOM from "react-dom";

import "./Canvas.scss";
import BoxWrapper from "./BoxWrapper/BoxWrapper";

type Props = {
  height: string;
  width: string;
};

export const Container = {
  globalContainer: 0,
  localContainer: 1,
  unit: 2,
};

class Canvas extends React.Component<Props> {
  state = {
    arr: [] as JSX.Element[],
  };

  printRoot = () => {
    const node = ReactDOM.findDOMNode(this);
    console.info(node);
  };

  eventHandler = (e: any, val: number) => {
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
    const { height, width } = this.props;

    const isSshow = height !== "" && width !== "";
    return (
      <div className="canvasWrapper">
        {isSshow && (
          <div className="buttonWrapper">
            <button
              style={{
                width: "120px",
                backgroundColor: "#42bfd5",
                border: "none",
                color: "#fff",
                borderRadius: "2px",
                marginRight: "5px",
              }}
              onClick={(e) => this.eventHandler(e, Container.globalContainer)}
            >
              add container
            </button>
            <button
              style={{
                width: "120px",
                backgroundColor: "#42d5bc",
                border: "none",
                color: "#fff",
                borderRadius: "2px",
                marginRight: "5px",
              }}
              onClick={(e) => this.eventHandler(e, Container.localContainer)}
            >
              add container
            </button>
            <button
              style={{
                width: "120px",
                backgroundColor: "#4287d5",
                border: "none",
                color: "#fff",
                borderRadius: "2px",
              }}
              onClick={(e) => this.eventHandler(e, Container.unit)}
            >
              add container
            </button>
          </div>
        )}
        <div
          style={{
            height: height,
            width: width,
            background: "#eee",
            position: "relative",
          }}
        >
          {this.state.arr}
        </div>
        <button
          style={{
            width: "120px",
            backgroundColor: "#4287d5",
            border: "none",
            color: "#fff",
            borderRadius: "2px",
          }}
          onClick={() => this.printRoot()}
        >
          print root
        </button>
      </div>
    );
  }
}

export default Canvas;
