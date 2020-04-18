import React from "react";

import "./App.scss";
import Settings from "./components/Settings/Settings";
import Canvas from "./components/Canvas/Canvas";

class App extends React.Component {
  state = {
    height: "",
    width: "",
    isShowCanvas: false,
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
          />
        </div>
      </>
    );
  }
}

export default App;
