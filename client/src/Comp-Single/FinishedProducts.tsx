import React from "react";
import "../styles/Comp-Single/FinishedProducts.css";
import { useLocation } from "react-router-dom";

const FinishedProducts = () => {
  const location = useLocation();

  return (
    <div
      className={`finishedProducts ${
        location.pathname === "/dark"
          ? "finishedProducts-dark"
          : "finishedProducts-light"
      }`}
    >
      <h2>
        That's all we have to offer. If you are looking for something specific
        and you cannot find it, please contact us at myemail@gmail.com
      </h2>
      <img src={"./assets/svg/404.svg"} alt={""} />
    </div>
  );
};

export default React.memo(FinishedProducts);
