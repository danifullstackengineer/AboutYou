import React, { useEffect, useRef, useState } from "react";
import { useWindowDimensions } from "../../Hooks/Viewport";
import "../../styles/components/Slider/Slider.css";
import slider1 from "../../assets/jpeg/slider1.jpg";
import slider2 from "../../assets/jpeg/slider2.jpg";
import slider3 from "../../assets/jpeg/slider3.webp";
import slider4 from "../../assets/jpeg/slider4.webp";
import slider5 from "../../assets/jpeg/slider5.webp";

function Slider() {
  const [timer, setTimer] = useState<number>(0);
  const [className, setClassname] = useState<string>("");
  const [nextClassName, setNextClassName] = useState<string>("");

  const currentRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const [queue, setQueue] = useState<JSX.Element[]>([
    <div className="slider__Item">
      <img src={slider1} alt="" />
    </div>,
    <div className="slider__Item">
      <img src={slider2} alt="" />
    </div>,
    <div className="slider__Item">
      <img src={slider3} alt="" />
    </div>,
    <div className="slider__Item">
      <img src={slider4} alt="" />
    </div>,
    <div className="slider__Item">
      <img src={slider5} alt="" />
    </div>,
  ]);
  const [current, setCurrent] = useState<JSX.Element>(
    <div className="slider__Item">
      <img src={slider1} alt="" />
    </div>
  );
  const [next, setNext] = useState<JSX.Element>(
    <div className="slider__Item">
      <img src={slider2} alt="" />
    </div>
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentRef.current && nextRef.current) {
        console.log("hello!");
        setClassname("slider__Item-slide");
        setNextClassName("slider__Item-slide-next");
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="slider">
      <div className={`slider__Item ${className}`} ref={currentRef}>
        <img src={slider1} alt="" />
      </div>
      <div className={`slider__Item ${className}`} ref={nextRef}>
        <img src={slider2} alt="" />
      </div>
    </div>
  );
}

export default Slider;
