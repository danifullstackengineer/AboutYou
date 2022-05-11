import React, { useCallback, useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { BasketContext } from "../Context/Basket";
import { WishlistContext } from "../Context/Wishlist";
import "../styles/Comp-Single/MenuExtended.css";

const MenuExtended = ({
  basket_active,
  wishlist_active,
  menuExtendedRef,
}: {
  basket_active: boolean;
  wishlist_active: boolean;
  menuExtendedRef: React.RefObject<HTMLDivElement>;
}) => {
  const bContext = useContext(BasketContext);
  const wContext = useContext(WishlistContext);

  const wishlistRef = useRef<HTMLDivElement>(null);

  const [clickedSubtractBasket, setClickedSubtractBasket] = useState<boolean[]>(
    []
  );
  const [clickedSubtractWishlist, setClickedSubtractWishlist] = useState<
    boolean[]
  >([]);

  useEffect(() => {
    if (bContext.product.length > 0) {
      var arr: boolean[] = [];

      bContext.product.forEach(() => arr.push(false));
      setClickedSubtractBasket(arr);
    }
  }, []);

  useEffect(() => {
    if (wContext.product.length > 0) {
      var arr: boolean[] = [];

      wContext.product.forEach(() => arr.push(false));
      setClickedSubtractWishlist(arr);
    }
  }, []);

  const handleWishlistRemove = (id: string, index: number): void => {};
  const handleBasketRemove = (id: string, index: number): void => {};

  useEffect(() => {
      if (menuExtendedRef.current) {
        console.log("hello!")
      menuExtendedRef.current.scrollTo(0, menuExtendedRef.current.offsetHeight);
    }
  }, [bContext, menuExtendedRef]);

  return (
    <div className={`menuExtended`}>
      {bContext.product.length > 0 && basket_active ? (
        <div className={`menuExtended__options`}>
          <h3>Basket</h3>
          {bContext.product.map((product, i) => {
            return (
              <div className="menuExtended__options-option" key={i}>
                <div className="menuExtended__options-option__left">
                  <span>{product.title}</span>
                  <img
                    src={
                      product.dark ? product.backgroundImg : product.backgroundImg + "1.jpg"
                    }
                    alt=""
                    loading="lazy"
                  />
                </div>
                <div className="menuExtended__options-option__right">
                  <span>
                    Price: ${(product.price * product.quantity).toFixed(2)}
                  </span>
                  <span>Quantity: {product.quantity}</span>
                  <div className="menuExtended__options-option__right-btns">
                    <button
                      type="button"
                      onClick={() => bContext.addToBasket(product)}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => handleBasketRemove(product.id, i)}
                    >
                      -
                    </button>
                  </div>
                  <div className="menuExtended__options-option__right-btns-remove">
                    <button type="button">Remove</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
      {wContext.product.length > 0 && wishlist_active ? (
        <div className={`menuExtended__options`} ref={wishlistRef}>
          <h3>Wishlist</h3>
          {wContext.product.map((product, i) => {
            return (
              <div className="menuExtended__options-option" key={i}>
                <div className="menuExtended__options-option__left">
                  <span>{product.title}</span>
                  <img
                    src={
                      product.dark ? product.backgroundImg : product.backgroundImg + "1.jpg"
                    }
                    alt=""
                    loading="lazy"
                  />
                </div>
                <div className="menuExtended__options-option__right">
                  <span>Price: ${product.price}</span>
                  <span>Quantity: {product.quantity}</span>
                  <div className="menuExtended__options-option-left-btns">
                    <button
                      type="button"
                      onClick={() => handleWishlistRemove(product.id, i)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default React.memo(MenuExtended);
