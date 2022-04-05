import React, { useRef, useState } from "react";
import "../../styles/components/Body/SliderTypeTwo.css";
import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineHeart } from "react-icons/ai";
import { addToBasketStorage } from "../../Logic/localStorage/basket";
import { addToWishlistStorage } from "../../Logic/localStorage/wishlist";

function SliderTypeTwo({
  props,
  notfull,
  setClickedLogin,
}: {
  props: {
    backgroundImg: string;
    foregroundImg?: string;
    tags?: { name: string; special?: boolean }[];
    title: string;
    price: string;
    priceDiscount: { full: string; discount: string };
    colors: string[];
    sizes?: string[];
    id: string;
  }[];
  notfull?: boolean;
  setClickedLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [showNext, setShowNext] = useState<boolean>(true);
  const [showPrev, setShowPrev] = useState<boolean>(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const [nextClass, setNextClass] = useState<string>("");
  const [prevClass, setPrevClass] = useState<string>("");

  const [prevClassNotFull, setPrevClassNotFull] = useState<string>("");
  const [nextClassNotFull, setNextClassNotFull] = useState<string>("");

  const handleWishlistClick = (item: {
    id: string;
    backgroundImg: string;
    foregroundImg?: string | undefined;
    tags?:
      | {
          name: string;
          special?: boolean | undefined;
        }[]
      | undefined;
    title: string;
    price: string;
    priceDiscount: { full: string; discount: string };
    colors: string[];
    sizes?: string[] | undefined;
  }): void => {
    const token = localStorage.getItem("token");
    if (token) {
      addToWishlistStorage(item);
    } else {
      setClickedLogin(true);
    }
  };

  const handleNext = () => {
    if (!notfull) {
      setPrevClass("");
      setNextClass("sliderTypeTwo__item-slide-Right");
    } else {
      setPrevClassNotFull("");
      setNextClassNotFull("sliderTypeTwo__item-slide-Right-notfull");
    }
    setShowNext(false);
    setShowPrev(true);
  };
  const handlePrev = () => {
    if (!notfull) {
      setNextClass("");
      setPrevClass("sliderTypeTwo__item-slide-Left");
    } else {
      setNextClassNotFull("");
      setPrevClassNotFull("sliderTypeTwo__item-slide-Left-notfull");
    }
    setShowNext(true);
    setShowPrev(false);
  };

  const addToBasket = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: {
      id: string;
      backgroundImg: string;
      foregroundImg?: string | undefined;
      tags?:
        | {
            name: string;
            special?: boolean | undefined;
          }[]
        | undefined;
      title: string;
      price: string;
      priceDiscount: { full: string; discount: string };
      colors: string[];
      sizes?: string[] | undefined;
    }
  ) => {
    if (heartRef.current) {
      if (e.target !== heartRef.current && e.target !== heartRef.current.childNodes[0]) {
        addToBasketStorage(item);
      }
    }
  };

  const heartRef = useRef<HTMLSpanElement>(null);
  return (
    <div className="sliderTypeTwo">
      <button
        onClick={handlePrev}
        ref={btnRef}
        className={`sliderTypeTwo__prevBtn ${
          showPrev ? "sliderTypeTwo__prevBtn-show" : ""
        }`}
      >
        <span>
          <IoIosArrowBack />
        </span>
      </button>
      <div className="sliderTypeTwo__counter">
        <span
          className={`${showNext ? "sliderTypeTwo__counter-opacity" : ""}`}
          onClick={showPrev ? handlePrev : () => {}}
        >
          <MdArrowBackIos />
        </span>
        <span>{showNext ? "1" : "2"} / 2</span>
        <span
          className={`${showPrev ? "sliderTypeTwo__counter-opacity" : ""}`}
          onClick={showNext ? handleNext : () => {}}
        >
          <MdArrowForwardIos />
        </span>
      </div>
      {props.map((item, i) => {
        return (
          <div
            onClick={(e) => addToBasket(e, item)}
            className={`sliderTypeTwo__item ${nextClass} ${prevClass} ${nextClassNotFull} ${prevClassNotFull} ${
              !item.foregroundImg ? "sliderTypeTwo__item-no-fg" : ""
            }`}
            key={i}
            ref={itemRef}
          >
            <div className="sliderTypeTwo__item-img">
              <div className="sliderTypeTwo__item-img-bg">
                <img
                  loading="lazy"
                  src={item.backgroundImg}
                  alt={item.backgroundImg}
                  className={
                    !item.foregroundImg
                      ? "sliderTypeTwo__item-img-bg-no-fg"
                      : ""
                  }
                />
              </div>
              <div className="sliderTypeTwo__item-img-fg">
                <img
                  loading="lazy"
                  src={item.foregroundImg}
                  alt={item.foregroundImg}
                />
              </div>
              <span
                ref={heartRef}
                className="sliderTypeTwo__item-heart"
                onClick={() => handleWishlistClick(item)}
              >
                <span ref={heartRef}>
                  <AiOutlineHeart/>
                </span>
              </span>
              {item.tags ? (
                <div className="sliderTypeTwo__tags">
                  {item.tags.map((tag, i) => {
                    return (
                      <span
                        key={i}
                        className={
                          tag.special ? "sliderTypeTwo__tags-special" : ""
                        }
                      >
                        {tag.name}
                      </span>
                    );
                  })}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="sliderTypeTwo__item-info">
              <span>{item.title}</span>
              {item.price ? (
                <span>$ {item.price}</span>
              ) : (
                <div>
                  <span>$ {item.priceDiscount.discount}</span>
                  <span>$ {item.priceDiscount.full}</span>
                </div>
              )}
              <span>
                {item.colors.length > 0
                  ? item.colors.map((color, i) => {
                      return (
                        <div
                          className="sliderTypeTwo__item-info-circle"
                          key={i}
                          style={{ backgroundColor: color }}
                        />
                      );
                    })
                  : ""}
              </span>
              <span>
                {item.sizes ? (
                  item.sizes.length > 0 ? (
                    <div>
                      Available sizes:{" "}
                      {item.sizes.map((size, i) => {
                        return (
                          <span
                            className="sliderTypeTwo__item-info-sizes"
                            key={i}
                          >
                            {item.sizes
                              ? item.sizes.length - 1 === i
                                ? size
                                : size + ", "
                              : ""}
                          </span>
                        );
                      })}
                    </div>
                  ) : (
                    "Available in many sizes"
                  )
                ) : (
                  "Available in many sizes"
                )}
              </span>
            </div>
          </div>
        );
      })}
      <button
        onClick={handleNext}
        ref={btnRef}
        className={`sliderTypeTwo__nextBtn ${
          showNext ? "sliderTypeTwo__nextBtn-show" : ""
        }`}
      >
        <span>
          <IoIosArrowForward />
        </span>
      </button>
    </div>
  );
}

export default SliderTypeTwo;
