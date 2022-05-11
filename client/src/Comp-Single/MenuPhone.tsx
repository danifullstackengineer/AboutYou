import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BasketContext } from "../Context/Basket";
import { MobileContext } from "../Context/Mobile";
import { WishlistContext } from "../Context/Wishlist";
import "../styles/Comp-Single/MenuPhone.css";

const MenuPhone = ({
  clickedMenu,
  setClickedMenu,
  chosenMode,
  setClickedLogin,
  setChosenAction,
  setClickedBasket,
  setClickedWishlist,
  setClickedUser,
  setClickedLanguage,
  clickedBasket,
  clickedWishlist,
  clickedUser,
  clickedLanguage,
  handleOpening,
  display,
}: {
  clickedMenu: boolean;
  chosenMode: boolean | undefined;
  setClickedLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setChosenAction: React.Dispatch<React.SetStateAction<boolean[]>>;
  setClickedBasket: React.Dispatch<React.SetStateAction<boolean>>;
  setClickedWishlist: React.Dispatch<React.SetStateAction<boolean>>;
  setClickedUser: React.Dispatch<React.SetStateAction<boolean>>;
  setClickedLanguage: React.Dispatch<React.SetStateAction<boolean>>;
  clickedBasket: boolean;
  clickedWishlist: boolean;
  clickedUser: boolean;
  clickedLanguage: boolean;
  handleOpening: (type: "basket" | "wishlist" | "user" | "language") => void;
  setClickedMenu: React.Dispatch<React.SetStateAction<boolean>>;
  display: string;
}) => {
  const mainRef = useRef<HTMLDivElement>(null);

  const mContext = useContext(MobileContext);
  const bContext = useContext(BasketContext);
  const wContext = useContext(WishlistContext);

  useEffect(() => {
    setClickedBasket(false);
    setClickedUser(false);
    setClickedWishlist(false);
    setClickedLanguage(false);
  }, [clickedMenu]);

  const basketRef = useRef<HTMLDivElement>(null);
  const wishlistRef = useRef<HTMLDivElement>(null);

  const [scrollAmountBasket, setScrollAmountBasket] = useState<number>(0);
  const [scrollAmountWishlist, setScrollAmountWishlist] = useState<number>(0);

  const handleScroll = (type: "basket" | "wishlist"): void => {
    if (basketRef.current) {
      const bScroll = basketRef.current.scrollTop;
      const height =
        basketRef.current.scrollHeight - basketRef.current.clientHeight;
      const scrolled = (bScroll / height) * 100;
      setScrollAmountBasket(scrolled);
    }
    switch (type) {
      case "basket":
        if (basketRef.current) {
          const bScroll = basketRef.current.scrollTop;
          const height =
            basketRef.current.scrollHeight - basketRef.current.clientHeight;
          const scrolled = (bScroll / height) * 100;
          setScrollAmountBasket(scrolled);
        }
        break;
      case "wishlist":
        if (wishlistRef.current) {
          const bScroll = wishlistRef.current.scrollTop;
          const height =
            wishlistRef.current.scrollHeight - wishlistRef.current.clientHeight;
          const scrolled = (bScroll / height) * 100;
          setScrollAmountWishlist(scrolled);
        }
        break;
    }
  };

  useEffect(() => {
    if (wContext) {
      handleScroll("wishlist");
    }
    if (bContext) {
      handleScroll("basket");
    }
  }, [wContext, bContext]);

  const [isOverflownBasket, setIsOverflownBasket] = useState<boolean>(false);
  const [isOverflownWishlist, setIsOverflownWishlist] =
    useState<boolean>(false);

  useEffect(() => {
    if (!clickedBasket) {
      setTimeout(() => {
        if (basketRef.current) {
          basketRef.current.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      }, 250);
    }
    if (!clickedWishlist) {
      setTimeout(() => {
        if (wishlistRef.current) {
          wishlistRef.current.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      }, 250);
    }
  }, [clickedBasket, clickedWishlist]);

  useEffect(() => {
    setIsOverflownBasket(handleOverflown("basket"));
  }, [clickedBasket]);
  useEffect(() => {
    setIsOverflownWishlist(handleOverflown("wishlist"));
  }, [clickedWishlist]);

  const handleOverflown = (type: "basket" | "wishlist"): boolean => {
    switch (type) {
      case "basket":
        if (basketRef.current) {
          return (
            basketRef.current.offsetHeight <= basketRef.current.scrollHeight
          );
        }
        return false;
      case "wishlist":
        if (wishlistRef.current) {
          return (
            wishlistRef.current.offsetHeight < wishlistRef.current.scrollHeight
          );
        }
        return false;
    }
  };

  return (
    <div
      className={`menuPhone ${
        chosenMode === false ? "menuPhone-dark" : "menuPhone-light"
      } ${clickedMenu ? "menuPhone-active" : "menuPhone-inactive"} ${
        mContext.isMobile ? "menuPhone-mobile" : ""
      } ${
        clickedBasket || clickedUser || clickedLanguage || clickedWishlist
          ? "menuPhone-clicked"
          : ""
      }`}
      ref={mainRef}
      style={{ display }}
    >
      <div className={`menuPhone__top`}>
        <button
          className={clickedBasket ? "menuPhone__top-active" : ""}
          onClick={() => handleOpening("basket")}
        >
          Basket
        </button>
        <button
          className={clickedWishlist ? "menuPhone__top-active" : ""}
          onClick={() => handleOpening("wishlist")}
        >
          Wishlist
        </button>
        <button
          className={clickedUser ? "menuPhone__top-active" : ""}
          onClick={() => handleOpening("user")}
        >
          Account
        </button>
        <button
          className={clickedLanguage ? "menuPhone__top-active" : ""}
          onClick={() => handleOpening("language")}
        >
          Language
        </button>
        <button onClick={() => setClickedMenu(false)}>
          <img
            src={"/assets/svg/dropdown-dark.svg"}
            alt={""}
            loading={"lazy"}
          />
        </button>
      </div>
      <div className={`menuPhone__bottom`}>
        {clickedBasket ? (
          <div className="menuPhone__bottom__option" ref={basketRef}>
            {bContext.product.length > 0 ? (
              bContext.product.map((product, i) => {
                return (
                  <div className="menuPhone__bottom__option-option" key={i}>
                    <div className="menuPhone__bottom__option-option-top">
                      <h5>{product.title}</h5>
                    </div>
                    <div className="menuPhone__bottom__option-option-bottom">
                      <img
                        alt=""
                        src={
                          product.dark
                            ? product.backgroundImg
                            : product.backgroundImg + "1.jpg"
                        }
                      />
                      <div className="menuPhone__bottom__option-option-right">
                        <span>Quantity: {product.quantity}</span>
                        <span>
                          Price: $
                          {(product.price * product.quantity).toFixed(2)}
                        </span>
                        <span>{/* Size: {product.size} */}</span>
                        <span>{/* Color: {product.color} */}</span>
                        <div className="menuPhone__bottom__option-option-right-btns">
                          <button
                            type="button"
                            onClick={() => bContext.addToBasket(product)}
                          >
                            +
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              bContext.decrementProduct(product.id)
                            }
                          >
                            -
                          </button>
                        </div>
                        <div className="menuPhone__bottom__option-option-right-btn-remove">
                          <button
                            type="button"
                            onClick={() =>
                              bContext.removeFromBasket(product.id)
                            }
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="menuPhone__bottom__text">
                Your basket is empty.
              </div>
            )}
          </div>
        ) : (
          ""
        )}
        {clickedWishlist ? (
          <div className="menuPhone__bottom__option" ref={wishlistRef}>
            {wContext.product.length > 0 ? (
              wContext.product.map((product, i) => {
                return (
                  <div className="menuPhone__bottom__option-option" key={i}>
                    <div className="menuPhone__bottom__option-option-top">
                      <h5>{product.title}</h5>
                    </div>
                    <div className="menuPhone__bottom__option-option-bottom">
                      <img
                        alt=""
                        src={
                          product.dark
                            ? product.backgroundImg
                            : product.backgroundImg + "1.jpg"
                        }
                      />
                      <div
                        className="menuPhone__bottom__option-option-right"
                        style={{ opacity: 0, visibility: "hidden" }}
                      >
                        <span>Quantity: {product.quantity}</span>
                        <span>
                          Price: $
                          {(product.price * product.quantity).toFixed(2)}
                        </span>
                        <span>{/* Size: {product.size} */}</span>
                        <span>{/* Color: {product.color} */}</span>
                        <div
                          className="menuPhone__bottom__option-option-right-btns"
                          style={{ opacity: 0, visibility: "hidden" }}
                        >
                          <button
                            type="button"
                            onClick={() => bContext.addToBasket(product)}
                          >
                            +
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              bContext.decrementProduct(product.id)
                            }
                          >
                            -
                          </button>
                        </div>
                        <div className="menuPhone__bottom__option-option-right-btn-remove">
                          <button
                            type="button"
                            onClick={() =>
                              wContext.removeFromWishlist(product.id)
                            }
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="menuPhone__bottom__text">
                Your wishlist is empty.
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default MenuPhone;
