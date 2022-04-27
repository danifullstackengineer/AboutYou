import { Link } from "react-router-dom";
import "../../styles/components/Checkout/HeaderCheckout.css";

function HeaderCheckout() {
  return (
    <div className="headerCheckout">
      <div>
        <Link to="/">Continue shopping</Link>
        <div className="headerCheckout__options">
          <Link to="/profile">My account</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/" onClick={()=>window.dispatchEvent(new Event("loggedOut"))}>Log out</Link>
          <Link to="/help">Help</Link>
        </div>
      </div>
    </div>
  );
}

export default HeaderCheckout;
