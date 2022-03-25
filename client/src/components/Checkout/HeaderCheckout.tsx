import React from "react";
import { Link } from "react-router-dom";
import AboutYouLogo from "../../Comp-Single/AboutYouLogo";
import "../../styles/components/Checkout/HeaderCheckout.css";

function HeaderCheckout() {
  return (
    <div className="headerCheckout">
      <div>
        <Link to="/">Continue shopping</Link>
        <AboutYouLogo />
        <div className="headerCheckout__options">
          <Link to="/account">My account</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/">Log out</Link>
          <Link to="/help">Help</Link>
        </div>
      </div>
    </div>
  );
}

export default HeaderCheckout;
