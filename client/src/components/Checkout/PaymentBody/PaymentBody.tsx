import React from "react";
import "../../../styles/components/Checkout/PaymentBody/PaymentBody.css";
import PaymentBodyInfo from "./PaymentBodyInfo";
import PaymentBodyMethod from "./PaymentBodyMethod";
import { StripeCardElement } from '@stripe/stripe-js';



function PaymentBody({
  currentMethod,
  setCurrentMethod,
  setCardElement,
  setActiveDropdown,
  activeDropdown,
  setCurrentCoin
}: {
  currentMethod: boolean[];
    setCurrentMethod: React.Dispatch<React.SetStateAction<boolean[]>>;
    setCardElement: React.Dispatch<React.SetStateAction<StripeCardElement | null | undefined>>;
    setActiveDropdown: React.Dispatch<React.SetStateAction<boolean[]>>;
    activeDropdown: boolean[];
    setCurrentCoin: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
      <div className="paymentBody">
        <div className="paymentBody__items">
          <PaymentBodyMethod
            currentMethod={currentMethod}
          setCurrentMethod={setCurrentMethod}
          setActiveDropdown={setActiveDropdown}
          activeDropdown={activeDropdown}
          setCurrentCoin={setCurrentCoin}
          />
          <PaymentBodyInfo isCardPayment={currentMethod[1]} setCardElement={setCardElement} />
        </div>
      </div>
  );
}

export default PaymentBody;
