import React from "react";

import "./Text.scss";
import SettingsCard from "./SettingsCard/SettingsCard";
import { makeId } from "../../../utils";

export type TextBlockProps = {
  id: string;
  word: string;
};

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
    textId: "",
    textSize: "15",
  };

  _onBlur = (e: React.FormEvent<HTMLInputElement>) => {
    setTimeout(() => {
      if (this.state.focus) {
        this.setState({
          focus: false,
        });
      }
    }, 0);

    if (e.currentTarget.value !== "" && this.state.textId === "") {
      const tId = makeId(7);
      const textProps: TextBlockProps = {
        id: tId,
        word: e.currentTarget.value,
      };
      this.setState({ textId: tId });
      this.props.handleChange(textProps);
    }
    if (e.currentTarget.value !== "" && this.state.textId !== "") {
      const textProps: TextBlockProps = {
        id: this.state.textId,
        word: e.currentTarget.value,
      };
      this.props.handleChange(textProps);
    }
  };

  _onFocus = () => {
    if (!this.state.focus) {
      this.setState({
        focus: true,
      });
    }
  };

  logKey = (e: KeyboardEvent) => {
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

  handleSettingsCard = (size: string) => {
    this.setState({ textSize: size, isClick: false });
  };

  render() {
    const { width, height, color } = this.props;

    const boxWidth = parseInt(width);
    const boxHeight = parseInt(height);

    const buttonWidth = 20;

    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "1px",
            borderRadius: "2px",
            margin: 0,
            height: "100%",
            fontSize: `${this.state.textSize}px`,
          }}
          className="textForm"
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
          <input
            type="text"
            value={this.state.text}
            style={{
              width: `${boxWidth - buttonWidth}px`,
              height: `${boxHeight}px`,
              fontSize: `${this.state.textSize}px`,
              backgroundColor: color,
            }}
            onFocus={this._onFocus}
            onBlur={(e) => this._onBlur(e)}
          />
        </div>
        {this.state.focus
          ? document.addEventListener("keydown", this.logKey)
          : document.removeEventListener("keydown", this.logKey)}
        {this.state.isClick && (
          <SettingsCard handleSettingsCard={this.handleSettingsCard} />
        )}
      </>
    );
  }
}

export default Text;
