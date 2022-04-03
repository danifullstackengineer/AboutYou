import React, { useEffect, useRef, useState } from "react";
import "../styles/Comp-Single/PaymentMethodDropdown.css";

function PaymentMethodDropdown({
  methods,
  setActiveDropdown,
}: {
  methods: { name: string; icon: string; active: boolean }[];
  setActiveDropdown: React.Dispatch<React.SetStateAction<boolean[]>>;
}) {
  const handleClick = (method: number): void => {
    switch (method) {
      case 0:
        setActiveDropdown([true, false]);
        break;
      case 1:
        setActiveDropdown([false, true]);
    }
  };

  
  return (
    <div
      className={`paymentMethodDropdown`}
    >
      {methods.map((method, i) => {
        return (
          <div
            onClick={() => handleClick(i)}
            className={`paymentMethodDropdown__item ${
              method.active ? "paymentMethodDropdown__item-active" : ""
            }`}
            key={i}
          >
            <img src={method.icon} alt={method.icon} />
            <span>{method.name}</span>
          </div>
        );
      })}
    </div>
  );
}

export default PaymentMethodDropdown;
