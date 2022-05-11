import React, { useEffect, useState } from "react";
import CheckoutBodyBasketOrder from "./Basket/CheckoutBodyBasketOrder";
import CheckoutBodyBasketTotal from "./Basket/CheckoutBodyBasketTotal";

function CheckoutBodyItems({
  setAmount,
}: {
  setAmount: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div
      className="checkoutBodyItems"
    >
      <CheckoutBodyBasketOrder />
      <CheckoutBodyBasketTotal setAmount={setAmount} />
    </div>
  );
}

export default React.memo(CheckoutBodyItems);
