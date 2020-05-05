import React from "react";
import ReactDOM from "react-dom";

import "./Canvas.scss";
import BoxWrapper from "./BoxWrapper/BoxWrapper";
import Button from "./Button/Button";

type Props = {
  height: string;
  width: string;
  isShow: boolean;
  getNewDOM: Function;
};

const resultArr: string[] = [];

class Canvas extends React.Component<Props> {
  state = {
    arr: [] as JSX.Element[],
    html: "",
    textArr: [] as string[],
  };

  getText = (word: string) => {
    this.setState({ textArr: this.state.textArr.concat(word) });
  };

  eventHandler = (e: any, val: number) => {
    if (val === 0) {
      this.setState({
        arr: this.state.arr.concat(
          <BoxWrapper
            width={this.props.width}
            height={this.props.height}
            color="#42bfd5"
            getText={this.getText}
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
                width={[120]}
                border="none"
                borderRadius={2}
                marginRight={[5]}
                backgroundColor={["#42bfd5"]}
                eventHandler={this.eventHandler}
                color={["#fff"]}
                buttonText={["add container"]}
                bottonNumber={1}
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
            {resultArr}
            <div className="removable">
              <button
                style={{
                  width: "160px",
                  backgroundColor: "#4287d5",
                  border: "none",
                  color: "#fff",
                  borderRadius: "2px",
                }}
                onClick={() => this.props.getNewDOM(ReactDOM.findDOMNode(this))}
              >
                download .tsx and .scss files
              </button>
            </div>
            {console.info(this.state.textArr)}
          </div>
        )}
      </>
    );
  }
}

export default Canvas;
