import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getFirstAddress,
  getSecondAddress,
} from "../../../../Logic/localStorage/address";
import "../../../../styles/components/Checkout/PaymentBody/PaymentBodyInfo/PaymentBodyInfoAddress.css";
import IAddress from "../../../../types/address";
import { useNavigate } from "react-router-dom";

function PaymentBodyInfoAddress() {
  const [addressOne, setAddressOne] = useState<IAddress>();
  const [addressTwo, setAddressTwo] = useState<IAddress>();
  const navigate = useNavigate();

  useEffect(() => {
    const addr1 = getFirstAddress();
    if (!addr1) {
      navigate("/checkout");
    } else {
      setAddressOne(addr1);
    }
    const addr2 = getSecondAddress();
    if (addr2) {
      setAddressTwo(addr2);
    }
  }, []);

  return (
    <div className="paymentBodyInfoAddress">
      <h1>Your order</h1>
      <div>
        <div className="paymentBodyInfoAddress__item">
          <h4>
            SHIPPING ADDRESS <Link to="/checkout">Edit</Link>
          </h4>
          <span className="paymentBodyInfoAddress__item-info">
            {"Title: " +
              addressOne?.formality +
              " " +
              addressOne?.firstName +
              " " +
              addressOne?.lastName}
          </span>
          <span className="paymentBodyInfoAddress__item-info">
            {"Country: " + addressOne?.country}
          </span>
          <span className="paymentBodyInfoAddress__item-info">
            {!addressOne?.addressTwo
              ? "Address: " + "" + addressOne?.addressOne
              : "Address One: " + addressOne.addressOne}
          </span>
          {addressOne?.addressTwo ? (
            <span className="paymentBodyInfoAddress__item-info">
              {"Address Two: " + addressOne.addressTwo}
            </span>
          ) : (
            ""
          )}
          <span className="paymentBodyInfoAddress__item-info">
            {"State: " + addressOne?.state}
          </span>
          <span className="paymentBodyInfoAddress__item-info">
            {"Postal Code: " + addressOne?.p_code}
          </span>
          <span className="paymentBodyInfoAddress__item-info">
            {"City: " + addressOne?.city}
          </span>
          {addressOne?.tax ? (
            <span className="paymentBodyInfoAddress__item-info">
              {"Tax ID: " + addressOne.tax}
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="paymentBodyInfoAddress__item">
          <h4>
            BILLING ADDRESS <Link to="/">Edit</Link>
          </h4>
          {addressTwo ? (
            <>
              <span className="paymentBodyInfoAddress__item-info">
                {"Title: " +
                  addressTwo.formality +
                  " " +
                  addressTwo.firstName +
                  " " +
                  addressTwo.lastName}
              </span>
              <span className="paymentBodyInfoAddress__item-info">
                {"Country: " + addressTwo.country}
              </span>
              <span className="paymentBodyInfoAddress__item-info">
                {!addressTwo.addressTwo
                  ? "Address: " + addressTwo.addressOne
                  : "Address One: " + addressTwo.addressOne}
              </span>
              {addressTwo.addressTwo ? (
                <span className="paymentBodyInfoAddress__item-info">
                  {"Address Two: " + addressTwo.addressTwo}
                </span>
              ) : (
                ""
              )}
              <span className="paymentBodyInfoAddress__item-info">
                {"State: " + addressTwo.state}
              </span>
              <span className="paymentBodyInfoAddress__item-info">
                {"Postal Code: " + addressTwo.p_code}
              </span>
              <span className="paymentBodyInfoAddress__item-info">
                {"City: " + addressTwo.city}
              </span>
            </>
          ) : (
            <>
              <span className="paymentBodyInfoAddress__item-info">
                {"Title: " +
                  addressOne?.formality +
                  " " +
                  addressOne?.firstName +
                  " " +
                  addressOne?.lastName}
              </span>
              <span className="paymentBodyInfoAddress__item-info">
                {"Country: " + addressOne?.country}
              </span>
              <span className="paymentBodyInfoAddress__item-info">
                {!addressOne?.addressTwo
                  ? "Address: " + addressOne?.addressOne
                  : "Address One: " + addressOne.addressOne}
              </span>
              {addressOne?.addressTwo ? (
                <span className="paymentBodyInfoAddress__item-info">
                  {"Address Two: " + addressOne.addressTwo}
                </span>
              ) : (
                ""
              )}
              <span className="paymentBodyInfoAddress__item-info">
                {"State: " + addressOne?.state}
              </span>
              <span className="paymentBodyInfoAddress__item-info">
                {"Postal Code: " + addressOne?.p_code}
              </span>
              <span className="paymentBodyInfoAddress__item-info">
                {"City: " + addressOne?.city}
              </span>
              {addressOne?.tax ? (
                <span className="paymentBodyInfoAddress__item-info">
                  {"Tax ID: " + addressOne.tax}
                </span>
              ) : (
                ""
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentBodyInfoAddress;
