import React, { useEffect, useState } from "react";
import "../../../../styles/components/Checkout/PaymentBody/PaymentBodyInfo/PaymentBodyInfoPhoneNumber.css";


function PaymentBodyInfoPhoneNumber() {
  const [input, setInput] = useState<string>("");

  const [isGoodInput, setIsGoodInput] = useState<boolean>(false);

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
    setIsGoodInput(regexCompleted.test(input));
  };
  

  return (
    <div className="paymentBodyInfoPhoneNumber">
      <span>Phone number</span>
      <div className="paymentBodyInfoPhoneNumber__content">
        <input
          type="text"
          pattern="[0-9]*"
          value={input}
          onChange={handleChange}
          placeholder="Phone number"
          onFocus={() => setIsGoodInput(false)}
          onBlur={decideToShowMark}
        />
        <div
          className={`paymentBodyInfoPhoneNumber__mark ${
            isGoodInput ? "paymentBodyInfoPhoneNumber__mark-show" : ""
          }`}
        ></div>
        <div className="paymentBodyInfoPhoneNumber__content-message">
          <span>
            Enter your mobile phone number so the courier can get in touch with
            you.
          </span>
        </div>
      </div>
    </div>
  );
}

export default PaymentBodyInfoPhoneNumber;
