import React, { useEffect, useState } from "react";
import "../../styles/Comp-Single/Suspense/MultipleProductSuspense.css";

const MultipleProductSuspense = () => {
  const [active, setActive] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      switch (active) {
        case 0:
          setActive(1);
          break;
        case 1:
          setActive(2);
          break;
        case 2:
          setActive(3);
          break;
        case 3:
          setActive(0);
          break;
        default:
          setActive(0);
      }
    }, 500);
    return () => clearInterval(timer);
  }, [active]);

  return (
    <div className="multipleProductSuspense">
      <div
        className={`multipleProductSuspense__loader ${
          active === 0 ? "multipleProductSuspense__loader-active" : ""
        }`}
      ></div>
      <div
        className={`multipleProductSuspense__loader ${
          active === 1 ? "multipleProductSuspense__loader-active" : ""
        }`}
      ></div>
      <div
        className={`multipleProductSuspense__loader ${
          active === 2 ? "multipleProductSuspense__loader-active" : ""
        }`}
      ></div>
      <div
        className={`multipleProductSuspense__loader ${
          active === 3 ? "multipleProductSuspense__loader-active" : ""
        }`}
      ></div>
    </div>
  );
};

export default React.memo(MultipleProductSuspense);
