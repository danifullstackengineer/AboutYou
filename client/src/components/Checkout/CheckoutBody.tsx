import React, { useEffect, useState } from "react";
import "../../styles/components/Checkout/CheckoutBody.css";
import CheckoutBodyForm from "./CheckoutBody/CheckoutBodyForm";
import CheckoutBodyItems from "./CheckoutBody/CheckoutBodyItems";
import { useNavigate } from "react-router-dom";

function CheckoutBody({
  setAmount,
  continueRef,
  clickedContinue,
  setClickedContinue
}: {
    setAmount: React.Dispatch<React.SetStateAction<string>>;
    continueRef: React.RefObject<HTMLDivElement>
    setClickedContinue: React.Dispatch<React.SetStateAction<boolean>>;
    clickedContinue: boolean;
}) {
  const [isNewAddress, setIsNewAddress] = useState<boolean>(false);
  const navigate = useNavigate();

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (continueRef.current) {
      if (scrollPosition > 165 && !isNewAddress) {
        continueRef.current.style.position = "relative";
      } else if (scrollPosition > 730 && isNewAddress) {
        continueRef.current.style.position = "relative";
      } else {
        continueRef.current.style.position = "fixed";
      }
    }
  }, [scrollPosition, continueRef, isNewAddress]);
  useEffect(() => {
    if (continueRef.current) {
      if (!isNewAddress && continueRef.current.style.position === "relative") {
        continueRef.current.style.position = "fixed";
      } else if (
        isNewAddress &&
        continueRef.current.style.position === "relative"
      ) {
        continueRef.current.style.position = "fixed";
      }
    }
  }, [isNewAddress, continueRef]);

  const [isEveryField, setIsEveryField] = useState<boolean>(false);
  const [isEveryField2, setIsEveryField2] = useState<boolean>(false);

  useEffect(() => {
    if (clickedContinue) {
      setClickedContinue(false);
      if (!isNewAddress) {
        if (isEveryField) {
          navigate("/payment");
        }
      } else {
        if (isEveryField && isEveryField2) {
          navigate("/payment");
        }
      }
    }
  }, [clickedContinue, isEveryField, isEveryField2, isNewAddress, navigate, setClickedContinue]);

  return (
    <div className="checkoutBody">
      <div className="checkoutBody__items">
        <CheckoutBodyForm
          isNewAddress={isNewAddress}
          setIsNewAddress={setIsNewAddress}
          setIsEveryField={setIsEveryField}
          setIsEveryField2={setIsEveryField2}
          clickedContinue={clickedContinue}
        />
        <CheckoutBodyItems setAmount={setAmount}/>
      </div>
    </div>
  );
}

export default CheckoutBody;
