import { BsBasket3 } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { RiArrowDownSFill } from "react-icons/ri";
import { RiArrowUpSFill } from "react-icons/ri";
import { BiUser } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import "../styles/Comp-Single/Menu.css";
import React, { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/Auth";
import { BasketContext } from "../Context/Basket";
import { WishlistContext } from "../Context/Wishlist";

function Menu({
  clickedMenu,
  chosenMode,
  setClickedLogin,
  setChosenAction,
  height,
}: {
  clickedMenu: boolean;
  chosenMode: boolean | undefined;
  setClickedLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setChosenAction: React.Dispatch<React.SetStateAction<boolean[]>>;
  height?: number;
}) {
  const [clickedBasket, setClickedBasket] = useState<boolean>(false);
  const [clickedUser, setClickedUser] = useState<boolean>(false);
  const [clickedWishlist, setClickedWishlist] = useState<boolean>(false);
  const [activeLang, setActiveLang] = useState<boolean[]>([true, false]);
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  const aContext = useContext(AuthContext);
  const bContext = useContext(BasketContext);
  const wContext = useContext(WishlistContext);

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
  }, [clickedMenu]);

  return (
    <div
      style={{
        top: height ? height : undefined,
        height: height ? `calc(100% - ${height} px - 4px)` : undefined,
      }}
      className={`menu ${chosenMode === false ? "menu-dark" : "menu-light"} ${
        clickedMenu ? "menu-active" : ""
      }`}
    >
      <div
        className={`menu__option ${clickedBasket ? "menu__option-active" : ""}`}
      >
        <div
          className="menu__option__name"
          onClick={() => setClickedBasket(!clickedBasket)}
        >
          <span>
            <BsBasket3 />
          </span>
          <span>Basket</span>
          <span>
            {clickedBasket ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
          </span>
        </div>
        <div
          className={`menu__option__dropdown menu__option__dropdown-basket ${
            clickedBasket ? "menu__option__dropdown-active-basket" : ""
          } ${
            bContext.product.length === 0
              ? "menu__option__dropdown-basket-no"
              : "menu__option__dropdown-basket-yes"
          }`}
        >
          {bContext.product.length === 0 ? (
            <>
              <div className="menu__option__dropdown-basket-empty">
                Your basket is empty!
              </div>
              <div className="menu__option__dropdown-option">
                Shop new items
              </div>
              <div className="menu__option__dropdown-option">
                Discover outfits
              </div>
            </>
          ) : (
            <>
              <div className="menu__option__dropdown-option">
                Your basket
              </div>
            </>
          )}
        </div>
      </div>
      <div
        className={`menu__option ${clickedUser ? "menu__option-active" : ""}`}
      >
        <div
          className="menu__option__name"
          onClick={() => setClickedUser(!clickedUser)}
        >
          <span>
            <BiUser />
          </span>
          <span>Account</span>
          <span>{clickedUser ? <RiArrowUpSFill /> : <RiArrowDownSFill />}</span>
        </div>
        <div
          className={`menu__option__dropdown menu__option__dropdown-user ${
            clickedUser ? "menu__option__dropdown-active menu__option__dropdown-active-user" : ""
          } ${
            !aContext.isLoggedIn
              ? "menu__option__dropdown-user-no"
              : "menu__option__dropdown-user-yes"
          }`}
        >
          {!aContext.isLoggedIn ? (
            <>
              <div
                className="menu__option__dropdown-option"
                onClick={() => {
                  setChosenAction([false, true]);
                  setClickedLogin(true);
                }}
              >
                Log In
              </div>
              <div
                className="menu__option__dropdown-option"
                onClick={() => {
                  setChosenAction([true, false]);
                  setClickedLogin(true);
                }}
              >
                Register
              </div>
            </>
          ) : (
            <>
              <div
                className="menu__option__dropdown-option"
                onClick={() => navigate("/orders")}
              >
                Orders
              </div>
              <div
                className="menu__option__dropdown-option"
                onClick={() => navigate("/profile")}
              >
                Profile &amp; Security
              </div>
              <div className="menu__option__dropdown-option">Settings</div>
              <div
                className="menu__option__dropdown-option"
                onClick={() => navigate("/help")}
              >
                Help
              </div>
            </>
          )}
        </div>
      </div>
      <div
        className={`menu__option ${
          clickedWishlist ? "menu__option-active" : ""
        }`}
      >
        <div
          className="menu__option__name"
          onClick={() => setClickedWishlist(!clickedWishlist)}
        >
          <span>
            <AiOutlineHeart />
          </span>
          <span>Wishlist</span>
          <span>
            {clickedWishlist ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
          </span>
        </div>
        <div
          className={`menu__option__dropdown menu__option__dropdown-wishlist ${
            clickedWishlist ? "menu__option__dropdown-active menu__option__dropdown-active-wishlist" : ""
          } ${
            false //TODO: Change to wContext.product.length === 0
              ? "menu__option__dropdown-wishlist-no"
              : "menu__option__dropdown-wishlist-yes"
          }`}
        >
          {true ? (
            //TODO: Change ^ to wContext.product.length === 0
            <>
              <div className="menu__option__dropdown-basket-empty">
                Your wishlist is empty!
              </div>
              <div
                className="menu__option__dropdown-option"
                onClick={() => navigate("/wishlist")}
              >
                Wishlist
              </div>
            </>
          ) : (
            <>
              <div className="menu__option__dropdown-option">
                Wishlist
              </div>
            </>
          )}
        </div>
      </div>
      <div className="menu__option menu__option-lang">
        <button
          onClick={() => setActiveLang([true, false])}
          type="button"
          className={activeLang[0] ? "menu__option-lang-active" : ""}
        >
          EN
        </button>
        <button
          onClick={() => setActiveLang([false, true])}
          type="button"
          className={activeLang[1] ? "menu__option-lang-active" : ""}
        >
          RO
        </button>
      </div>
    </div>
  );
}

export default Menu;
