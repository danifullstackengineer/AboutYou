import { useContext, useEffect, useState } from "react";
import "../../styles/components/Slider/Slider.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import useTimer from "../../Hooks/Timer";
import React from "react";
import { MobileContext } from "../../Context/Mobile";

function SliderComp({ chosenMode }: { chosenMode: boolean | undefined }) {
  const [{ seconds, reset }] = useTimer(1000);

  const [isSliding, setIsSliding] = useState<boolean>(false);

  const mContext = useContext(MobileContext);

  const [info] = useState<
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
  const [infoCurrent, setInfoCurrent] = useState<
    { title1: string; title2: string }[]
  >([
    { title1: "Stylish through the season", title2: "Shirt Jackets" },
    { title1: "Stolen looks from your dads closet", title2: "Dad-Style" },
    { title1: "Your Go-To", title2: "Festive Blouses" },
    { title1: "Make it colorful", title2: "Suit up" },
    { title1: "With a flair", title2: "Flattering dresses" },
  ]);

  const [anim, setAnim] = useState<string>("");

  const [queue] = useState<string[]>([
    "/assets/nike_slider/one.jpg",
    "/assets/nike_slider/two.jpg",
    "/assets/nike_slider/three.jpg",
    "/assets/nike_slider/four.webp",
    "/assets/nike_slider/five.jpg",
  ]);

  const [currentQueue, setCurrentQueue] = useState<string[]>([
    "/assets/nike_slider/one.jpg",
    "assets/nike_slider/two.jpg",
    "/assets/nike_slider/three.jpg",
    "/assets/nike_slider/four.webp",
    "/assets/nike_slider/five.jpg",
  ]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (seconds === 3) {
      setIsSliding(true);
      var animName = "slider__slide-anim-forwards";
      setAnim(animName);
      if (currentIndex !== 4) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
      const timeout = setTimeout(() => {
        switch (currentIndex) {
          case 0:
            setCurrentQueue([queue[1], queue[2], queue[3], queue[4], queue[0]]);
            setInfoCurrent([info[1], info[2], info[3], info[4], info[0]]);
            break;
          case 1:
            setCurrentQueue([queue[2], queue[3], queue[4], queue[0], queue[1]]);
            setInfoCurrent([info[2], info[3], info[4], info[0], info[1]]);
            break;
          case 2:
            setCurrentQueue([queue[3], queue[4], queue[0], queue[1], queue[2]]);
            setInfoCurrent([info[3], info[4], info[0], info[1], info[2]]);
            break;
          case 3:
            setCurrentQueue([queue[4], queue[0], queue[1], queue[2], queue[3]]);
            setInfoCurrent([info[4], info[0], info[1], info[2], info[3]]);
            break;
          case 4:
            setCurrentQueue([queue[0], queue[1], queue[2], queue[3], queue[4]]);
            setInfoCurrent([info[0], info[1], info[2], info[3], info[4]]);
            break;
        }
        setIsSliding(false);
        reset();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [seconds]);

  useEffect(() => {
    if (anim !== "slider__slide-anim-backwards-initial") {
      setAnim("");
    } else {
      setAnim("slider__slide-anim-backwards");
    }
  }, [currentQueue]);

  const handlePrev = (): void => {
    if(mContext.isMobile){
    setButtonAnim1("slider-btn-animated-mobile")
    setTimeout(()=>{
      setButtonAnim1("");
    }, 250)
  }
    if (!isSliding) {
      setIsSliding(true);
      setAnim("slider__slide-anim-backwards-initial");
      switch (currentIndex) {
        case 0:
          setCurrentQueue([queue[4], queue[0], queue[1], queue[2], queue[3]]);
          setInfoCurrent([info[4], info[0], info[1], info[2], info[3]]);
          break;
        case 1:
          setCurrentQueue([queue[0], queue[1], queue[2], queue[3], queue[4]]);
          setInfoCurrent([info[0], info[1], info[2], info[3], info[4]]);
          break;
        case 2:
          setCurrentQueue([queue[1], queue[2], queue[3], queue[4], queue[0]]);
          setInfoCurrent([info[1], info[2], info[3], info[4], info[0]]);
          break;
        case 3:
          setCurrentQueue([queue[2], queue[3], queue[4], queue[0], queue[1]]);
          setInfoCurrent([info[2], info[3], info[4], info[0], info[1]]);
          break;
        case 4:
          setCurrentQueue([queue[3], queue[4], queue[0], queue[1], queue[2]]);
          setInfoCurrent([info[3], info[4], info[0], info[1], info[2]]);
          break;
      }
      setTimeout(() => {
        setIsSliding(false);
        setAnim("");
        if (currentIndex !== 0) {
          setCurrentIndex(currentIndex - 1);
        } else {
          setCurrentIndex(4);
        }
        reset();
      }, 500);
    }
  };

  const handleNext = (): void => {
    if(mContext.isMobile){
      setButtonAnim2("slider-btn-animated-mobile")
      setTimeout(()=>{
        setButtonAnim2("");
      }, 250)
    }
    if (!isSliding) {
      setIsSliding(true);
      var animName = "slider__slide-anim-forwards";
      setAnim(animName);
      if (currentIndex !== 4) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
      setTimeout(() => {
        switch (currentIndex) {
          case 0:
            setCurrentQueue([queue[1], queue[2], queue[3], queue[4], queue[0]]);
            setInfoCurrent([info[1], info[2], info[3], info[4], info[0]]);
            break;
          case 1:
            setCurrentQueue([queue[2], queue[3], queue[4], queue[0], queue[1]]);
            setInfoCurrent([info[2], info[3], info[4], info[0], info[1]]);
            break;
          case 2:
            setCurrentQueue([queue[3], queue[4], queue[0], queue[1], queue[2]]);
            setInfoCurrent([info[3], info[4], info[0], info[1], info[2]]);
            break;
          case 3:
            setCurrentQueue([queue[4], queue[0], queue[1], queue[2], queue[3]]);
            setInfoCurrent([info[4], info[0], info[1], info[2], info[3]]);
            break;
          case 4:
            setCurrentQueue([queue[0], queue[1], queue[2], queue[3], queue[4]]);
            setInfoCurrent([info[0], info[1], info[2], info[3], info[4]]);
            break;
        }
        setIsSliding(false);
        reset();
      }, 500);
    }
  };

  const handleDotClick = (index: number): void => {
    if (!isSliding) {
      setCurrentIndex(index);
      reset();
      switch (index) {
        case 0:
          setCurrentQueue([queue[0], queue[1], queue[2], queue[3], queue[4]]);
          setInfoCurrent([info[0], info[1], info[2], info[3], info[4]]);
          break;
        case 1:
          setCurrentQueue([queue[1], queue[2], queue[3], queue[4], queue[0]]);
          setInfoCurrent([info[1], info[2], info[3], info[4], info[0]]);
          break;
        case 2:
          setCurrentQueue([queue[2], queue[3], queue[4], queue[0], queue[1]]);
          setInfoCurrent([info[2], info[3], info[4], info[0], info[1]]);
          break;
        case 3:
          setCurrentQueue([queue[3], queue[4], queue[0], queue[1], queue[2]]);
          setInfoCurrent([info[3], info[4], info[0], info[1], info[2]]);
          break;
        case 4:
          setCurrentQueue([queue[4], queue[0], queue[1], queue[2], queue[3]]);
          setInfoCurrent([info[4], info[0], info[1], info[2], info[3]]);
          break;
      }
    }
  };

  const [buttonAnim1, setButtonAnim1] = useState<string>();
  const [buttonAnim2, setButtonAnim2] = useState<string>();

  return (
    <div
      className={`slider ${
        chosenMode === false ? "slider-dark" : "slider-light"
      } ${mContext.isMobile ? "slider-mobile" : ""}`}
    >
      <div className={`slider__slide ${anim}`}>
        <img src={currentQueue[0]} alt="" />
        <div className="slider__info">
          <span>{infoCurrent[0].title1}</span>
          <span>{infoCurrent[0].title2}</span>
          <button>Story</button>
        </div>
      </div>
      <div className={`slider__slide ${anim}`}>
        <img src={currentQueue[1]} alt="" />
        <div className="slider__info">
          <span>{infoCurrent[1].title1}</span>
          <span>{infoCurrent[1].title2}</span>
          <button>Story</button>
        </div>
      </div>
      <div className={`slider__slide ${anim}`}>
        <img src={currentQueue[2]} alt="" />
        <div className="slider__info">
          <span>{infoCurrent[2].title1}</span>
          <span>{infoCurrent[2].title2}</span>
          <button>Story</button>
        </div>
      </div>
      <div className={`slider__slide ${anim}`}>
        <img src={currentQueue[3]} alt="" />
        <div className="slider__info">
          <span>{infoCurrent[3].title1}</span>
          <span>{infoCurrent[3].title2}</span>
          <button>Story</button>
        </div>
      </div>
      <div className={`slider__slide ${anim}`}>
        <img src={currentQueue[4]} alt="" />
        <div className="slider__info">
          <span>{infoCurrent[4].title1}</span>
          <span>{infoCurrent[4].title2}</span>
          <button>Story</button>
        </div>
      </div>
      <button type="button" className={`slider__prev ${buttonAnim1}`} onClick={handlePrev} aria-label="Previous Image Slider">
        <IoIosArrowBack style={{zIndex: "2"}}/>
      </button>
      <button type="button" className={`slider__next ${buttonAnim2}`} onClick={handleNext} aria-label="Next Image Slider">
        <IoIosArrowForward style={{zIndex: "2"}}/>
      </button>
      <div className="slider__dots">
        <div
          className={currentIndex === 0 ? "slider__dots-active" : ""}
          onClick={() => handleDotClick(0)}
        ></div>
        <div
          className={currentIndex === 1 ? "slider__dots-active" : ""}
          onClick={() => handleDotClick(1)}
        ></div>
        <div
          className={currentIndex === 2 ? "slider__dots-active" : ""}
          onClick={() => handleDotClick(2)}
        ></div>
        <div
          className={currentIndex === 3 ? "slider__dots-active" : ""}
          onClick={() => handleDotClick(3)}
        ></div>
        <div
          className={currentIndex === 4 ? "slider__dots-active" : ""}
          onClick={() => handleDotClick(4)}
        ></div>
      </div>
    </div>
  );
}

export default React.memo(SliderComp);
