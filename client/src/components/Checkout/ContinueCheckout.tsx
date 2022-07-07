import React, { useCallback, useEffect, useRef, useState } from "react";
import { useWindowDimensions } from "../../Hooks/Viewport";
import "../../styles/components/Checkout/ContinueCheckout.css";

function ContinueCheckout({
  refProp,
  setClickedContinue,
  continueText,
  redirectToPaymentProvider,
  setRedirectToPaymentProvider,
  isGoodInputPhoneNumber,
  phoneNumberRef,
}: {
  refProp?: React.RefObject<HTMLDivElement>;
  setClickedContinue: React.Dispatch<React.SetStateAction<boolean>>;
  continueText: string;
  redirectToPaymentProvider?: boolean;
  setRedirectToPaymentProvider: React.Dispatch<React.SetStateAction<boolean>>;
  isGoodInputPhoneNumber?: boolean;
  phoneNumberRef?: React.RefObject<HTMLDivElement>;
}) {
  const dummyRef = useRef<HTMLDivElement>(null);
  const [continueTop, setContinueTop] = useState<number>();
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (refProp && refProp.current) {
      setContinueTop(refProp.current.offsetTop);
    }
  }, [refProp]);

  const handleScroll = useCallback(() => {
    if (dummyRef.current && refProp && refProp.current) {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      if (
        continueTop &&
        continueTop + winScroll >= dummyRef.current.offsetTop
      ) {
        refProp.current.style.position = "relative";
      } else {
        refProp.current.style.position = "fixed";
      }
    }
  }, [continueTop, refProp]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [continueTop, width, height, handleScroll]);

  return (
    <>
      <div className="continueCheckout-dummy" ref={dummyRef}></div>
      <div className="continueCheckout" ref={refProp}>
        <button
          onClick={() => {
            if (redirectToPaymentProvider && isGoodInputPhoneNumber) {
              setRedirectToPaymentProvider(true);
            } else if (
              redirectToPaymentProvider &&
              !isGoodInputPhoneNumber &&
              phoneNumberRef &&
              phoneNumberRef.current
            ) {
              phoneNumberRef.current.scrollIntoView();
            } else {
              setClickedContinue(true);
              setRedirectToPaymentProvider(false);
            }
          }}
        >
          {continueText}
        </button>
      </div>
    </>
  );
}

export default React.memo(ContinueCheckout);
