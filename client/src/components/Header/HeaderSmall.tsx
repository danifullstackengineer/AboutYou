import React, { useRef, useState } from "react";
import "../../styles/components/Header/HeaderSmall.css";
import { FaShippingFast } from "react-icons/fa";
import { BsArrowLeftRight } from "react-icons/bs";
import { RiSecurePaymentLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";

function HeaderSmall() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [clicked, setClicked] = useState<boolean>(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => {
      if (headerRef.current) {
        headerRef.current.style.display = "none";
      }
    }, 201)
  };

  return (
    <div
      className={`headerSmall ${clicked ? "headerSmall-anim" : ""}`}
      ref={headerRef}
    >
      <div className="headerSmall__option">
        <div className="headerSmall__option-icon">
          <FaShippingFast />
        </div>
        <span>Free shipping</span>
      </div>
      <div className="headerSmall__option">
        <div className="headerSmall__option-revert">
          <div className="headerSmall__option-icon">
            <BsArrowLeftRight />
          </div>
        </div>
        <span>30 Day return policy</span>
      </div>
      <div className="headerSmall__option">
        <div className="headerSmall__option-icon">
          <RiSecurePaymentLine />
        </div>
        <span>Secure payments</span>
      </div>
      <div className="headerSmall__close" onClick={handleClick}>
        <AiOutlineClose />
      </div>
    </div>
  );
}

export default HeaderSmall;
