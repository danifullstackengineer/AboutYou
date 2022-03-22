import React from "react";
import { IconBaseProps } from "react-icons";
import "../styles/Comp-Single/InteractiveBtn.css";

function InteractiveBtn({
  text,
  width,
  height,
  icon,
  bgColor,
  color,
  border,
  setClickedLogin,
}: {
  text: string;
  width: number;
  height: number;
  icon?: JSX.Element;
  bgColor?: string;
  color?: string;
  border?: string;
  setClickedLogin?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      className="interactiveBtn"
      onClick={setClickedLogin ? () => setClickedLogin(true) : () => {}}
    >
      <button
        className="interactiveBtn__btn"
        style={{
          width: width,
          height: height,
          backgroundColor: bgColor ? bgColor : "black",
          color: color ? color : "white",
          border: border ? border : "1px solid transparent",
        }}
      >
        <span className="interactiveBtn__btn-icon">{icon ? icon : ""}</span>
        {text}
      </button>
    </div>
  );
}

export default InteractiveBtn;
