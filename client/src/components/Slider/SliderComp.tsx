import React, { useEffect, useRef, useState } from "react";
import { useWindowDimensions } from "../../Hooks/Viewport";
import "../../styles/components/Slider/Slider.css";
import slider1 from "../../assets/jpeg/slider1.jpg";
import slider2 from "../../assets/jpeg/slider2.jpg";
import slider3 from "../../assets/jpeg/slider3.webp";
import slider4 from "../../assets/jpeg/slider4.webp";
import slider5 from "../../assets/jpeg/slider5.webp";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

function SliderComp() {
  const [anim1, setAnim1] = useState<string>("");
  const [anim2, setAnim2] = useState<string>("");
  const [anim3, setAnim3] = useState<string>("");
  const [anim4, setAnim4] = useState<string>("");
  const [anim5, setAnim5] = useState<string>("");
  const bodyRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const [info, setInfo] = useState<
    {
      title1: string;
      title2: string;
    }[]
  >([
    { title1: "Stylish through the season", title2: "Shirt Jackets" },
    { title1: "Stolen looks from your dads closet", title2: "Dad-Style" },
    { title1: "Your Go-To", title2: "Festive Blouses" },
    { title1: "Make it colorful", title2: "Suit up" },
    { title1: "With a flair", title2: "Flattering dresses" },
  ]);

  const interval = setInterval(() => {
    clearInterval(interval);
    var infoDummy;
    if (anim1) {
      setAnim2("slide__anim2");
      setAnim1("");
    } else if (anim2) {
      setAnim3("slide__anim3");
      setAnim2("");
    } else if (anim3) {
      setAnim4("slide__anim4");
      setAnim3("");
    } else if (anim4) {
      setAnim5("slide__anim5");
      setAnim4("");
    } else if (anim5) {
      setAnim1("slide__anim1");
      setAnim5("");
    } else {
      setAnim1("slide__anim1");
      infoDummy = {
        title1: "Stylish through the season",
        title2: "Shirt Jackets",
      };
    }
  }, 5000);

  const handlePrev = (): void => {};
  const handleNext = (): void => {
    clearInterval(interval);
  };

  return (
    <div className="slider" ref={bodyRef}>
      <div className={`slide ${anim1} ${anim2} ${anim3} ${anim4} ${anim5}`}>
        <img src={slider1} alt="" />
        <div className="slider__info">
          <span>{info[0].title1}</span>
          <span>{info[0].title2}</span>
          <button>Story</button>
        </div>
      </div>
      <div className={`slide ${anim1} ${anim2} ${anim3} ${anim4} ${anim5}`}>
        <img src={slider2} alt="" />
        <div className="slider__info">
          <span>{info[1].title1}</span>
          <span>{info[1].title2}</span>
          <button>Story</button>
        </div>
      </div>
      <div className={`slide ${anim1} ${anim2} ${anim3} ${anim4} ${anim5}`}>
        <img src={slider3} alt="" />
        <div className="slider__info">
          <span>{info[2].title1}</span>
          <span>{info[2].title2}</span>
          <button>Story</button>
        </div>
      </div>
      <div className={`slide ${anim1} ${anim2} ${anim3} ${anim4} ${anim5}`}>
        <img src={slider4} alt="" />
        <div className="slider__info">
          <span>{info[3].title1}</span>
          <span>{info[3].title2}</span>
          <button>Story</button>
        </div>
      </div>
      <div className={`slide ${anim1} ${anim2} ${anim3} ${anim4} ${anim5}`}>
        <img src={slider5} alt="" />
        <div className="slider__info">
          <span>{info[4].title1}</span>
          <span>{info[4].title2}</span>
          <button>Story</button>
        </div>
      </div>
      <div className={`slide ${anim1} ${anim2} ${anim3} ${anim4} ${anim5}`}>
        <img src={slider1} alt="" />
        <div className="slider__info">
          <span>{info[0].title1}</span>
          <span>{info[0].title2}</span>
          <button>Story</button>
        </div>
      </div>
      <button className="slide__prev" onClick={handlePrev}>
        <span>
          <IoIosArrowBack />
        </span>
      </button>
      <button className="slide__next" onClick={handleNext} ref={btnRef}>
        <span>
          <IoIosArrowForward />
        </span>
      </button>
      <div className="slider__dots">
        <div
          className={
            anim5
              ? "slider__dots-active"
              : !anim1 && !anim2 && !anim3 && !anim4 && !anim5
              ? "slider__dots-active"
              : ""
          }
        ></div>
        <div className={anim1 ? "slider__dots-active" : ""}></div>
        <div className={anim2 ? "slider__dots-active" : ""}></div>
        <div className={anim3 ? "slider__dots-active" : ""}></div>
        <div className={anim4 ? "slider__dots-active" : ""}></div>
      </div>
    </div>
  );
}

export default SliderComp;
