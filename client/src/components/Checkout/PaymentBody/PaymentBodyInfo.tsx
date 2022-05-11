import React, { useEffect, useState } from "react";
import "../../../styles/components/Checkout/PaymentBody/PaymentBodyInfo.css";
import PaymentBodyInfoAddress from "./PaymentBodyInfo/PaymentBodyInfoAddress";
import PaymentBodyInfoCardPayment from "./PaymentBodyInfo/PaymentBodyInfoCardPayment";
import PaymentBodyInfoPhoneNumber from "./PaymentBodyInfo/PaymentBodyInfoPhoneNumber";
import PaymentBodyInfoSubscribe from "./PaymentBodyInfo/PaymentBodyInfoSubscribe";
import { StripeCardElement } from "@stripe/stripe-js";
import CheckoutBodyBasketOrder from "../CheckoutBody/Basket/CheckoutBodyBasketOrder";
import CheckoutBodyBasketTotal from "../CheckoutBody/Basket/CheckoutBodyBasketTotal";

function PaymentBodyInfo({
  isCardPayment,
  setCardElement,
  setAmount,
  isGoodInputPhoneNumber,
  setIsGoodInputPhoneNumber,
}: {
  isCardPayment: boolean;
  setCardElement: React.Dispatch<
    React.SetStateAction<StripeCardElement | null | undefined>
  >;
  setAmount?: React.Dispatch<React.SetStateAction<string>>;
  isGoodInputPhoneNumber: boolean;
  setIsGoodInputPhoneNumber: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="paymentBodyInfo">
      <PaymentBodyInfoAddress />
      <span>Delivery estimated between ??.?? - ??.??(to be changed)</span>
      <CheckoutBodyBasketOrder payment={true} />
      <CheckoutBodyBasketTotal payment={true} setAmount={setAmount} />
      <PaymentBodyInfoPhoneNumber
        isGoodInputPhoneNumber={isGoodInputPhoneNumber}
        setIsGoodInputPhoneNumber={setIsGoodInputPhoneNumber}
      />
      <PaymentBodyInfoSubscribe />
      {isCardPayment ? (
        <PaymentBodyInfoCardPayment setCardElement={setCardElement} />
      ) : (
        ""
      )}
    </div>
  );
}

export default React.memo(PaymentBodyInfo);
