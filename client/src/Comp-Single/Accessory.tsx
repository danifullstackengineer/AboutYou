import { useLazyQuery, useMutation } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import {
  getIfLikedAccessoryByUserAndTotalLikes,
  setLikedAccessory,
} from "../Apollo/Accessory";
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
  const [likes, setLikes] = useState<number>(accessory.likes);

  const [
    getLikesAndIfLiked,
    { data: dataL, error: errorL, loading: loadingL },
  ] = useLazyQuery(getIfLikedAccessoryByUserAndTotalLikes);

  const wContext = useContext(WishlistContext);
  const bContext = useContext(BasketContext);
  const aContext = useContext(AuthContext);

  useEffect(() => {
    if (accessory._id) {
      getLikesAndIfLiked({
        variables: {
          id: aContext.userId,
          accessory_id: accessory._id,
        },
      });
    }
  }, [aContext, accessory._id]);

  useEffect(() => {
    if (dataL) {
      setLikes(dataL.getIfLikedAccessoryByUserAndTotalLikes.likes);
      setLikedInner(dataL.getIfLikedAccessoryByUserAndTotalLikes.liked);
    }
  }, [dataL]);

  const [likedMutation, { loading, data, error }] = useMutation(
    setLikedAccessory,
    {
      variables: {
        id: aContext.userId,
        likedId: accessory._id,
        liked: !likedInner,
      },
    }
  );

  const handleLike = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    if (!loading) {
      e.stopPropagation();
      if (!aContext.isLoggedIn) {
        setClickedLogin(true);
      } else {
        likedMutation().then(() => {
          if (!loading) {
            if (likedInner) {
              setLikes(likes - 1);
            } else {
              setLikes(likes + 1);
            }
            setLikedInner(!likedInner);
          }
        });
      }
    }
  };
  const handleBasket = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.stopPropagation();
    if (bContext.isInBasket(accessory._id)) {
      bContext.removeFromBasket(accessory._id);
    } else {
      bContext.addToBasket({
        ...accessory,
        quantity: 0,
        selectedSize: undefined,
        selectedColor: undefined,
        selectedAccessory: undefined,
        customStyle: undefined,
      });
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
      if (wContext.isInWishlist(accessory._id)) {
        wContext.removeFromWishlist(accessory._id);
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
        <img src={accessory.backgroundImg} alt={""} />
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
            likedInner ? "/assets/svg/heart.svg" : "/assets/svg/heart-half.svg"
          }
          alt=""
        />
        <span>{likes}</span>
      </button>

      <button
        aria-label="Add to Wishlist"
        onClick={handleWishlist}
        className={`accessory__wishlist-btn ${
          wContext.isInWishlist(accessory._id)
            ? "accessory__wishlist-btn-clicked"
            : ""
        }`}
      ></button>

      <button
        onClick={handleBasket}
        className={"accessory__basket-btn"}
        aria-label="Add to Basket"
      >
        <img
          src={
            bContext.isInBasket(accessory._id)
              ? "/assets/svg/basket_clicked.svg"
              : "/assets/svg/basket_unclicked.svg"
          }
          alt=""
        />
      </button>
      {width <= 1100 ? (
        <div className="accessory__options">
          <button
            aria-label="Like Product"
            className={"accessory__heart-btn "}
            onClick={(e) => handleLike(e)}
          >
            <img
              src={
                likedInner
                  ? "/assets/svg/heart.svg"
                  : "/assets/svg/heart-half.svg"
              }
              alt=""
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
                bContext.isInBasket(accessory._id)
                  ? "/assets/svg/basket_clicked.svg"
                  : "/assets/svg/basket_unclicked.svg"
              }
              alt=""
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
