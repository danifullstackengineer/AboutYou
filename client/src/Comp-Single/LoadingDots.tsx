import React, { useEffect, useState } from "react";
import "../styles/Comp-Single/LoadingDots.css";

function LoadingDots() {
  const [loadingQueue, setLoadingQueue] = useState<boolean[]>([
    true,
    false,
    false,
  ]);
  const [runs, setRuns] = useState<number>(0);


    useEffect(() => {
        const interval = setInterval(()=>{
      if (loadingQueue[0]) {
            setLoadingQueue([false, true, false]);
        } else if (loadingQueue[1]) {
            setLoadingQueue([false, false, true]);
        } else if (loadingQueue[2]) {
            setLoadingQueue([true, false, false]);
          }
          setRuns(runs + 1);
    }, 500);

    return () => clearInterval(interval);
  }, [runs]);

  return (
    <div className="loadingDots">
      <div
        className={`loadingDots__dot ${
          loadingQueue[0] ? "loadingDots__dot-active" : ""
        }`}
      ></div>
      <div
        className={`loadingDots__dot ${
          loadingQueue[1] ? "loadingDots__dot-active" : ""
        }`}
      ></div>
      <div
        className={`loadingDots__dot ${
          loadingQueue[2] ? "loadingDots__dot-active" : ""
        }`}
      ></div>
    </div>
  );
}

export default LoadingDots;
