import React from "react";

import "./Settings.scss";

type Props = {
  handleChange: Function;
};

class Settings extends React.Component<Props> {
  render() {
    return (
      <div className="baseContainer">
        <div className="inputBlock">
          <div className="inputContainer">
            <div className="text">input height:</div>
            <input
              type="text"
              onChange={(e) => this.props.handleChange(e, true)}
            />
          </div>
          <div className="inputContainer">
            <div className="text">input width:</div>
            <input
              type="text"
              onChange={(e) => this.props.handleChange(e, false)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
