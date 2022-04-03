import React from "react";
import "../styles/Comp-Single/ProcessingPayment.css";

function ProcessingPayment({
  type,
  visible,
}: {
  type: string;
  visible: boolean;
}) {
  return (
    <div
      className="processingPayment"
      style={{
        opacity: visible ? 1 : 0,
        visibility: visible ? "visible" : "hidden",
      }}
    >
          <span>{type}</span>
    </div>
  );
}

export default ProcessingPayment;
