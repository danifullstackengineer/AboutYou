import React, { useState } from "react";
import CheckoutBodyFormAdressChooser from "./Form/CheckoutBodyFormAddressChooser";
import CheckoutBodyMainForm from "./Form/CheckoutBodyMainForm";

function CheckoutBodyForm() {
  const [showNewAddress, setShowNewAddress] = useState<boolean>(false);
  return (
    <div className="checkoutBodyForm">
      <CheckoutBodyMainForm title={"Your billing address"} />
      <CheckoutBodyFormAdressChooser setShowNewAddress={setShowNewAddress} />
      {showNewAddress ? <CheckoutBodyMainForm newAddress={true} title={"Your delivery address"} /> : ""}
    </div>
  );
}

export default CheckoutBodyForm;
