import React from "react";
import SliderComp from "./Slider/SliderComp";
import "../styles/components/Body.css";
import BodyInner from "./Body/BodyInner";

function Body({
  setClickedLogin,
}: {
  setClickedLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="body">
      <SliderComp />
      <BodyInner setClickedLogin={setClickedLogin}/>
    </div>
  );
}

export default Body;
