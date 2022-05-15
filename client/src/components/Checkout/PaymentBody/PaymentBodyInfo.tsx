import React, { useEffect, useRef, useState } from "react";
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
  const returnDateAndEstimatedDate = (): string => {
    const days_for_first = 10;
    const days_for_second = 5;
    const first_arrival = new Date(
      new Date().getTime() + 1000 * 60 * 60 * 24 * days_for_first
    );
    const second_arrival = new Date(
      first_arrival.getTime() + 1000 * 60 * 60 * 24 * days_for_second
    );
    const current_year = first_arrival.getFullYear();
    const current_month = first_arrival.getUTCMonth() + 1;
    const current_day = first_arrival.getDate();

    const next_year = second_arrival.getFullYear();
    const next_month = second_arrival.getUTCMonth() + 1;
    const next_day = second_arrival.getDate();
    return (
      current_year +
      "/" +
      current_month +
      "/" +
      current_day +
      " - " +
      next_year +
      "/" +
      next_month +
      "/" +
      next_day
    );
  };


  return (
    <div className="paymentBodyInfo">
      <PaymentBodyInfoAddress />
      <span>
        Delivery estimated between{" "}
        <span>
          {returnDateAndEstimatedDate()}
        </span>
      </span>
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
