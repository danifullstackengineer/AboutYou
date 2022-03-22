import React from "react";
import "../styles/Comp-Single/InteractiveBtn.css";

function InteractiveBtn({
  text,
  padding,
}: {
  text: string;
  padding: number[];
}) {
  return (
    <div className="interactiveBtn">
      <button
        className="interactiveBtn__btn"
        style={{
            paddingTop: padding[0],
            paddingRight: padding[1],
            paddingBottom: padding[2],
            paddingLeft: padding[3]
        }}
      >
        {text}
      </button>
    </div>
  );
}

export default InteractiveBtn;
