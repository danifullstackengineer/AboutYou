import { Link } from "react-router-dom";
import "../../../../styles/components/Checkout/CheckoutBody/Basket/CheckoutBodyBasketOrder.css";
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import {
  decreaseItemQuantity,
  increaseItemQuantity,
  removeItemFromBasketStorage,
} from "../../../../Logic/localStorage/basket";
import React, { useEffect, useState } from "react";

function CheckoutBodyBasketOrder({
  basket,
  payment,
  setChangedBasket,
  changedBasket,
}: {
  payment?: boolean;
  basket:
    | {
        backgroundImg: string;
        foregroundImg?: string | undefined;
        tags?:
          | {
              name: string;
              special?: boolean | undefined;
            }[]
          | undefined;
        title: string;
        price: string;
        priceDiscount: { full: string; discount: string };
        colors: string[];
        sizes?: string[] | undefined;
        id: string;
        quantity: number;
      }[]
    | undefined;
  setChangedBasket?: React.Dispatch<React.SetStateAction<number>>;
  changedBasket?: number;
}) {
  const [changedAmount, setChangedAmount] = useState<boolean[]>();

  useEffect(() => {
    if (basket && !changedAmount) {
      var arr = []
      for (let i = 0; i < basket.length; i++){
        arr.push(false)
      }
      setChangedAmount(arr)
    }
  }, [basket])

  const handleItemIncrease = (
    item: {
      backgroundImg: string;
      foregroundImg?: string | undefined;
      tags?:
        | {
            name: string;
            special?: boolean | undefined;
          }[]
        | undefined;
      title: string;
      price: string;
      priceDiscount: { full: string; discount: string };
      colors: string[];
      sizes?: string[] | undefined;
      id: string;
      quantity: number;
    },
    index: number
  ): void => {
    if (changedAmount && !changedAmount[index]) {
      var arr = [];
      for (let i = 0; i < changedAmount.length; i++) {
        if (i === index) {
          arr.push(true);
        } else {
          arr.push(false);
        }
      }
      setChangedAmount(arr);
      increaseItemQuantity(item);
      setTimeout(() => {
        var arr2 = [];
        for (let i = 0; i < changedAmount.length; i++) {
          arr2.push(false);
        }
        setChangedAmount(arr2);
      }, 1000);
    }
  };
  const handleItemDecrease = (
    item: {
      backgroundImg: string;
      foregroundImg?: string | undefined;
      tags?:
        | {
            name: string;
            special?: boolean | undefined;
          }[]
        | undefined;
      title: string;
      price: string;
      priceDiscount: { full: string; discount: string };
      colors: string[];
      sizes?: string[] | undefined;
      id: string;
      quantity: number;
    },
    index: number
  ): void => {
    if (changedAmount && !changedAmount[index]) {
      var arr = [];
      for (let i = 0; i < changedAmount.length; i++) {
        if (i === index) {
          arr.push(true);
        } else {
          arr.push(false);
        }
      }
      setChangedAmount(arr);
      decreaseItemQuantity(item);
      setTimeout(() => {
        var arr2 = [];
        for (let i = 0; i < changedAmount.length; i++) {
          arr2.push(false);
        }
        setChangedAmount(arr2);
      }, 1000);
    }
  };

  useEffect(() => {
    window.addEventListener("basket", () => {
      if (changedBasket && setChangedBasket) {
        if (setChangedBasket) {
          setChangedBasket(changedBasket + 1);
        }
      }
    });
    return () => window.removeEventListener("basket", () => {});
  }, [changedBasket]);

  return (
    <div
      className={`checkoutBodyBasketOrder ${
        payment ? "checkoutBodyBasketOrder-payment" : ""
      }`}
    >
      {!payment ? <h2>Your order</h2> : ""}
      {basket?.map((item, i) => {
        return (
          <div
            key={i}
            className={`checkoutBodyBasketOrder__item ${
              changedAmount ? changedAmount[i] ? "checkoutBodyBasketOrder__item-loading" : "" : ""
            }`}
          >
            <img
              src={item.foregroundImg ? item.foregroundImg : item.backgroundImg}
              alt={item.foregroundImg ? item.foregroundImg : item.backgroundImg}
            />
            <div className="checkoutBodyBasketOrder__info">
              <div className="checkoutBodyBasketOrder__info-upper">
                <div className="checkoutBodyBasketOrder__info-upper-left">
                  <Link to="">{item.title}</Link>
                  <span>Color: Black &amp; White</span>
                  <span>Size: S</span>
                  {!payment ? <span>Quantity: {item.quantity}</span> : ""}
                </div>
                {!payment ? (
                  <Link to="/">Edit</Link>
                ) : (
                  <div className="checkoutBodyBasketOrder__modify-amount">
                    <span>Amount:</span>
                    <div>
                      <div>
                        <span>{item.quantity}</span>
                        <div>
                          <span onClick={() => handleItemIncrease(item, i)}>
                            <IoMdArrowDropup />
                          </span>
                          <span onClick={() => handleItemDecrease(item, i)}>
                            <IoMdArrowDropdown />
                          </span>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => removeItemFromBasketStorage(item)}>
                      Remove item
                    </button>
                  </div>
                )}
              </div>
              <div className="checkoutBodyBasketOrder__info-lower">
                {item.price ? (
                  <>
                    <span></span>
                    <span></span>
                    <span className="checkoutBodyBasketOrder__info-lower-nored">
                      $ {(item.quantity * parseFloat(item.price)).toFixed(2)}
                    </span>
                  </>
                ) : (
                  <>
                    <span>
                      ${" "}
                      {(
                        parseFloat(item.priceDiscount.full) * item.quantity
                      ).toFixed(2)}
                    </span>
                    <span>
                      - ${" "}
                      {(
                        item.quantity *
                        (parseFloat(item.priceDiscount.full) -
                          parseFloat(item.priceDiscount.discount))
                      ).toFixed(2)}
                    </span>
                    <span>
                      ${" "}
                      {(
                        item.quantity * parseFloat(item.priceDiscount.discount)
                      ).toFixed(2)}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CheckoutBodyBasketOrder;
