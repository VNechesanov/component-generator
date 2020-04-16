import React from "react";

import "./App.scss";
import Settings from "./components/Settings/Settings";
import Canvas from "./components/Canvas/Canvas";

class App extends React.Component {
  state = {
    height: "",
    width: "",
  };

  handleChange = (e: any, isHeight: boolean = false) => {
    if (isHeight) {
      this.setState({ height: e.target.value });
      return;
    }
    this.setState({ width: e.target.value });
  };

  render() {
    return (
      <>
        <Settings handleChange={this.handleChange} />
        <div className="canvasStyles">
          <Canvas height={this.state.height} width={this.state.width} />
        </div>
      </>
    );
  }
}

export default App;
