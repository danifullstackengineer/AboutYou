import React, { useEffect, useState } from "react";
import { AccessoryTypeBasket } from "../../../types/Accessory";
import { ProductTypeBasket } from "../../../types/Product";
import CheckoutBodyBasketOrder from "./Basket/CheckoutBodyBasketOrder";
import CheckoutBodyBasketTotal from "./Basket/CheckoutBodyBasketTotal";

function CheckoutBodyItems({
  setAmount,
  setBasket,
  setHasAllFieldsReady,
}: {
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  setBasket?: React.Dispatch<
    React.SetStateAction<ProductTypeBasket[] | AccessoryTypeBasket[]>
  >;
  setHasAllFieldsReady: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="checkoutBodyItems">
      <CheckoutBodyBasketOrder setBasket={setBasket} setHasAllFieldsReady={setHasAllFieldsReady}/>
      <CheckoutBodyBasketTotal setAmount={setAmount} />
    </div>
  );
}

export default React.memo(CheckoutBodyItems);
