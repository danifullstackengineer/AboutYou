import React, { useEffect, useRef, useState } from "react";
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

  const firstAddrRef = useRef<HTMLDivElement>(null);
  const secondAddrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(showNewAddress){
      secondAddrRef.current?.scrollIntoView();
    }else{
      firstAddrRef.current?.scrollIntoView();
    }
    setIsNewAddress(showNewAddress);
  }, [showNewAddress, setIsNewAddress, firstAddrRef, secondAddrRef]);

  return (
    <div className="checkoutBodyForm">
      <CheckoutBodyMainForm
        title={"Your billing address"}
        setIsEveryField={setIsEveryField}
        clickedContinue={clickedContinue}
        firstAddrRef={firstAddrRef}
      />
      <CheckoutBodyFormAdressChooser setShowNewAddress={setShowNewAddress}/>
      {showNewAddress ? (
        <CheckoutBodyMainForm
          newAddress={true}
          title={"Your delivery address"}
          setIsEveryField={setIsEveryField2}
          clickedContinue={clickedContinue}
          secondAddrRef={secondAddrRef}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default React.memo(CheckoutBodyForm);
