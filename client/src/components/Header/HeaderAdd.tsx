import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/components/Header/Add.css";

function HeaderAdd() {
  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <div className="headerAdd">
      <div className="headerAdd__text">
        15% welcome discount<sup>5</sup>
      </div>
      <div className="headerAdd__button" onClick={() => setClicked(true)}>
        <div className="headerAdd__button-text">WELCOME</div>
        <div
          className="headerAdd__button-code"
          style={{
            backgroundColor: clicked ? "#7BB872" : "white",
            color: clicked ? "white" : "rgb(24,24,24)",
          }}
        >
          {clicked ? "Activated!" : "Activate sale code"}
        </div>
      </div>
    </div>
  );
}

export default HeaderAdd;
