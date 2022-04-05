import React from "react";
import { CardElement, useElements } from "@stripe/react-stripe-js";
import { StripeCardElement } from '@stripe/stripe-js';
import "../../../../styles/components/Checkout/PaymentBody/PaymentBodyInfo/PaymentBodyInfoCardPayment.css";

function PaymentBodyInfoCardPayment({
  setCardElement,
}: {
  setCardElement: React.Dispatch<React.SetStateAction<StripeCardElement | null | undefined>>;
}) {
  const elements = useElements();

  const handleChange = (e: any): void => {
    const cardElement = elements?.getElement(CardElement);
    setCardElement(cardElement)
  };

  return (
    <div className="paymentBodyInfoCardPayment">
      <h3>Card Details: </h3>
      <div>
        <CardElement onChange={handleChange} />
      </div>
    </div>
  );
}

export default PaymentBodyInfoCardPayment;
