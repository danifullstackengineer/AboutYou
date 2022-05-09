import { Link } from "react-router-dom";
import "../../../../styles/components/Checkout/CheckoutBody/Basket/CheckoutBodyBasketOrder.css";
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import React, { useContext, useEffect, useState } from "react";
import { BasketContext } from "../../../../Context/Basket";

function CheckoutBodyBasketOrder({ payment }: { payment?: boolean }) {
  const [changedAmount, setChangedAmount] = useState<boolean[]>();

  const bContext = useContext(BasketContext);

  return (
    <div
      className={`checkoutBodyBasketOrder ${
        payment ? "checkoutBodyBasketOrder-payment" : ""
      }`}
    >
      {!payment ? <h2>Your order</h2> : ""}
      {bContext.product.length === 0 ? (
        <div className={"checkoutBodyBasketOrder-empty"}>
          <h3>Your basket is empty!</h3>
          <Link to="/">Continue shopping</Link>
        </div>
      ) : (
        bContext.product?.map((item, i) => {
          return (
            <div
              key={i}
              className={`checkoutBodyBasketOrder__item ${
                changedAmount
                  ? changedAmount[i]
                    ? "checkoutBodyBasketOrder__item-loading"
                    : ""
                  : ""
              }`}
            >
              <img
                src={item.backgroundImg + "1.jpg"}
                alt={""}
                loading={"lazy"}
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
                            <span>
                              {/* <span onClick={() => handleItemIncrease(item, i)}> */}
                              <IoMdArrowDropup />
                            </span>
                            <span>
                              {/* <span onClick={() => handleItemDecrease(item, i)}> */}
                              <IoMdArrowDropdown />
                            </span>
                          </div>
                        </div>
                      </div>
                      <button>
                        {/* <button onClick={() => removeItemFromBasketStorage(item)}> */}
                        Remove item
                      </button>
                    </div>
                  )}
                </div>
                {/* <div className="checkoutBodyBasketOrder__info-lower">
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
              </div> */}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default React.memo(CheckoutBodyBasketOrder);
