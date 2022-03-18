import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/components/Header/Add.css";

function HeaderAdd() {
  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <div className="headerAdd">
      <div className="headerAdd__container">
        <p>
          <span className="headerAdd__discount">15% Welcome discount</span>
          <sup>5</sup>
        </p>
        <span className="headerAdd__active" onClick={() => setClicked(true)}>
          <span className="headerAdd__active-container">
            <span className="headerAdd__active-container-welcome">WELCOME</span>
            <span
              className={`headerAdd__active-container-activated ${
                clicked
                  ? "headerAdd__active-container-clicked"
                  : "headerAdd__active-container-unclicked"
              }`}
            >
              {!clicked ? "Activate sale code" : "Activated"}
            </span>
          </span>
        </span>
      </div>
      <Link to="/" className="headerAdd__link"></Link>
    </div>
  );
}

export default HeaderAdd;
