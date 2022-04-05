import "../../styles/components/Checkout/FooterCheckout.css";
import card from "../../assets/svg/card.svg";
import paypal from "../../assets/svg/paypal.svg";
import bitcoin from "../../assets/svg/bitcoin.svg";
import ssl from "../../assets/ssl/ssl.png";
import { Link } from "react-router-dom";

function FooterCheckout() {
  return (
    <div className="footerCheckout">
      <footer>
        <section>
          <h4>Shipping</h4>
          <div className="footerCheckout__options">
            <span>Free shipping</span>
            <span>30 day return policy</span>
            <span>More than 500 brands</span>
            <span>Secure payments</span>
          </div>
        </section>
        <section>
          <h4>Shop</h4>
          <div className="footerCheckout__options">
            <span>30 day return policy</span>
            <span>
              <Link to="">Contact form</Link>
            </span>
            <span>
              Email: <Link to="">youremail@gmail.com</Link>
            </span>
          </div>
        </section>
        <section>
          <h4>Pay securely with</h4>
          <span>
            <img src={card} alt={card} />
            <img src={paypal} alt={card} />
            <img src={bitcoin} alt={bitcoin} />
          </span>
        </section>
      </footer>
      <footer>
        <section>
          <img src={ssl} alt={ssl} />
        </section>
        <section>
          <Link to="">Contact</Link>
          <Link to="">Help</Link>
          <Link to="">Legal information</Link>
          <Link to="">Privacy policy</Link>
          <Link to="">Terms &amp; Conditions</Link>
          <Link to="">Terms of use</Link>
          <Link to="">Voucher conditions</Link>
        </section>
      </footer>
    </div>
  );
}

export default FooterCheckout;
