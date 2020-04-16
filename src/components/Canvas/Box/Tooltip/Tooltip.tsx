import React from "react";

import "./Tooltip.scss";

type TooltipProps = {
  leftDistance: number;
  topDistance: number;
  rightDistance: number;
  bottomDistanse: number;
};

class Tooltip extends React.Component<TooltipProps> {
  state = {
    isClick: false,
  };
  render() {
    const {
      leftDistance,
      topDistance,
      rightDistance,
      bottomDistanse,
    } = this.props;
    return (
      <div className="container">
        <div className="singleElement">{`top: ${topDistance}`}</div>
        <div className="rowContainer">
          <div>{`left: ${leftDistance}`}</div>
          <div>{`right: ${rightDistance}`}</div>
        </div>
        <div className="singleElement">{`bottom: ${bottomDistanse}`}</div>
      </div>
    );
  }
}

export default Tooltip;
