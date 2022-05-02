import "../../styles/components/Footer/FirstFooter.css";
import { FaShippingFast } from "react-icons/fa";
import { BsArrowLeftRight } from "react-icons/bs";
import { RiSecurePaymentLine } from "react-icons/ri";
import { GiMailShirt } from "react-icons/gi";
import React from "react";

function FirstFooter() {
  return (
    <div className="firstFooter">
      <footer>
        <div className="firstFooter__option">
          <span>
            <FaShippingFast />
          </span>{" "}
          <span>FREE SHIPPING</span>
        </div>
        <div className="firstFooter__option">
          <span>
            <BsArrowLeftRight />
          </span>{" "}
          <span>30 DAY RETURN POLICY</span>
        </div>
        <div className="firstFooter__option">
          <span>
            <RiSecurePaymentLine />
          </span>{" "}
          <span>SECURE PAYMENTS</span>
        </div>
        <div className="firstFooter__option">
          <span>
            <GiMailShirt />
          </span>{" "}
          <span>MORE THAN 500 BRANDS</span>
        </div>
      </footer>
    </div>
  );
}

export default React.memo(FirstFooter);
