import React, { useEffect, useRef, useState } from "react";
import { useWindowDimensions } from "../../Hooks/Viewport";
import "../../styles/components/Slider/Slider.css";
import { useDispatch } from "react-redux";
import { setNextSlide } from "../../redux/sliderSlices";
import { store } from "../../index";
import slider1 from "../../assets/jpeg/slider1.jpg";
import slider2 from "../../assets/jpeg/slider2.jpg";
import slider3 from "../../assets/jpeg/slider3.webp";
import slider4 from "../../assets/jpeg/slider4.webp";
import slider5 from "../../assets/jpeg/slider5.webp";

function Slider() {
  const [className, setClassName] = useState<string>("");
  const [nextClassName, setNextClassName] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      setClassName("slider__Item-slide");
      setNextClassName("slider__Item-slide-next");
      const timeout = setTimeout(() => {
        
        setClassName("");
        setNextClassName("");
      }, 1500);
      return () => clearTimeout(timeout);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider">
      <div className={`slider__Item ${className}`}>
        <img src={""} alt="" />
      </div>
      <div className={`slider__Item ${nextClassName}`}>
        <img src={""} alt="" />
      </div>
    </div>
  );
}

export default Slider;
