import React, { useEffect, useRef, useState } from "react";
import "../../../../styles/components/Checkout/CheckoutBody/Basket/CheckoutBodyBasketTotal.css";

function CheckoutBodyBasketTotal({
  basket,
  setAmount,
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
        quantity: number;
      }[]
    | undefined;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [discount, setDiscount] = useState<number>(10);
  const getTotalAfterDiscount = (
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
          quantity: number;
        }[]
      | undefined
  ) => {
    if (basket) {
      var total = 0;
      for (let i = 0; i < basket.length; i++) {
        if (basket[i].price) {
          total += basket[i].quantity * parseFloat(basket[i].price);
        } else {
          total +=
            basket[i].quantity * parseFloat(basket[i].priceDiscount.discount);
        }
      }
      return total.toFixed(2);
    } else {
      return "0.00";
    }
  };

  useEffect(() => {
    if (basket) {
      setAmount(getTotalAfterDiscount(basket));
    }
  }, [basket]);

  return (
    <div className="checkoutBodyBasketTotal">
      <div className="checkoutBodyBasketTotal__upper">
        <h5>Shopping fees</h5>
        <h5>$ 0.00</h5>
      </div>
      <div className="checkoutBodyBasketTotal__lower">
        <h3>Total sum</h3>
        <h3>{getTotalAfterDiscount(basket)}</h3>
      </div>
    </div>
  );
}

export default CheckoutBodyBasketTotal;
