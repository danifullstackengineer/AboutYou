import "../../styles/components/Footer/SecondFooter.css";
import card from "../../assets/svg/card.svg";
import paypal from "../../assets/svg/paypal.svg";
import bitcoin from "../../assets/svg/bitcoin.svg";

function SecondFooter() {
  return (
    <div className="secondFooter">
      <footer>
        <img src={card} alt="" />
        <img src={paypal} alt="" />
        <img src={bitcoin} alt="" />
      </footer>
    </div>
  );
}

export default SecondFooter;
