import React from "react";
import "../../styles/components/Footer/FirstFooter.css";
import { FaShippingFast } from "react-icons/fa";
import { BsArrowLeftRight } from "react-icons/bs";
import { RiSecurePaymentLine } from "react-icons/ri";
import { GiMailShirt } from "react-icons/gi";

function FirstFooter() {
  return (
    <div className="firstFooter">
      <footer>
        <div className="firstFooter__option">
          <span>
            <FaShippingFast />
          </span>{" "}
          FREE SHIPPING
        </div>
        <div className="firstFooter__option">
          <span>
            <BsArrowLeftRight />
          </span>{" "}
          30 DAY RETURN POLICY
        </div>
        <div className="firstFooter__option">
          <span>
            <RiSecurePaymentLine />
          </span>{" "}
          SECURE PAYMENTS
        </div>
        <div className="firstFooter__option">
          <span>
            <GiMailShirt />
          </span>{" "}
          MORE THAN 500 BRANDS
        </div>
      </footer>
    </div>
  );
}

export default FirstFooter;
