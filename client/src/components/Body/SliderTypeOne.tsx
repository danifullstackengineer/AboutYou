import React, { useEffect, useRef, useState } from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import "../../styles/components/Body/SliderTypeOne.css";

function SliderTypeOne({
  props,
}: {
  props: {
    image: string;
    button: boolean;
    heart: boolean;
    lastSlide: boolean;
    title1?: string;
    title2?: string;
  }[];
}) {
  const [showNext, setShowNext] = useState<boolean>(true);
  const [showPrev, setShowPrev] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const [nextClass, setNextClass] = useState<string>("");
  const [prevClass, setPrevClass] = useState<string>("");

  const handleNext = () => {
    setPrevClass("");
    setNextClass("sliderTypeOne__item-slide-Right");
    setShowNext(false);
    setShowPrev(true);
  };
  const handlePrev = () => {
    setNextClass("");
    setPrevClass("sliderTypeOne__item-slide-Left");
    setShowNext(true);
    setShowPrev(false);
  };

  return (
    <div className="sliderTypeOne">
      <button
        onClick={handlePrev}
        ref={btnRef}
        className={`sliderTypeOne__prevBtn ${
          showPrev ? "sliderTypeOne__prevBtn-show" : ""
        }`}
      >
        <span>
          <BiLeftArrow />
        </span>
      </button>
      {props.map((item, i) => {
        return (
          <div
            className={`sliderTypeOne__item ${nextClass} ${prevClass}`}
            key={i}
            ref={itemRef}
          >
            <div className="sliderTypeOne__item-img" ref={imageRef}>
              {item.lastSlide ? (
                <div className="sliderTypeOne__item-text-div">
                  <div className="sliderTypeOne__item-text1">{item.title1}</div>
                  <div className="sliderTypeOne__item-text2">{item.title2}</div>
                </div>
              ) : (
                ""
              )}
              {!item.lastSlide ? <img src={item.image} alt={item.image} /> : ""}
              {item.heart ? (
                <div className="sliderTypeOne__item-heart"></div>
              ) : (
                ""
              )}
              {item.button ? (
                <div className="sliderTypeOne__item-btn-div">
                  <button className="sliderTypeOne__item-btn">Story</button>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="sliderTypeOne__item-info">
              <span>{!item.lastSlide ? item.title1 : ""}</span>
              <span>{!item.lastSlide ? item.title2 : ""}</span>
            </div>
          </div>
        );
      })}
      <button
        onClick={handleNext}
        ref={btnRef}
        className={`sliderTypeOne__nextBtn ${
          showNext ? "sliderTypeOne__nextBtn-show" : ""
        }`}
      >
        <span>
          <BiRightArrow />
        </span>
      </button>
    </div>
  );
}

export default SliderTypeOne;
