import React from "react";

import "./App.scss";
import Settings from "./components/Settings/Settings";
import Canvas from "./components/Canvas/Canvas";
import { getClearDomWithoutStyles, domParsing } from "./utils";

class App extends React.Component {
  state = {
    height: "",
    width: "",
    isShowCanvas: false,
    newDom: "",
  };

  handleChange = (e: any, isHeight: boolean = false) => {
    if (isHeight) {
      this.setState({ height: e.target.value });
      return;
    }
    this.setState({ width: e.target.value });
  };

  showCanvas = (isShow: boolean) => {
    this.setState({ isShowCanvas: isShow });
  };

  getNewDOM = (dom: Element | Text | null) => {
    const node = dom;
    const clearDom = getClearDomWithoutStyles(
      new DOMParser().parseFromString((node as Element).innerHTML, "text/html")
    );

    if (clearDom.clearDom?.innerHTML) {
      this.setState({ newDom: domParsing(clearDom.clearDom?.innerHTML, 0) });
    }
  };

  render() {
    return (
      <>
        <Settings
          handleChange={this.handleChange}
          showCanvas={this.showCanvas}
        />
        <div className="canvasStyles">
          <Canvas
            height={this.state.height}
            width={this.state.width}
            isShow={this.state.isShowCanvas}
            getNewDOM={this.getNewDOM}
          />
        </div>
        <div className="outputBlock">{this.state.newDom}</div>
      </>
    );
  }
}

export default App;
