import "../../styles/components/Footer/SecondFooter.css";
import React from "react";

function SecondFooter({ chosenMode }: { chosenMode: boolean | undefined }) {
  return (
    <div
      className={`secondFooter ${
        chosenMode === false ? "secondFooter-dark" : "secondFooter-light"
      }`}
    >
      <footer>
        <img src={"/assets/svg/card.svg"} alt="/assets/svg/card.svg" />
        <img src={"/assets/svg/paypal.svg"} alt="/assets/svg/paypal.svg" />
        <img src={"/assets/svg/bitcoin.svg"} alt="/assets/svg/bitcoin.svg" />
      </footer>
    </div>
  );
}

export default React.memo(SecondFooter);
