import React from "react";
import ThirdFooter from "../components/Footer/ThirdFooter";
import "../styles/Comp-Single/Subscribe.css";

function Subscribe({
  setClosedSubscribe,
}: {
  setClosedSubscribe: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="subscribe">
      <ThirdFooter setClosedSubscribe={setClosedSubscribe} />
      <div className="subscribe__overlay"></div>
    </div>
  );
}

export default Subscribe;
