import  { useRef, useState } from "react";
import "../../styles/components/Body/SliderTypeOne.css";
import { AiOutlineHeart } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

function SliderTypeOne({
  props,
  notfull,
}: {
  props: {
    button: boolean;
    heart: boolean;
    lastSlide: boolean;
    title1?: string;
    title2?: string;
    buttonName?: string;
    specialTitle?: string;
    image: string;
  }[];
  notfull?: boolean;
}) {
  const [showNext, setShowNext] = useState<boolean>(true);
  const [showPrev, setShowPrev] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const [nextClass, setNextClass] = useState<string>("");
  const [prevClass, setPrevClass] = useState<string>("");

  const [prevClassNotFull, setPrevClassNotFull] = useState<string>("");
  const [nextClassNotFull, setNextClassNotFull] = useState<string>("");

  const handleNext = () => {
    if (!notfull) {
      setPrevClass("");
      setNextClass("sliderTypeOne__item-slide-Right");
    } else {
      setPrevClassNotFull("");
      setNextClassNotFull("sliderTypeOne__item-slide-Right-notfull");
    }
    setShowNext(false);
    setShowPrev(true);
  };
  const handlePrev = () => {
    if (!notfull) {
      setNextClass("");
      setPrevClass("sliderTypeOne__item-slide-Left");
    } else {
      setNextClassNotFull("");
      setPrevClassNotFull("sliderTypeOne__item-slide-Left-notfull");
    }
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
          <IoIosArrowBack />
        </span>
      </button>
      {props.map((item, i) => {
        if (!item.lastSlide) {
          return (
            <div
              className={`sliderTypeOne__item ${nextClass} ${prevClass} ${nextClassNotFull} ${prevClassNotFull}`}
              key={i}
              ref={itemRef}
            >
              <div className="sliderTypeOne__item-img" ref={imageRef}>
                {item.lastSlide ? (
                  <div className="sliderTypeOne__item-text-div">
                    <div className="sliderTypeOne__item-text1">
                      {item.title1}
                    </div>
                    <div className="sliderTypeOne__item-text2">
                      {item.title2}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {!item.lastSlide ? (
                  <img loading="lazy" src={item.image} alt={item.image} />
                ) : (
                  ""
                )}
                {item.heart ? (
                  <div className="sliderTypeOne__item-heart">
                    <span>
                      <AiOutlineHeart />
                    </span>
                    <span>0</span>
                  </div>
                ) : (
                  ""
                )}
                {item.button ? (
                  <div className="sliderTypeOne__item-btn-div">
                    <button className="sliderTypeOne__item-btn">
                      {item.buttonName ? item.buttonName : "Story"}
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="sliderTypeOne__item-info">
                {item.specialTitle ? (
                  <span>{item.specialTitle}</span>
                ) : (
                  <>
                    {" "}
                    <span>{!item.lastSlide ? item.title1 : ""}</span>
                    <span>{!item.lastSlide ? item.title2 : ""}</span>
                  </>
                )}
              </div>
            </div>
          );
        } 
        else return <></>
      })}
      {props.map((item, i)=> {
        if (item.lastSlide) {
          return (
            <div
              className={`sliderTypeOne__item ${nextClass} ${prevClass} ${nextClassNotFull} ${prevClassNotFull}`}
              key={i}
              ref={itemRef}
            >
              <div className="sliderTypeOne__item-img" ref={imageRef}>
                {item.lastSlide ? (
                  <div className="sliderTypeOne__item-text-div">
                    <div className="sliderTypeOne__item-text1">
                      {item.title1}
                    </div>
                    <div className="sliderTypeOne__item-text2">
                      {item.title2}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {!item.lastSlide ? (
                  <img loading="lazy" src={item.image} alt={item.image} />
                ) : (
                  ""
                )}
                {item.heart ? (
                  <div className="sliderTypeOne__item-heart">
                    <span>
                      <AiOutlineHeart />
                    </span>
                    <span>0</span>
                  </div>
                ) : (
                  ""
                )}
                {item.button ? (
                  <div className="sliderTypeOne__item-btn-div">
                    <button className="sliderTypeOne__item-btn">
                      {item.buttonName ? item.buttonName : "Story"}
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="sliderTypeOne__item-info">
                {item.specialTitle ? (
                  <span>{item.specialTitle}</span>
                ) : (
                  <>
                    {" "}
                    <span>{!item.lastSlide ? item.title1 : ""}</span>
                    <span>{!item.lastSlide ? item.title2 : ""}</span>
                  </>
                )}
              </div>
            </div>
          )
        }
        else return <></>
      })}
      <button
        onClick={handleNext}
        ref={btnRef}
        className={`sliderTypeOne__nextBtn ${
          showNext ? "sliderTypeOne__nextBtn-show" : ""
        }`}
      >
        <span>
          <IoIosArrowForward />
        </span>
      </button>
    </div>
  );
}

export default SliderTypeOne;
