import React, { useEffect, useState } from "react";
import "../../styles/components/Checkout/CheckoutBody.css";
import CheckoutBodyForm from "./CheckoutBody/CheckoutBodyForm";
import CheckoutBodyItems from "./CheckoutBody/CheckoutBodyItems";
import { useNavigate } from "react-router-dom";

function CheckoutBody({
  setAmount,
  clickedContinue,
  setClickedContinue
}: {
    setAmount: React.Dispatch<React.SetStateAction<string>>;
    setClickedContinue: React.Dispatch<React.SetStateAction<boolean>>;
    clickedContinue: boolean;
}) {
  const [isNewAddress, setIsNewAddress] = useState<boolean>(false);
  const navigate = useNavigate();

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
