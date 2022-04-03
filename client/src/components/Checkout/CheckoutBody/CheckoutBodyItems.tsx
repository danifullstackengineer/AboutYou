import React, { useEffect, useState } from "react";
import { getBasketItemsStorage } from "../../../Logic/localStorage/basket";
import CheckoutBodyBasketOrder from "./Basket/CheckoutBodyBasketOrder";
import CheckoutBodyBasketTotal from "./Basket/CheckoutBodyBasketTotal";

function CheckoutBodyItems({
  setAmount,
}: {
  setAmount: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [basket, setBasket] = useState<
    {
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
  >();

  useEffect(() => {
    const items = getBasketItemsStorage();
    if (items) {
      setBasket(items);
    }
  }, []);

  return (
    <div className="checkoutBodyItems">
      <CheckoutBodyBasketOrder basket={basket} />
      <CheckoutBodyBasketTotal basket={basket} setAmount={setAmount} />
    </div>
  );
}

export default CheckoutBodyItems;
