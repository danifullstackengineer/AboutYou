import { useState } from "react";
import "../../../../styles/components/Checkout/PaymentBody/PaymentBodyInfo/PaymentBodyInfoSubscribe.css";

function PaymentBodyInfoSubscribe() {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <div className="paymentBodyInfoSubscribe">
      <div
        className={`paymentBodyInfoSubscribe__check ${
          toggle ? "paymentBodyInfoSubscribe__check-active" : ""
        }`}
        onClick={() => setToggle(!toggle)}
      ></div>
      <div
        className="paymentBodyInfoSubscribe__content"
        onClick={() => setToggle(!toggle)}
      >
        <span>
          <strong>I would like to</strong> receive email updates on{" "}
          <strong>current trends, offers, and coupons</strong> from About You
          Global.
        </span>
        <span>Unsubscribe any time, free of charge.</span>
      </div>
    </div>
  );
}

export default PaymentBodyInfoSubscribe;
