import { Link } from "react-router-dom";
import "../../../../styles/components/Checkout/CheckoutBody/Basket/CheckoutBodyBasketOrder.css";
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import React, { useContext, useEffect, useState } from "react";
import { BasketContext, ExtendedProductType } from "../../../../Context/Basket";

function CheckoutBodyBasketOrder({ payment }: { payment?: boolean }) {
  const [changedAmount, setChangedAmount] = useState<boolean[]>();

  const bContext = useContext(BasketContext);

  const [clickedEdit, setClickedEdit] = useState<boolean>(false);

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
                src={
                  item.dark ? item.backgroundImg : item.backgroundImg + "1.jpg"
                }
                alt={""}
                loading={"lazy"}
              />
              <div className="checkoutBodyBasketOrder__info">
                <div className="checkoutBodyBasketOrder__info-upper">
                  <div className="checkoutBodyBasketOrder__info-upper-left">
                    <h5>{item.title}</h5>
                    {/* <span>
                      Color: {item.selectedColor ? item.selectedColor : ""}
                    </span> */}
                    {item.selectedColor ? (
                      <span>Color: {item.selectedColor}</span>
                    ) : (
                      ""
                    )}
                    <span>Size: S</span>
                    {!payment ? <span>Quantity: {item.quantity}</span> : ""}
                  </div>
                  {!payment ? (
                    <button onClick={() => setClickedEdit(true)}>Edit</button>
                  ) : (
                    <div className="checkoutBodyBasketOrder__modify-amount">
                      <span>Amount:</span>
                      <div>
                        <div>
                          <span>{item.quantity}</span>
                          <div>
                            <span onClick={() => bContext.addToBasket(item)}>
                              <IoMdArrowDropup />
                            </span>
                            <span
                              onClick={() => bContext.decrementProduct(item.id)}
                            >
                              <IoMdArrowDropdown />
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => bContext.removeFromBasket(item.id)}
                      >
                        Remove item
                      </button>
                    </div>
                  )}
                </div>
                <div className="checkoutBodyBasketOrder__info-lower">
                  <span></span>
                  <span></span>
                  <span className="checkoutBodyBasketOrder__info-lower-nored">
                    $ {(item.quantity * item.price).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default React.memo(CheckoutBodyBasketOrder);
