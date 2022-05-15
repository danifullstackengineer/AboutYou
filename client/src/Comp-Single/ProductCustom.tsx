import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import {
  getIfLikedProductByUserAndTotalLikes,
  setLikedProduct,
} from "../Apollo/Products";
import { AuthContext } from "../Context/Auth";
import { BasketContext } from "../Context/Basket";
import { WishlistContext } from "../Context/Wishlist";
import { useWindowDimensions } from "../Hooks/Viewport";
import "../styles/Comp-Single/ProductCustom.css";
import { ProductType } from "../types/Product";

const ProductCustom = ({
  product,
  dark,
  handleChangeProduct360,
  clickedMenu,
  setClickedMenu,
  setClickedBasket,
  clickedBasket,
  handleOpening,
  setClickedLogin,
  setClickedWishlist,
  clickedWishlist,
  loading_img,
}: {
  product: ProductType;
  dark?: boolean;
  handleChangeProduct360?: (product: ProductType) => void;
  clickedMenu?: boolean;
  setClickedBasket?: React.Dispatch<React.SetStateAction<boolean>>;
  setClickedMenu?: React.Dispatch<React.SetStateAction<boolean>>;
  clickedBasket?: boolean;
  handleOpening?: (type: "user" | "wishlist" | "basket" | "language") => void;
  setClickedLogin?: React.Dispatch<React.SetStateAction<boolean>>;
  setClickedWishlist?: React.Dispatch<React.SetStateAction<boolean>>;
  clickedWishlist?: boolean;
  loading_img: "lazy" | "eager";
}) => {
  const [likedInner, setLikedInner] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);

  const { width } = useWindowDimensions();

  const bContext = useContext(BasketContext);
  const aContext = useContext(AuthContext);
  const wContext = useContext(WishlistContext);

  const [
    getLikesAndIfLiked,
    { data: dataL, error: errorL, loading: loadingL },
  ] = useLazyQuery(getIfLikedProductByUserAndTotalLikes, {
    variables: {
      id: aContext.userId,
      product_id: product.id,
    },
  });

  useEffect(() => {
    if (product.id && dark) {
      getLikesAndIfLiked();
    }
  }, [aContext, product.id, dark]);

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
        likedId: product.id,
        liked: !likedInner,
      },
    }
  );

  const handleLike = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    if (!loading) {
      e.stopPropagation();
      if (!aContext.isLoggedIn && setClickedLogin) {
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
  const handleWishlist = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.stopPropagation();
    if (!aContext.isLoggedIn && setClickedLogin) {
      setClickedLogin(true);
    } else {
      if (wContext.isInWishlist(product.id)) {
        wContext.removeFromWishlist(product.id);
      } else {
        wContext.addToWishlist(product);
      }
      if (!clickedMenu && setClickedMenu && setClickedWishlist) {
        setClickedMenu(true);
        setTimeout(() => {
          setClickedWishlist(true);
        }, 150);
      } else {
        if (!clickedWishlist && handleOpening) {
          handleOpening("wishlist");
        }
      }
    }
  };
  const handleBasket = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.stopPropagation();
    if (bContext.isInBasket(product.id)) {
      bContext.removeFromBasket(product.id);
    } else {
      bContext.addToBasket(product);
    }
    if (!clickedMenu && setClickedBasket && setClickedMenu) {
      setClickedMenu(true);
      setTimeout(() => {
        setClickedBasket(true);
      }, 150);
    } else {
      if (!clickedBasket && handleOpening) {
        handleOpening("basket");
      }
    }
  };

  useEffect(() => {
    //TODO: handle errors;
  }, [errorL]);

  return (
    <div
      onClick={() =>
        handleChangeProduct360 ? handleChangeProduct360(product) : undefined
      }
      className={`productCustom ${
        dark ? "productCustom-dark" : "productCustom-light"
      }`}
    >
      <div className={`productCustom__img`}>
        <img
          src={!dark ? product.backgroundImg + "1.jpg" : product.backgroundImg}
          alt={""}
          loading={loading_img}
        />
      </div>
      <h3>{product.title}</h3>
      <h4>
        <span>Only: </span>$ {product.price}
      </h4>
      {!dark ? (
        <button
          className={"productCustom__customize-btn"}
          onClick={() =>
            handleChangeProduct360 ? handleChangeProduct360(product) : undefined
          }
        >
          Customize!
        </button>
      ) : (
        ""
      )}
      {dark ? (
        <button
          aria-label="Like Product"
          className={"productCustom__heart-btn"}
          onClick={(e) => handleLike(e)}
        >
          <img
            src={
              likedInner
                ? "/assets/svg/heart-dark.svg"
                : "/assets/svg/heart-half-dark.svg"
            }
            alt=""
            loading={loading_img}
          />
          <span>{likes}</span>
        </button>
      ) : (
        ""
      )}
      {dark ? (
        <button
          aria-label="Add to Wishlist"
          onClick={handleWishlist}
          className={"productCustom__wishlist-btn"}
        ></button>
      ) : (
        ""
      )}
      {dark ? (
        <button
          onClick={handleBasket}
          className={"productCustom__basket-btn"}
          aria-label="Add to Basket"
        >
          <img
            src={
              bContext.isInBasket(product.id)
                ? "/assets/svg/basket_clicked.svg"
                : "/assets/svg/basket_unclicked.svg"
            }
            alt=""
            loading={loading_img}
          />
        </button>
      ) : (
        ""
      )}
      {width <= 1100 && dark ? (
        <div className="productCustom__options">
          <button
            aria-label="Like Product"
            className={"productCustom__heart-btn "}
            onClick={(e) => handleLike(e)}
          >
            <img
              src={
                likedInner
                  ? "/assets/svg/heart-dark.svg"
                  : "/assets/svg/heart-half-dark.svg"
              }
              alt=""
              loading={loading_img}
            />
            <span>{likes}</span>
          </button>
          <button
            aria-label="Add to Wishlist"
            onClick={handleWishlist}
            className={"productCustom__wishlist-btn"}
          ></button>
          <button
            onClick={handleBasket}
            className={"productCustom__basket-btn"}
            aria-label="Add to Basket"
          >
            <img
              src={
                bContext.isInBasket(product.id)
                  ? "/assets/svg/basket_clicked.svg"
                  : "/assets/svg/basket_unclicked.svg"
              }
              alt=""
              loading={loading_img}
            />
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default React.memo(ProductCustom);
