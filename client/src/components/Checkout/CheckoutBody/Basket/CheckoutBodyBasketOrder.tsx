import { useState } from "react";
import { Link } from "react-router-dom";
import "../../../../styles/components/Checkout/CheckoutBody/Basket/CheckoutBodyBasketOrder.css";

function CheckoutBodyBasketOrder({
  basket,
}: {
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
}) {

  return (
    <div className="checkoutBodyBasketOrder">
      <h2>Your order</h2>
      {basket?.map((item, i) => {
        return (
          <div key={i} className="checkoutBodyBasketOrder__item">
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
                  <span>Quantity: {item.quantity}</span>
                </div>
                <Link to="/">Edit</Link>
              </div>
              <div className="checkoutBodyBasketOrder__info-lower">
                {item.price ? (
                  <>
                    <span></span>
                    <span></span>
                    <span>$ {(item.quantity * parseFloat(item.price) ).toFixed(2)}</span>
                    
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
