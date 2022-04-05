import React, { useEffect, useState } from "react";
import CheckoutBodyFormAdressChooser from "./Form/CheckoutBodyFormAddressChooser";
import CheckoutBodyMainForm from "./Form/CheckoutBodyMainForm";

function CheckoutBodyForm({
  isNewAddress,
  setIsNewAddress,
  setIsEveryField,
  setIsEveryField2,
  clickedContinue,
}: {
  isNewAddress: boolean;
  setIsNewAddress: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEveryField: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEveryField2: React.Dispatch<React.SetStateAction<boolean>>;
  clickedContinue: boolean;
}) {
  const [showNewAddress, setShowNewAddress] = useState<boolean>(false);
  useEffect(() => {
    setIsNewAddress(showNewAddress);
  }, [showNewAddress, setIsNewAddress]);

  return (
    <div className="checkoutBodyForm">
      <CheckoutBodyMainForm
        title={"Your billing address"}
        setIsEveryField={setIsEveryField}
        clickedContinue={clickedContinue}
      />
      <CheckoutBodyFormAdressChooser setShowNewAddress={setShowNewAddress} />
      {showNewAddress ? (
        <CheckoutBodyMainForm
          newAddress={true}
          title={"Your delivery address"}
          setIsEveryField={setIsEveryField2}
          clickedContinue={clickedContinue}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default CheckoutBodyForm;
