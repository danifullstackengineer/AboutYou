import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/components/Checkout/ProgressCheckout.css";

function ProgressCheckout({ progress }: { progress?: string }) {
  const [active, setActive] = useState<boolean[]>([true, false, false, false]);
  const [current, setCurrent] = useState<number>(1);

  useEffect(() => {
    if (progress === "payment") {
      setActive([true, true, true, false]);
      setCurrent(3);
    } else if (progress === "checkout") {
      setActive([true, false, false, false]);
      setCurrent(1);
    }
  }, [progress]);

  return (
    <div className="progressCheckout">
      <div className="progressCheckout__bar">
        <div
          className={`${
            active[0]
              ? "progressCheckout__bar-active"
              : "progressCheckout__bar-inactive"
          } ${current === 0 ? "progressCheckout__bar-current" : ""}`}
        >
          <div></div>
        </div>
        <div
          className={`${
            active[1]
              ? "progressCheckout__bar-active"
              : "progressCheckout__bar-inactive"
          } ${current === 1 ? "progressCheckout__bar-current" : ""}`}
        >
          <div></div>
        </div>
        <div
          className={`${
            active[2]
              ? "progressCheckout__bar-active"
              : "progressCheckout__bar-inactive"
          } ${current === 2 ? "progressCheckout__bar-current" : ""}`}
        >
          <div></div>
        </div>
        <div
          className={`${
            active[3]
              ? "progressCheckout__bar-active"
              : "progressCheckout__bar-inactive"
          } ${current === 3 ? "progressCheckout__bar-current" : ""}`}
        >
          <div></div>
        </div>
      </div>
      <div className="progressCheckout__text">
        <Link
          className={
            active[0] || current === 0 ? "progressCheckout__text-active" : ""
          }
          to="/"
        >
          Shop
        </Link>
        <Link
          className={
            active[1] || current === 1 ? "progressCheckout__text-active" : ""
          }
          to="/checkout"
        >
          Your information
        </Link>
        <Link
          className={
            active[2] || current === 2 ? "progressCheckout__text-active" : ""
          }
          to="/payment"
        >
          Your payment methods
        </Link>
        <Link
          className={
            active[3] || current === 3 ? "progressCheckout__text-active" : ""
          }
          to="/order"
        >
          Order
        </Link>
      </div>
    </div>
  );
}

export default ProgressCheckout;
