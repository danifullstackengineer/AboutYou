import React from "react";
import SliderComp from "./Slider/SliderComp";
import "../styles/components/Body.css";
import BodyInner from "./Body/BodyInner";

function Body() {
  return (
    <div className="body">
      <SliderComp />
      <BodyInner />
    </div>
  );
}

export default Body;
