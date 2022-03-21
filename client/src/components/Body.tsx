import React from "react";
import Header from "./Header/Header";
import HeaderSmall from "./Header/HeaderSmall";
import SliderComp from "./Slider/SliderComp";
import '../styles/components/Body.css';
import BodyInner from "./Body/BodyInner";

function Body() {
  return (
    <div className="body">
      <Header />
      <HeaderSmall />
      <SliderComp />
      <BodyInner/>
    </div>
  );
}

export default Body;
