import { IoMdArrowDropdown } from "react-icons/io";
import "../styles/Comp-Single/Menu.css";
import React, { useEffect, useRef, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/Auth";
import { BasketContext } from "../Context/Basket";
import { WishlistContext } from "../Context/Wishlist";
import { MobileContext } from "../Context/Mobile";
import { useWindowDimensions } from "../Hooks/Viewport";

function Menu({
  clickedMenu,
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
}) {
  const [activeLang, setActiveLang] = useState<boolean[]>([true, false]);
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const mContext = useContext(MobileContext);

  const basketRef = useRef<HTMLDivElement>(null);
  const wishlistRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);

  const mainRef = useRef<HTMLDivElement>(null);

  const { t, i18n } = useTranslation();

  const aContext = useContext(AuthContext);
  const bContext = useContext(BasketContext);
  const wContext = useContext(WishlistContext);

  const basketWrapperRef = useRef<HTMLDivElement>(null);
  const wishlistWrapperRef = useRef<HTMLDivElement>(null);
  const userWrapperRef = useRef<HTMLDivElement>(null);
  const languageWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeLang[0]) {
      localStorage.setItem("i18nextLng", "en");
      i18n.changeLanguage("en");
    } else if (activeLang[1]) {
      localStorage.setItem("i18nextLng", "ro");
      i18n.changeLanguage("ro");
    }
  }, [activeLang]);

  useEffect(() => {
    setClickedBasket(false);
    setClickedUser(false);
    setClickedWishlist(false);
    setClickedLanguage(false);
  }, [clickedMenu]);

  useEffect(() => {
    if (basketRef.current && basketWrapperRef.current && isOpened) {
      if (clickedBasket) {
        basketRef.current.style.height =
          basketWrapperRef.current.clientHeight + "px";
      } else {
        basketRef.current.style.height = 0 + "px";
      }
    }
    setIsOpened(true);
  }, [clickedBasket, bContext]);

  useEffect(() => {
    if (wishlistRef.current && wishlistWrapperRef.current && isOpened) {
      if (clickedWishlist) {
        wishlistRef.current.style.height =
          wishlistWrapperRef.current.clientHeight + "px";
      } else {
        wishlistRef.current.style.height = 0 + "px";
      }
    }
    setIsOpened(true);
  }, [wContext, clickedWishlist]);

  useEffect(() => {
    if (userRef.current && userWrapperRef.current && isOpened) {
      if (clickedUser) {
        userRef.current.style.height =
          userWrapperRef.current.clientHeight + "px";
      } else {
        userRef.current.style.height = 0 + "px";
      }
    }
    setIsOpened(true);
  }, [aContext, clickedUser]);

  useEffect(() => {
    if (languageRef.current && languageWrapperRef.current && isOpened) {
      if (clickedLanguage) {
        languageRef.current.style.height =
          languageWrapperRef.current.clientHeight + "px";
      } else {
        languageRef.current.style.height = 0 + "px";
      }
    }
    setIsOpened(true);
  }, [clickedLanguage]);

  return (
    <div
      ref={mainRef}
      className={`menu ${chosenMode === false ? "menu-dark" : "menu-light"} ${
        clickedMenu ? "menu-active" : "menu-inactive"
      } ${mContext.isMobile ? "menu-mobile" : ""}`}
    >
      <div className={`menu__option`}>
        <h3 onClick={() => handleOpening("basket")}>Basket</h3>
        <div
          ref={basketRef}
          className={`menu__option-option ${
            clickedBasket
              ? "menu__option-option-active"
              : "menu__option-option-inactive"
          }`}
        >
          <div className="menu__option-option-wrapper" ref={basketWrapperRef}>
            {bContext.product.length === 0 ? (
              <h4>Your basket is empty.</h4>
            ) : (
              bContext.product.map((product, i) => {
                return (
                  <div className="menu__option-option-product" key={i}>
                    <div className="menu__option-option-product-left">
                      <h5>
                        <Link to={`/product/${product.id}`}>
                          {product.title}
                        </Link>
                      </h5>
                      <img
                        alt=""
                        src={
                          product.isCustomizable
                            ? product.backgroundImg + "1.jpg"
                            : product.backgroundImg
                        }
                      />
                    </div>
                    <div className="menu__option-option-product-right">
                      <span>Quantity: {product.quantity}</span>
                      <span>
                        Total: ${(product.price * product.quantity).toFixed(2)}
                      </span>
                      <div className="menu__option-option-product-right-btns">
                        <button
                          type="button"
                          onClick={() => bContext.addToBasket(product)}
                        >
                          +
                        </button>
                        <button
                          type="button"
                          onClick={() => bContext.decrementProduct(product.id)}
                        >
                          -
                        </button>
                      </div>
                      <div className="menu__option-option-product-right-btns-remove">
                        <button
                          type="button"
                          onClick={() => bContext.removeFromBasket(product.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      <div className="menu__option">
        <h3 onClick={() => handleOpening("wishlist")}>Wishlist</h3>
        <div
          ref={wishlistRef}
          className={`menu__option-option ${
            clickedWishlist
              ? "menu__option-option-active"
              : "menu__option-option-inactive"
          }`}
        >
          <div className="menu__option-option-wrapper" ref={wishlistWrapperRef}>
            {wContext.product.length === 0 ? (
              <h4>Your wishlist is empty.</h4>
            ) : (
              wContext.product.map((product, i) => {
                return (
                  <div className="menu__option-option-product" key={i}>
                    <div className="menu__option-option-product-left">
                      <h5>
                        <Link to={`/product/${product.id}`}>
                          {product.title}
                        </Link>
                      </h5>
                      <img
                        alt=""
                        src={
                          product.isCustomizable
                            ? product.backgroundImg + "1.jpg"
                            : product.backgroundImg
                        }
                      />
                    </div>
                    <div className="menu__option-option-product-right">
                      <span style={{ visibility: "hidden", opacity: 0 }}>
                        Quantity: {product.quantity}
                      </span>
                      <span>
                        Price: ${(product.price * product.quantity).toFixed(2)}
                      </span>
                      <div
                        className="menu__option-option-product-right-btns"
                        style={{ opacity: 0, visibility: "hidden" }}
                      >
                        <button type="button">+</button>
                        <button type="button">-</button>
                      </div>
                      <div className="menu__option-option-product-right-btns-remove">
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
                );
              })
            )}
          </div>
        </div>
      </div>
      <div className="menu__option">
        <h3 onClick={() => handleOpening("user")}>Account</h3>
        <div
          ref={userRef}
          className={`menu__option-option ${
            clickedUser
              ? "menu__option-option-active"
              : "menu__option-option-inactive"
          }`}
        >
          <div className="menu__option-option-wrapper" ref={userWrapperRef}>
            {aContext.isLoggedIn ? (
              <div className="menu__option-option-user menu__option-option-user-logged">
                <Link to="/orders">Orders</Link>
                <Link to="/profile">Profile &amp; Security</Link>
                <Link to="/settings">Settings</Link>
                <Link to="/help">Help</Link>
                <Link to="/logout" onClick={() => aContext.logout()}>
                  Log Out
                </Link>
              </div>
            ) : (
              <div className="menu__option-option-user">
                <button
                  type="button"
                  onClick={() => {
                    setChosenAction([false, true]);
                    setClickedLogin(true);
                  }}
                >
                  Log In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setChosenAction([true, false]);
                    setClickedLogin(true);
                  }}
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="menu__option">
        <h3 onClick={() => handleOpening("language")}>Language</h3>
        <div
          ref={languageRef}
          className={`menu__option-option ${
            clickedLanguage
              ? "menu__option-option-active"
              : "menu__option-option-inactive"
          }`}
        >
          <div className="menu__option-option-wrapper" ref={languageWrapperRef}>
            {" "}
            <div className="menu__option-option-language">
              <button
                onClick={() => setActiveLang([true, false])}
                type="button"
                className={`${
                  activeLang[0] ? "menu__option-option-language-active" : ""
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setActiveLang([false, true])}
                type="button"
                className={`${
                  activeLang[1] ? "menu__option-option-language-active" : ""
                }`}
              >
                RO
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Menu);
