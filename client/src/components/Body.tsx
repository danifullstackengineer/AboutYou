import React from "react";
import Header from "./Header/Header";
import HeaderSmall from "./Header/HeaderSmall";
import SliderComp from "./Slider/SliderComp";
import "../styles/components/Body.css";
import BodyInner from "./Body/BodyInner";
import FirstFooter from "./Footer/FirstFooter";
import SecondFooter from "./Footer/SecondFooter";
import ThirdFooter from "./Footer/ThirdFooter";
import FourthFooter from "./Footer/FourthFooter";
import FifthFooter from "./Footer/FifthFooter";
import SixthFooter from "./Footer/SixthFooter";

function Body({
  setClickedLogin,
}: {
  setClickedLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="body">
      <Header setClickedLogin={ setClickedLogin}/>
      <HeaderSmall />
      <SliderComp />
      <BodyInner />
      <FirstFooter />
      <SecondFooter />
      <ThirdFooter />
      <FourthFooter />
      <FifthFooter />
      <SixthFooter />
    </div>
  );
}

export default Body;
