import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/Auth";
import { BasketContext } from "../Context/Basket";
import { WishlistContext } from "../Context/Wishlist";
import "../styles/Comp-Single/Accessory.css";
import { AccessoryType } from "../types/Accessory";

const Accessory = ({ accessory }: { accessory: AccessoryType }) => {
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
  ): void => {};
  const handleWishlist = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {};

  return (
    <div className={`accessory`}>
      <div className={`accessory__img`}>
        <img src={accessory.image} alt={""} loading={"lazy"} />
      </div>
      <h3>{accessory.title}</h3>
      <h4>Only: $ {accessory.price}</h4>
      <button className={"accessory__heart-btn"} onClick={(e) => handleLike(e)} aria-label="Like Accessory">
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

      <button onClick={handleBasket} className={"accessory__basket-btn"} aria-label="Add to Basket">
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
  );
};

export default React.memo(Accessory);
