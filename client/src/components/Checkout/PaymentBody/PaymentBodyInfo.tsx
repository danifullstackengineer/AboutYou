import React, { useEffect, useState } from "react";
import "../../../styles/components/Checkout/PaymentBody/PaymentBodyInfo.css";
import PaymentBodyInfoAddress from "./PaymentBodyInfo/PaymentBodyInfoAddress";
import PaymentBodyInfoCardPayment from "./PaymentBodyInfo/PaymentBodyInfoCardPayment";
import PaymentBodyInfoPhoneNumber from "./PaymentBodyInfo/PaymentBodyInfoPhoneNumber";
import PaymentBodyInfoSubscribe from "./PaymentBodyInfo/PaymentBodyInfoSubscribe";
import { StripeCardElement } from "@stripe/stripe-js";
import { getBasketItemsStorage } from "../../../Logic/localStorage/basket";
import CheckoutBodyBasketOrder from "../CheckoutBody/Basket/CheckoutBodyBasketOrder";
import CheckoutBodyBasketTotal from "../CheckoutBody/Basket/CheckoutBodyBasketTotal";

function PaymentBodyInfo({
  isCardPayment,
  setCardElement,
  setAmount,
}: {
  isCardPayment: boolean;
  setCardElement: React.Dispatch<
    React.SetStateAction<StripeCardElement | null | undefined>
  >;
  setAmount?: React.Dispatch<React.SetStateAction<string>>;
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

  const [changedBasket, setChangedBasket] = useState<number>(1);

  useEffect(() => {
    const items = getBasketItemsStorage();
    if (items) {
      setBasket(items);
    }
    return () => setBasket(basket);
  }, [changedBasket]);

  return (
    <div className="paymentBodyInfo">
      <PaymentBodyInfoAddress />
      <span>Delivery estimated between ??.?? - ??.??(to be changed)</span>
      <CheckoutBodyBasketOrder basket={basket} payment={true} setChangedBasket={setChangedBasket} changedBasket={changedBasket} />
      <CheckoutBodyBasketTotal
        payment={true}
        basket={basket}
        setAmount={setAmount}
      />
      <PaymentBodyInfoPhoneNumber />
      <PaymentBodyInfoSubscribe />
      {isCardPayment ? (
        <PaymentBodyInfoCardPayment setCardElement={setCardElement} />
      ) : (
        ""
      )}
    </div>
  );
}

export default PaymentBodyInfo;
