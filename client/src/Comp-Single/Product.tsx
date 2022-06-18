import React, { useContext, useEffect, useRef, useState } from "react";
import { ProductType } from "../types/Product";
import "../styles/Comp-Single/Product.css";
import { BasketContext } from "../Context/Basket";
import { WishlistContext } from "../Context/Wishlist";
import { AuthContext } from "../Context/Auth";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  getIfLikedProductByUserAndTotalLikes,
  setLikedProduct,
} from "../Apollo/Products";

const Product = ({
  product,
  setClickedLogin,
  setClickedMenu,
  clickedMenu,
  setClickedBasket,
  setClickedWishlist,
  handleOpening,
  clickedBasket,
  clickedWishlist,
  refProduct,
}: {
  product: ProductType;
  setClickedLogin: React.Dispatch<React.SetStateAction<boolean>>;
  clickedMenu: boolean;
  setClickedBasket: React.Dispatch<React.SetStateAction<boolean>>;
  setClickedWishlist: React.Dispatch<React.SetStateAction<boolean>>;
  setClickedMenu: React.Dispatch<React.SetStateAction<boolean>>;
  clickedBasket: boolean;
  clickedWishlist: boolean;
  handleOpening: (type: "user" | "wishlist" | "basket" | "language") => void;
  refProduct?: React.RefObject<HTMLDivElement>;
}) => {
  const bContext = useContext(BasketContext);
  const wContext = useContext(WishlistContext);
  const aContext = useContext(AuthContext);

  const [likedInner, setLikedInner] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(product.likes);

  const [
    getLikesAndIfLiked,
    { data: dataL, error: errorL, loading: loadingL },
  ] = useLazyQuery(getIfLikedProductByUserAndTotalLikes, {
    variables: {
      id: aContext.userId,
      product_id: product._id,
    },
  });

  useEffect(() => {
    if (product._id) {
      getLikesAndIfLiked();
    }
  }, [aContext, product._id]);

  useEffect(() => {
    if (dataL) {
      setLikes(dataL.getIfLikedProductByUserAndTotalLikes.likes);
      setLikedInner(dataL.getIfLikedProductByUserAndTotalLikes.liked);
    }
  }, [dataL]);

  const [likedMutation, { loading, data, error }] = useMutation(
    setLikedProduct,
    {
      variables: {
        id: aContext.userId,
        likedId: product._id,
        liked: !likedInner,
      },
    }
  );
  const handleBasket = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    e.stopPropagation();
    if (bContext.isInBasket(product._id)) {
      bContext.removeFromBasket(product._id);
    } else {
      bContext.addToBasket({
        ...product,
        quantity: 1,
        selectedSize: undefined,
        selectedColor: undefined,
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
      if (wContext.isInWishlist(product._id)) {
        wContext.removeFromWishlist(product._id);
      } else {
        wContext.addToWishlist(product);
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
    }
  };

  const handleLike = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
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


  return (
    <div className={`product`} ref={refProduct}>
      <div className={`product__img`}>
        <img src={product.backgroundImg + "1.jpg"} alt={""} loading={"lazy"} />
        <img src={product.foregroundImg + "10.jpg"} alt={""} loading={"lazy"} />
      </div>
      <h3>{product.title}</h3>
      <div className="product__btns">
        <div className="product__btns-heart" onClick={handleLike}>
          <img
            src={
              likedInner
                ? "/assets/svg/heart.svg"
                : "/assets/svg/heart-half.svg"
            }
            alt=""
            loading={"lazy"}
          />
          <span>{likes}</span>
        </div>
        <button
          aria-label="Add to Wishlist"
          onClick={(e) => handleWishlist(e)}
          className={
            wContext.isInWishlist(product._id)
              ? "product__btns-wishlist-clicked"
              : ""
          }
        ></button>
        <div className="product__btns-basket" onClick={(e) => handleBasket(e)}>
          <img
            src={
              bContext.isInBasket(product._id)
                ? "/assets/svg/basket_clicked.svg"
                : "/assets/svg/basket_unclicked.svg"
            }
            alt=""
            loading={"lazy"}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Product);
