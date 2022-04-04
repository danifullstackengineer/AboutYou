import React from "react";
import { useNavigate } from "react-router-dom";
import mainLogo from "../assets/svg/mainLogo.svg";
import "../styles/Comp-Single/AboutYouLogo.css";

function AboutYouLogo() {

  const navigate = useNavigate();

  return (
    <div className="aboutYouLogo" onClick={()=> navigate('/')}>
      <span className="aboutYouLogo__about">ABOUT</span>
      <div className="aboutYouLogo__you">
        <span className="aboutYouLogo__you-text">YOU</span>
        <img src={mainLogo}></img>
      </div>
    </div>
  );
}

export default AboutYouLogo;
