import React from "react";

import "./Text.scss";
import SettingsCard from "./SettingsCard/SettingsCard";

type BoxProps = {
  width: string;
  height: string;
  color: string;
  handleChange: Function;
};

class Text extends React.Component<BoxProps> {
  state = {
    isClick: false,
    focus: false,
    text: "",
    textSize: "15",
  };

  _onBlur = () => {
    setTimeout(() => {
      if (this.state.focus) {
        this.setState({
          focus: false,
        });
      }
    }, 0);
  };

  _onFocus = () => {
    if (!this.state.focus) {
      this.setState({
        focus: true,
      });
    }
  };

  logKey = (e: any) => {
    if (e.keyCode === 8) {
      let helper = this.state.text.slice(0, this.state.text.length - 1);
      this.setState({ text: helper });
    } else {
      this.setState({ text: this.state.text.concat(e.key) });
    }
    if (e.keyCode === 13) {
      const newStr = this.state.text.replace("Enter", "");
      this.setState({ text: newStr });
    }
  };

  handleSettingsCard = (
    size: string,
    textLeft: boolean,
    textCenter: boolean,
    textRight: boolean
  ) => {
    this.setState({ textSize: size, isClick: false });
    if (this.state.text !== "") {
      this.props.handleChange(this.state.text);
    }
  };

  render() {
    const { width, height, color } = this.props;

    const boxWidth = parseInt(width);
    const boxHeight = parseInt(height);

    return (
      <>
        <div
          style={{
            backgroundColor: color,
            margin: 0,
            height: "100%",
            padding: 0,
            fontSize: `15px`,
          }}
          className="wrapper removable"
        >
          <button
            style={{
              border: "none",
              borderRadius: "2px",
              width: " 20px",
              height: "20px",
            }}
            onClick={() => this.setState({ isClick: true })}
          >
            S
          </button>
          <div className="textForm">
            <input
              type="text"
              value={this.state.text}
              style={{
                width: `${boxWidth - 15}px`,
                height: `${boxHeight}px`,
                fontSize: `${this.state.textSize}px`,
              }}
              onFocus={this._onFocus}
              onBlur={this._onBlur}
            />
          </div>
          {this.state.focus
            ? document.addEventListener("keydown", this.logKey)
            : document.removeEventListener("keydown", this.logKey)}
        </div>
        {this.state.isClick && (
          <SettingsCard handleSettingsCard={this.handleSettingsCard} />
        )}
      </>
    );
  }
}

export default Text;
