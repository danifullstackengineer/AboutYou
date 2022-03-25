import React, { useEffect, useState } from "react";
import "../../../../styles/components/Checkout/CheckoutBody/Form/CheckoutBodyFormAddressChooser.css";

function CheckoutBodyFormAddressChooser({
  setShowNewAddress,
}: {
  setShowNewAddress: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [selected, setSelected] = useState<boolean[]>([true, false]);

  useEffect(() => {
    if (selected[1]) {
      setShowNewAddress(true);
    } else {
      setShowNewAddress(false);
    }
  }, [selected]);
  return (
    <div className="checkoutBodyFormAddressChooser">
      <div
        className="checkoutBodyFormAddressChooser__option"
        onClick={() => setSelected([true, false])}
      >
        <h3>Apply address</h3>
        <h5>Delivery address is the same as billing address</h5>
        {selected[0] ? <span></span> : <button>Select</button>}
      </div>
      <div
        className="checkoutBodyFormAddressChooser__option"
        onClick={() => setSelected([false, true])}
      >
        <h3>Apply address</h3>
        <h5>Delivery address is the same as billing address</h5>
        {selected[1] ? <span></span> : <button>Select</button>}
      </div>
    </div>
  );
}

export default CheckoutBodyFormAddressChooser;
