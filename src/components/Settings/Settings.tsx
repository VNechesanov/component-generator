import React from "react";

import "./Settings.scss";

type Props = {
  handleChange: Function;
  showCanvas: Function;
  handleComponentName: Function;
};

class Settings extends React.Component<Props> {
  render() {
    return (
      <div className="baseContainer">
        <div className="inputBlock">
          <div className="inputContainer">
            <div className="text">input height:</div>
            <div className="form">
              <input
                type="text"
                onChange={(e) => this.props.handleChange(e, true)}
              />
            </div>
          </div>
          <div className="inputContainer">
            <div className="text">input width:</div>
            <div className="form">
              <input
                type="text"
                onChange={(e) => this.props.handleChange(e, false)}
              />
            </div>
          </div>
          <div className="inputContainer">
            <div className="text">input component name:</div>
            <div className="form">
              <input
                type="text"
                onChange={(e) => this.props.handleComponentName(e)}
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
            onClick={() => this.props.showCanvas(true)}
          >
            show canvas
          </button>
        </div>
      </div>
    );
  }
}

export default Settings;
