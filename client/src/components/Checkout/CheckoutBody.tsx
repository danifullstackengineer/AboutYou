import React, { useEffect, useState } from "react";
import "../../styles/components/Checkout/CheckoutBody.css";
import CheckoutBodyForm from "./CheckoutBody/CheckoutBodyForm";
import CheckoutBodyItems from "./CheckoutBody/CheckoutBodyItems";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductTypeBasket } from "../../types/Product";
import { AccessoryTypeBasket } from "../../types/Accessory";

function CheckoutBody({
  setAmount,
  clickedContinue,
  setClickedContinue,
  setBasket,
}: {
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  setClickedContinue: React.Dispatch<React.SetStateAction<boolean>>;
  clickedContinue: boolean;
  setBasket?: React.Dispatch<
    React.SetStateAction<ProductTypeBasket[] | AccessoryTypeBasket[]>
  >;
}) {
  const [isNewAddress, setIsNewAddress] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [isEveryField, setIsEveryField] = useState<boolean>(false);
  const [isEveryField2, setIsEveryField2] = useState<boolean>(false);

  const [hasAllFieldsReady, setHasAllFieldsReady] = useState<boolean>(false);

  const [showFieldsWarning, setShowFieldsWarning] = useState<boolean>(false);

  useEffect(() => {
    if (location.pathname === "/payment") {
      if (!hasAllFieldsReady) {
        navigate("/checkout");
        setShowFieldsWarning(true);
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    if (clickedContinue) {
      setClickedContinue(false);
      if (!isNewAddress) {
        if (isEveryField) {
          if (hasAllFieldsReady) {
            navigate("/payment");
          } else {
            setShowFieldsWarning(true);
          }
        }
      } else {
        if (isEveryField && isEveryField2) {
          if (hasAllFieldsReady) {
            navigate("/payment");
          } else {
            setShowFieldsWarning(true);
          }
        }
      }
    }
  }, [
    clickedContinue,
    isEveryField,
    isEveryField2,
    isNewAddress,
    navigate,
    setClickedContinue,
    hasAllFieldsReady,
  ]);

  useEffect(() => {
    if (showFieldsWarning) {
      setTimeout(() => {
        setShowFieldsWarning(false);
      }, 2000);
    }
  }, [showFieldsWarning]);

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
        <CheckoutBodyItems
          setAmount={setAmount}
          setBasket={setBasket}
          setHasAllFieldsReady={setHasAllFieldsReady}
        />
        <div
          className={`checkoutBody__warning ${
            showFieldsWarning ? "checkoutBody__warning-show" : ""
          }`}
        >
          Please ensure you have selected a size and color.
        </div>
      </div>
    </div>
  );
}

export default CheckoutBody;
