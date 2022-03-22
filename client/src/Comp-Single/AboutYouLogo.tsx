import React from "react";
import mainLogo from "../assets/svg/mainLogo.svg";
import "../styles/Comp-Single/AboutYouLogo.css";

function AboutYouLogo() {
  return (
    <div className="aboutYouLogo">
      <span className="aboutYouLogo__about">ABOUT</span>
      <div className="aboutYouLogo__you">
        <span className="aboutYouLogo__you-text">YOU</span>
        <img src={mainLogo}></img>
      </div>
    </div>
  );
}

export default AboutYouLogo;
