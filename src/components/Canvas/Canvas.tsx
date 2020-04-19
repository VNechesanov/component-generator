import React from "react";
import ReactDOM from "react-dom";

import "./Canvas.scss";
import BoxWrapper from "./BoxWrapper/BoxWrapper";
import { getClearDomWithoutStyles, Clear_DOM_Props } from "../../utils";
import Button from "./Button/Button";

type Props = {
  height: string;
  width: string;
  isShow: boolean;
};

type Res = {
  key: any;
  val: any;
};

class Canvas extends React.Component<Props> {
  state = {
    arr: [] as JSX.Element[],
  };

  clearDom: Clear_DOM_Props = {
    clearDom: null,
    stylesProps: [
      {
        key: "",
        val: "",
      },
    ],
  };

  printRoot = () => {
    const node = ReactDOM.findDOMNode(this);
    this.clearDom = getClearDomWithoutStyles(
      new DOMParser().parseFromString((node as Element).innerHTML, "text/html")
    );
    console.info(this.clearDom.clearDom);
    console.info(this.clearDom.stylesProps);
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
    const { height, width, isShow } = this.props;

    return (
      <>
        {isShow && (
          <div className="canvasWrapper">
            <div className="buttonWrapper removable">
              <Button
                width={[120, 120, 120]}
                border="none"
                borderRadius={2}
                marginRight={[5, 5, 0]}
                backgroundColor={["#42bfd5", "#42d5bc", "#4287d5"]}
                eventHandler={this.eventHandler}
                color="#fff"
                buttonText={["add container", "add container", "add container"]}
                bottonNumber={3}
              />
            </div>

            <div
              id="Main"
              style={{
                height: height,
                width: width,
                background: "#eee",
                position: "relative",
              }}
            >
              {this.state.arr}
            </div>
            <div className="removable">
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
          </div>
        )}
      </>
    );
  }
}

export default Canvas;
