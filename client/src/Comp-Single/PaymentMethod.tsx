import React, { useState } from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import "../styles/Comp-Single/PaymentMethod.css";

function PaymentMethod({
  active,
  icon,
  info,
  type,
  setCurrentMethod,
}: {
  active: boolean;
  icon?: string;
  info: { infoTitle: string; infoDescription: string };
  type: string;
  setCurrentMethod: React.Dispatch<React.SetStateAction<boolean[]>>;
}) {
  const handleMethodChange = (): void => {
    switch (type) {
      case "paypal":
        setCurrentMethod([true, false, false, false, false]);
        break;
      case "card":
        setCurrentMethod([false, true, false, false, false]);
        break;
      case "third-party":
        setCurrentMethod([false, false, true, false, false]);
        break;
      case "wallet":
        setCurrentMethod([false, false, false, true, false]);
        break;
      case "manual":
        setCurrentMethod([false, false, false, false, true]);
        break;
    }
  };


  return (
    <div onClick={handleMethodChange} className={`paymentMethod`}>
      {active ? (
        <div className="paymentMethod__check paymentMethod__check-active">
          <div></div>
        </div>
      ) : (
        <div className="paymentMethod__check">
          <div></div>
        </div>
      )}
      {icon ? (
        <img src={icon} alt={icon} />
      ) : (
        <div className="paymentMethod__manual">Manual Crypto</div>
      )}
      <div className="paymentMethod__info">
        <BsFillInfoCircleFill />
        <div className="paymentMethod__info-content">
          <h4>{info.infoTitle}</h4>
          <h5>{info.infoDescription}</h5>
        </div>
      </div>
    </div>
  );
}

export default PaymentMethod;
