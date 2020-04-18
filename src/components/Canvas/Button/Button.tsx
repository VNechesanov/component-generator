import React from "react";

import { Container } from "../Canvas";

type ButtonProps = {
  width?: number[];
  height?: number[];
  border: string;
  borderRadius?: number;
  fontSize?: number;
  marginRight?: number[];
  backgroundColor: string[];
  eventHandler?: Function;
  buttonPressed?: Function;
  buttonText?: string;
  color?: string;
};

class Button extends React.Component<ButtonProps> {
  render() {
    const {
      width,
      height,
      border,
      borderRadius,
      fontSize,
      marginRight,
      backgroundColor,
      buttonText,
      color,
    } = this.props;

    return (
      <>
        <button
          style={{
            width: `${width && width[0]}px`,
            height: `${height && height[0]}px`,
            border: border,
            borderRadius: `${borderRadius && borderRadius}px`,
            fontSize: fontSize && fontSize,
            marginRight: marginRight && marginRight[0],
            backgroundColor: backgroundColor[0],
            display: "flex",
            justifyContent: "center",
            color: color && color,
          }}
          onClick={(e) =>
            this.props.buttonPressed
              ? this.props.buttonPressed(Container.globalContainer)
              : this.props.eventHandler &&
                this.props.eventHandler(e, Container.globalContainer)
          }
        >
          {buttonText && buttonText}
        </button>
        <button
          style={{
            width: `${width && width[1]}px`,
            height: `${height && height[1]}px`,
            border: border,
            borderRadius: `${borderRadius && borderRadius}px`,
            fontSize: fontSize && fontSize,
            marginRight: marginRight && marginRight[1],
            backgroundColor: backgroundColor[1],
            display: "flex",
            justifyContent: "center",
            color: color && color,
          }}
          onClick={(e) =>
            this.props.buttonPressed
              ? this.props.buttonPressed(Container.localContainer)
              : this.props.eventHandler &&
                this.props.eventHandler(e, Container.localContainer)
          }
        >
          {buttonText && buttonText}
        </button>
        <button
          style={{
            width: `${width && width[2]}px`,
            height: `${height && height[2]}px`,
            border: border,
            borderRadius: `${borderRadius && borderRadius}px`,
            fontSize: fontSize && fontSize,
            marginRight: marginRight && marginRight[2],
            backgroundColor: backgroundColor[2],
            display: "flex",
            justifyContent: "center",
            color: color && color,
          }}
          onClick={(e) =>
            this.props.buttonPressed
              ? this.props.buttonPressed(Container.unit)
              : this.props.eventHandler &&
                this.props.eventHandler(e, Container.unit)
          }
        >
          {buttonText && buttonText}
        </button>
      </>
    );
  }
}

export default Button;
