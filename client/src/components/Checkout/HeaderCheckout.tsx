import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/Auth";
import "../../styles/components/Checkout/HeaderCheckout.css";

function HeaderCheckout({
  setChosenAction,
  setClickedLogin,
}: {
  setChosenAction: React.Dispatch<React.SetStateAction<boolean[]>>;
  setClickedLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const aContext = useContext(AuthContext);

  const handleLogin = (): void => {
    setChosenAction([false, true]);
    setClickedLogin(true);
  };
  const handleRegister = (): void => {
    setChosenAction([true, false]);
    setClickedLogin(true);
  };

  return (
    <div className="headerCheckout">
      <div>
        <Link to="/">Continue shopping</Link>
        <div className="headerCheckout__options">
          {aContext.isLoggedIn ? <Link to="/profile">My account</Link> : ""}
          {aContext.isLoggedIn ? <Link to="/orders">Orders</Link> : ""}
          {aContext.isLoggedIn ? (
            <Link
              to="/"
              onClick={() =>
                aContext.isLoggedIn ? aContext.logout() : undefined
              }
            >
              Log out
            </Link>
          ) : (
            <>
              <Link onClick={handleLogin} to={""}>
                Log In
              </Link>
              <Link onClick={handleRegister} to={""}>
                Register
              </Link>
            </>
          )}
          <Link to="/help">Help</Link>
        </div>
      </div>
    </div>
  );
}

export default HeaderCheckout;
