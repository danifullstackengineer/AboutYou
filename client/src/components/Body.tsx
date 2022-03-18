import React from "react";
import Header from "./Header/Header";
import HeaderSmall from "./Header/HeaderSmall";
import Slider from "./Slider/Slider";
import '../styles/components/Body.css';

function Body() {
  return (
    <div className="body">
      <Header />
      <HeaderSmall />
      <Slider />
    </div>
  );
}

export default Body;
