import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/Auth";
import { BasketContext } from "../Context/Basket";
import { WishlistContext } from "../Context/Wishlist";
import { useWindowDimensions } from "../Hooks/Viewport";
import "../styles/Comp-Single/Accessory.css";
import { AccessoryType } from "../types/Accessory";

const Accessory = ({
  accessory,
  setClickedLogin,
  setClickedMenu,
  liked,
  clickedMenu,
  setClickedBasket,
  setClickedWishlist,
  handleOpening,
  clickedBasket,
  clickedWishlist,
}: {
  accessory: AccessoryType;
  setClickedLogin: React.Dispatch<React.SetStateAction<boolean>>;
  liked: boolean;
  clickedMenu: boolean;
  setClickedBasket: React.Dispatch<React.SetStateAction<boolean>>;
  setClickedWishlist: React.Dispatch<React.SetStateAction<boolean>>;
  setClickedMenu: React.Dispatch<React.SetStateAction<boolean>>;
  clickedBasket: boolean;
  clickedWishlist: boolean;
  handleOpening: (type: "user" | "wishlist" | "basket" | "language") => void;
}) => {
  const [likedInner, setLikedInner] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);

  const wContext = useContext(WishlistContext);
  const bContext = useContext(BasketContext);
  const aContext = useContext(AuthContext);

  const handleLike = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {};
  const handleBasket = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.stopPropagation();
    if (bContext.isInBasket(accessory.id)) {
      bContext.removeFromBasket(accessory.id);
    } else {
      bContext.addToBasket(accessory);
    }
    if (!clickedMenu) {
      setClickedMenu(true);
      setTimeout(() => {
        setClickedBasket(true);
      }, 150);
    } else {
      if (!clickedBasket) {
        handleOpening("basket");
      }
    }
  };
  const handleWishlist = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.stopPropagation();
    if (!aContext.isLoggedIn) {
      setClickedLogin(true);
    } else {
      if (wContext.isInWishlist(accessory.id)) {
        wContext.removeFromWishlist(accessory.id);
      } else {
        wContext.addToWishlist(accessory);
      }
    }
    if (!clickedMenu) {
      setClickedMenu(true);
      setTimeout(() => {
        setClickedWishlist(true);
      }, 150);
    } else {
      if (!clickedWishlist) {
        handleOpening("wishlist");
      }
    }
  };

  const { width } = useWindowDimensions();

  return (
    <div className={`accessory`}>
      <div className={`accessory__img`}>
        <img src={accessory.backgroundImg} alt={""} loading={"lazy"} />
      </div>
      <h3>{accessory.title}</h3>
      <h4>Only: $ {accessory.price}</h4>
      <button
        className={"accessory__heart-btn"}
        onClick={(e) => handleLike(e)}
        aria-label="Like Accessory"
      >
        <img
          src={
            likedInner
              ? "/assets/svg/heart-dark.svg"
              : "/assets/svg/heart-half-dark.svg"
          }
          alt=""
          loading={"lazy"}
        />
        <span>{likes}</span>
      </button>

      <button
        aria-label="Add to Wishlist"
        onClick={handleWishlist}
        className={"accessory__wishlist-btn"}
      ></button>

      <button
        onClick={handleBasket}
        className={"accessory__basket-btn"}
        aria-label="Add to Basket"
      >
        <img
          src={
            bContext.isInBasket(accessory.id)
              ? "/assets/svg/basket_clicked.svg"
              : "/assets/svg/basket_unclicked.svg"
          }
          alt=""
          loading={"lazy"}
        />
      </button>
      {width <= 1100 ? (
        <div
          className="accessory__options"
        >
          <button
            aria-label="Like Product"
            className={"accessory__heart-btn "}
            onClick={(e) => handleLike(e)}
          >
            <img
              src={
                likedInner
                  ? "/assets/svg/heart-dark.svg"
                  : "/assets/svg/heart-half-dark.svg"
              }
              alt=""
              loading={"lazy"}
            />
            <span>{likes}</span>
          </button>
          <button
            aria-label="Add to Wishlist"
            onClick={handleWishlist}
            className={"accessory__wishlist-btn"}
          ></button>
          <button
            onClick={handleBasket}
            className={"accessory__basket-btn"}
            aria-label="Add to Basket"
          >
            <img
              src={
                bContext.isInBasket(accessory.id)
                  ? "/assets/svg/basket_clicked.svg"
                  : "/assets/svg/basket_unclicked.svg"
              }
              alt=""
              loading={"lazy"}
            />
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default React.memo(Accessory);
