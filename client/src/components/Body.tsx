import React, { useEffect } from "react";
import SliderComp from "./Slider/SliderComp";
import "../styles/components/Body.css";
import BodyInner from "./Body/BodyInner";

function Body({
  setClickedLogin,
  chosenMode,
  currentOption,
  setHeight
}: {
  setClickedLogin: React.Dispatch<React.SetStateAction<boolean>>;
  chosenMode: boolean | undefined;
    currentOption: boolean[];
    setHeight: React.Dispatch<React.SetStateAction<number | undefined>>;
  }) {
  
  useEffect(() => {
    setHeight(250);
  }, [])
  
  return (
    <div className="body">
      <SliderComp chosenMode={chosenMode} />
      <BodyInner
        setClickedLogin={setClickedLogin}
        currentOption={currentOption}
        chosenMode={chosenMode}
      />
    </div>
  );
}

export default React.memo(Body);
