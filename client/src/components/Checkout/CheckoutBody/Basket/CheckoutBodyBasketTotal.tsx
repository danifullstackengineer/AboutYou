import { useLazyQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { BasketContext } from "../../../../Context/Basket";
import { getTotalBasketPrice } from "../../../../Logic/basket";
import "../../../../styles/components/Checkout/CheckoutBody/Basket/CheckoutBodyBasketTotal.css";

function CheckoutBodyBasketTotal({
  setAmount,
  payment,
}: {
  setAmount?: React.Dispatch<React.SetStateAction<string>>;
  payment?: true;
}) {

  const bContext = useContext(BasketContext);

  return (
    <div className="checkoutBodyBasketTotal">
      <div className="checkoutBodyBasketTotal__upper">
        <h5>Shopping fees</h5>
        <h5>$ 0.00</h5>
      </div>
      <div className="checkoutBodyBasketTotal__lower">
        <h3>Total sum</h3>
        <h3>$ {getTotalBasketPrice(bContext.product)}</h3>
      </div>
    </div>
  );
}

export default React.memo(CheckoutBodyBasketTotal);
