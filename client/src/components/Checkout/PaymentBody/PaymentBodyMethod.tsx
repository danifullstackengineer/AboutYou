import React, { useEffect, useState } from "react";
import PaymentMethod from "../../../Comp-Single/PaymentMethod";
import paypal from "../../../assets/svg/paypal.svg";
import card from "../../../assets/svg/card.svg";
import binance from "../../../assets/svg/binance.svg";
import metamask from "../../../assets/svg/metamask.svg";
import bitcoin from "../../../assets/svg/bitcoin.svg";
import ethereum from "../../../assets/svg/ethereum.svg";
import liquality from "../../../assets/png/liquality.png";
import crypto from "../../../assets/png/crypto.png";
import "../../../styles/components/Checkout/PaymentBody/PaymentBodyMethod.css";
import PaymentMethodDropdown from "../../../Comp-Single/PaymentMethodDropdown";

function PaymentBodyMethod({
  currentMethod,
  setCurrentMethod,
  setActiveDropdown,
  activeDropdown,
}: {
  currentMethod: boolean[];
  setCurrentMethod: React.Dispatch<React.SetStateAction<boolean[]>>;
  setActiveDropdown: React.Dispatch<React.SetStateAction<boolean[]>>;
  activeDropdown: boolean[];
}) {
  return (
    <div className="paymentBodyMethod">
      <PaymentMethod
        type={"paypal"}
        active={currentMethod[0]}
        icon={paypal}
        info={{
          infoTitle: "The benefits of PayPal",
          infoDescription:
            "You do not need to have an existing PayPal account. You can simply create a new one that you will be redirected to after confirmation of your order",
        }}
        setCurrentMethod={setCurrentMethod}
      />
      <PaymentMethod
        type="card"
        active={currentMethod[1]}
        icon={card}
        info={{
          infoTitle: "Benefits of paying by debit or credit card",
          infoDescription:
            "Make safe and convenient payments on our website with VISA or MasterCard. After confirmation of your order, you will be asked to enter your debit or credit card information. Your card will only be charged once the items have left our warehouse.",
        }}
        setCurrentMethod={setCurrentMethod}
      />
      <PaymentMethod
        type="third-party"
        active={currentMethod[2]}
        icon={binance}
        info={{
          infoTitle: "Benefits of paying through Binance",
          infoDescription:
            "Some description about paying with binance service.",
        }}
        setCurrentMethod={setCurrentMethod}
      />
      <PaymentMethod
        type="wallet"
        active={currentMethod[3]}
        icon={metamask}
        info={{
          infoTitle: "Benefits of paying through your wallet extension",
          infoDescription:
            "Some description about paying with your wallet extension.",
        }}
        setCurrentMethod={setCurrentMethod}
      />
      <PaymentMethod
        type="manual"
        active={currentMethod[4]}
        info={{
          infoTitle: "Benefits of paying by manual crypto transfer",
          infoDescription:
            "You have complete access through the transaction, and don't need to rely on a third-party.",
        }}
        setCurrentMethod={setCurrentMethod}
      />
    </div>
  );
}

export default PaymentBodyMethod;
