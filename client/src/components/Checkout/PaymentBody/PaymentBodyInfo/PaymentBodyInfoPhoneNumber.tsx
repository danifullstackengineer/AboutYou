import React, { useEffect, useState } from "react";
import { useWindowDimensions } from "../../../../Hooks/Viewport";
import "../../../../styles/components/Checkout/PaymentBody/PaymentBodyInfo/PaymentBodyInfoPhoneNumber.css";

function PaymentBodyInfoPhoneNumber({
  isGoodInputPhoneNumber,
  setIsGoodInputPhoneNumber,
}: {
  isGoodInputPhoneNumber: boolean;
  setIsGoodInputPhoneNumber: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [input, setInput] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const regex = /^([+]?[0-9]{0,15})$/;
    if (regex.test(e.target.value)) {
      setInput(e.target.value);
    }
  };

  const decideToShowMark = (): void => {
    var regexCompleted;
    if (input[0] === "+") {
      regexCompleted = /^(\+[0-9]{5,15})$/;
    } else {
      regexCompleted = /^([0-9]{4,15})$/;
    }
    setIsGoodInputPhoneNumber(regexCompleted.test(input));
  };

  console.log(isGoodInputPhoneNumber);
  const { width } = useWindowDimensions();

  return (
    <div className="paymentBodyInfoPhoneNumber">
      <span>Phone number</span>
      <div className="paymentBodyInfoPhoneNumber__content">
        <input
          className={
            isGoodInputPhoneNumber
              ? ""
              : "paymentBodyInfoPhoneNumber__content-bad-phone"
          }
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Phone number"
          onBlur={decideToShowMark}
        />
        <div
          className={`paymentBodyInfoPhoneNumber__mark ${
            isGoodInputPhoneNumber
              ? "paymentBodyInfoPhoneNumber__mark-show"
              : ""
          }`}
        ></div>
        <div className="paymentBodyInfoPhoneNumber__content-message">
          <span>
            {width <= 1500 && width > 1200
              ? "Phone nr. for courier"
              : "Enter your mobile phone number so the courier can get in touch with you."}
          </span>
        </div>
      </div>
    </div>
  );
}

export default React.memo(PaymentBodyInfoPhoneNumber);
