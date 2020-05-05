import React from "react";

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
  buttonText?: string[];
  color?: string[];
  bottonNumber: number;
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
      bottonNumber,
    } = this.props;

    const renderButton = (buttonNumber: number): JSX.Element[] => {
      const buttonArray: JSX.Element[] = [];
      for (let i = 0; i < buttonNumber; i++) {
        buttonArray.push(
          <button
            style={{
              width: `${width && width[i]}px`,
              height: `${height && height[i]}px`,
              border: border,
              borderRadius: `${borderRadius && borderRadius}px`,
              fontSize: fontSize && fontSize,
              marginRight: marginRight && marginRight[i],
              backgroundColor: backgroundColor[i],
              display: "flex",
              justifyContent: "center",
              color: color && color[i],
            }}
            onClick={(e) =>
              this.props.buttonPressed
                ? this.props.buttonPressed(i)
                : this.props.eventHandler && this.props.eventHandler(e, i)
            }
          >
            {buttonText && buttonText[i] !== "" && buttonText[i]}
          </button>
        );
      }

      return buttonArray;
    };

    return renderButton(bottonNumber);
  }
}

export default Button;
