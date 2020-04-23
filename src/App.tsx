import React from "react";

import "./App.scss";
import Settings from "./components/Settings/Settings";
import Canvas from "./components/Canvas/Canvas";
import {
  getClearDomWithoutStyles,
  domParsing,
  downloadTsx,
  downloadScss,
} from "./utils";

class App extends React.Component {
  state = {
    height: "",
    width: "",
    isShowCanvas: false,
    newDom: "",
    componentName: "",
    styles: [],
  };

  handleChange = (e: any, isHeight: boolean = false) => {
    if (isHeight) {
      this.setState({ height: e.target.value });
      return;
    }
    this.setState({ width: e.target.value });
  };

  handleComponentName = (e: any) => {
    this.setState({ componentName: e.target.value });
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
      this.setState({
        styles: clearDom.stylesProps,
      });

      downloadTsx(
        `${this.state.componentName}.tsx`,
        domParsing(clearDom.clearDom?.innerHTML, 0, this.state.componentName)
          .DOM,
        this.state.componentName
      );

      downloadScss(
        `${this.state.componentName}.scss`,
        clearDom.stylesProps,
        domParsing(clearDom.clearDom?.innerHTML, 0, this.state.componentName)
          .classes
      );
    }
  };

  render() {
    return (
      <>
        <Settings
          handleChange={this.handleChange}
          showCanvas={this.showCanvas}
          handleComponentName={this.handleComponentName}
        />
        <div className="canvasStyles">
          <Canvas
            height={this.state.height}
            width={this.state.width}
            isShow={this.state.isShowCanvas}
            getNewDOM={this.getNewDOM}
          />
        </div>
      </>
    );
  }
}

export default App;
