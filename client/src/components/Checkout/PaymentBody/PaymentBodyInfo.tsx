import React from "react";
import "../../../styles/components/Checkout/PaymentBody/PaymentBodyInfo.css";
import PaymentBodyInfoAddress from "./PaymentBodyInfo/PaymentBodyInfoAddress";
import PaymentBodyInfoCardPayment from "./PaymentBodyInfo/PaymentBodyInfoCardPayment";
import PaymentBodyInfoItems from "./PaymentBodyInfo/PaymentBodyInfoItems";
import PaymentBodyInfoPhoneNumber from "./PaymentBodyInfo/PaymentBodyInfoPhoneNumber";
import PaymentBodyInfoSubscribe from "./PaymentBodyInfo/PaymentBodyInfoSubscribe";
import PaymentBodyInfoSum from "./PaymentBodyInfo/PaymentBodyInfoSum";
import PaymentBodyInfoVoucher from "./PaymentBodyInfo/PaymentBodyInfoVoucher";
import { StripeCardElement } from '@stripe/stripe-js';

function PaymentBodyInfo({
  isCardPayment,
  setCardElement,
}: {
  isCardPayment: boolean;
  setCardElement: React.Dispatch<
    React.SetStateAction<StripeCardElement | null | undefined>
  >;
}) {
  return (
    <div className="paymentBodyInfo">
      <PaymentBodyInfoAddress />
      <span>Delivery estimated between ??.?? - ??.??(to be changed)</span>
      <PaymentBodyInfoItems />
      <PaymentBodyInfoSum />
      <PaymentBodyInfoVoucher />
      <PaymentBodyInfoPhoneNumber />
      <PaymentBodyInfoSubscribe />
      {isCardPayment ? <PaymentBodyInfoCardPayment setCardElement={setCardElement}/> : ""}
    </div>
  );
}

export default PaymentBodyInfo;
