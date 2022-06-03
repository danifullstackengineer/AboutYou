import React, { useEffect, useState } from "react";
import "../styles/Comp-Single/LoadingProducts.css";
import { useLocation } from "react-router-dom";

const LoadingProducts = () => {
  const [active, setActive] = useState<number>(0);
  const [increment, setIncrement] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      setIncrement(!increment);
      if (active === 2) {
        setActive(0);
      } else {
        setActive(active + 1);
      }
    }, 500);
    return () => clearInterval(timer);
  }, [increment]);

  return (
    <div
      className={`loadingProducts ${
        location.pathname === "/dark"
          ? "loadingProducts-dark"
          : "loadingProducts-light"
      }`}
    >
      <div className={active === 0 ? "loadingProducts__active" : ""}></div>
      <div className={active === 1 ? "loadingProducts__active" : ""}></div>
      <div className={active === 2 ? "loadingProducts__active" : ""}></div>
    </div>
  );
};

export default React.memo(LoadingProducts);
