import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/Auth";
import { BasketContext } from "../Context/Basket";
import { WishlistContext } from "../Context/Wishlist";
import "../styles/Comp-Single/ProductCustom.css";
import { ProductType } from "../types/Product";

const ProductCustom = ({
  product,
  dark,
  handleChangeProduct360,
}: {
  product: ProductType;
  dark?: boolean;
  handleChangeProduct360?: (product: ProductType) => void;
}) => {

  const [likedInner, setLikedInner] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);

  const bContext = useContext(BasketContext);
  const aContext = useContext(AuthContext);
  const wContext = useContext(WishlistContext);

  const handleLike = (): void => {};
  const handleWishlist = (): void => {};
  const handleBasket = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.stopPropagation();
    if(bContext.isInBasket(product.id)) {
      bContext.removeFromBasket(product.id);
    }else{
      bContext.addToBasket(product);
    }
  };


  return (
    <div
      className={`productCustom ${
        dark ? "productCustom-dark" : "productCustom-light"
      }`}
    >
      <div className={`productCustom__img`}>
        <img
          src={!dark ? product.backgroundImg + "1.jpg" : product.backgroundImg}
          alt={""}
          loading={"lazy"}
        />
      </div>
      <h3>{product.title}</h3>
      <h4>Only: $ {product.price}</h4>
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
        <button className={"productCustom__heart-btn"} onClick={handleLike}>
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
      ) : (
        ""
      )}
      {dark ? (
        <button
          onClick={handleWishlist}
          className={"productCustom__wishlist-btn"}
        ></button>
      ) : (
        ""
      )}
      {dark ? (
        <button onClick={handleBasket} className={"productCustom__basket-btn"}>
          <img
            src={
              bContext.isInBasket(product.id)
                ? "/assets/svg/basket_clicked.svg"
                : "/assets/svg/basket_unclicked.svg"
            }
            alt=""
            loading={"lazy"}
          />
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default React.memo(ProductCustom);
