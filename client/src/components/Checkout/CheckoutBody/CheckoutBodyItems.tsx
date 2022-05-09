import React, { useEffect, useState } from "react";
import { getBasketItemsStorage } from "../../../Logic/localStorage/basket";
import CheckoutBodyBasketOrder from "./Basket/CheckoutBodyBasketOrder";
import CheckoutBodyBasketTotal from "./Basket/CheckoutBodyBasketTotal";

function CheckoutBodyItems({
  setAmount,
}: {
  setAmount: React.Dispatch<React.SetStateAction<string>>;
}) {
  

  return (
    <div className="checkoutBodyItems">
      <CheckoutBodyBasketOrder/>
      <CheckoutBodyBasketTotal  setAmount={setAmount} />
    </div>
  );
}

export default CheckoutBodyItems;
