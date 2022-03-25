import React from "react";
import "../../styles/components/Checkout/CheckoutBody.css";
import CheckoutBodyForm from "./CheckoutBody/CheckoutBodyForm";
import CheckoutBodyItems from "./CheckoutBody/CheckoutBodyItems";
import ContinueCheckout from "./ContinueCheckout";

function CheckoutBody() {
  return (
    <div className="checkoutBody">
      <CheckoutBodyForm />
      <CheckoutBodyItems />
      <ContinueCheckout />
    </div>
  );
}

export default CheckoutBody;
