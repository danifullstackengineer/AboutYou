import React, { useEffect } from "react";
import "../../styles/components/Checkout/ContinueCheckout.css";

function ContinueCheckout({
  refProp,
  setClickedContinue,
  continueText,
  redirectToPaymentProvider,
  setRedirectToPaymentProvider,
}: {
  refProp?: React.RefObject<HTMLDivElement>;
  setClickedContinue: React.Dispatch<React.SetStateAction<boolean>>;
  continueText: string;
  redirectToPaymentProvider?: boolean;
  setRedirectToPaymentProvider: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="continueCheckout" ref={refProp}>
      <button
        onClick={() => {
          if (redirectToPaymentProvider) {
            setRedirectToPaymentProvider(true);
          } else {
            setClickedContinue(true);
            setRedirectToPaymentProvider(false);
          }
        }}
      >
        {continueText}
      </button>
    </div>
  );
}

export default ContinueCheckout;
