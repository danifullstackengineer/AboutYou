import React from "react";
import "../../../styles/components/Checkout/PaymentBody/PaymentBody.css";
import PaymentBodyInfo from "./PaymentBodyInfo";
import PaymentBodyMethod from "./PaymentBodyMethod";
import { StripeCardElement } from "@stripe/stripe-js";

function PaymentBody({
  currentMethod,
  setCurrentMethod,
  setCardElement,
  setActiveDropdown,
  activeDropdown,
  setCurrentCoin,
  setAmount,
  isGoodInputPhoneNumber,
  setIsGoodInputPhoneNumber,
  phoneNumberRef
}: {
  currentMethod: boolean[];
  setCurrentMethod: React.Dispatch<React.SetStateAction<boolean[]>>;
  setCardElement: React.Dispatch<
    React.SetStateAction<StripeCardElement | null | undefined>
  >;
  setActiveDropdown: React.Dispatch<React.SetStateAction<boolean[]>>;
  activeDropdown: boolean[];
  setCurrentCoin: React.Dispatch<React.SetStateAction<string>>;
  setAmount?: React.Dispatch<React.SetStateAction<string>>;
  isGoodInputPhoneNumber: boolean;
  setIsGoodInputPhoneNumber: React.Dispatch<React.SetStateAction<boolean>>;
  phoneNumberRef: React.RefObject<HTMLDivElement>;
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
        <PaymentBodyInfo
          isCardPayment={currentMethod[1]}
          setCardElement={setCardElement}
          setAmount={setAmount}
          isGoodInputPhoneNumber={isGoodInputPhoneNumber}
          setIsGoodInputPhoneNumber={setIsGoodInputPhoneNumber}
		  phoneNumberRef={phoneNumberRef}
        />
      </div>
    </div>
  );
}

export default React.memo(PaymentBody);
