import React from "react";

import "./SettingsCard.scss";

type SettingsCardProps = {
  handleSettingsCard: Function;
};

class SettingsCard extends React.Component<SettingsCardProps> {
  state = {
    focus: false,
    textLeft: false,
    textCenter: false,
    textRight: false,
    text: "",
  };

  handleInputChange = (e: any) => {
    if (e.target.name === "textLeft") {
      this.setState({ textLeft: !this.state.textLeft });
    }
    if (e.target.name === "textCenter") {
      this.setState({ textCenter: !this.state.textCenter });
    }
    if (e.target.name === "textRight") {
      this.setState({ textRight: !this.state.textRight });
    }
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
  };

  render() {
    return (
      <div>
        <div className="settingsInputBlock">
          <div className="settingsInputContainer">
            <div className="settingsText">input font size:</div>
            <div className="settingsForm">
              <input
                type="text"
                value={this.state.text}
                onFocus={this._onFocus}
                onBlur={this._onBlur}
              />
            </div>
          </div>
          <button
            style={{
              width: "100%",
              backgroundColor: "#4287d5",
              border: "none",
              color: "#fff",
              borderRadius: "2px",
            }}
            onClick={() =>
              this.props.handleSettingsCard(
                this.state.text,
                this.state.textLeft,
                this.state.textCenter,
                this.state.textRight
              )
            }
          >
            acept settings
          </button>
        </div>
        {this.state.focus
          ? document.addEventListener("keydown", this.logKey)
          : document.removeEventListener("keydown", this.logKey)}
      </div>
    );
  }
}

export default SettingsCard;
