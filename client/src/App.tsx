import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/index.css";
import Body from "./components/Body";
import Credential from "./components/Credentials/Credential";
import HeaderBody from "./components/Header/HeaderBody";
import FooterBody from "./components/Footer/FooterBody";
import Wishlist from "./components/Wishlist/Wishlist";
import Checkout from "./components/Checkout/Checkout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { authJWT } from "./API/Credential";
import jwt from "jwt-decode";
import Basket from "./components/Basket/Basket";

function App() {
  const [clickedLogin, setClickedLogin] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState<string>("");

  const promise = loadStripe(
    "pk_test_51KXAUxDelfvIQhggA3tpu3fek1HqAwqYU7SAxvQJtBhcD2ULDWuzvd0KouPGX7HrgJ8xKZbqk49L1HTL5Vwh01nj00LQLjwQQf"
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      authJWT().then((res: any) => {
        if (!res.success) {
          localStorage.removeItem("token");
        }
      });
    }
  }, []);

  return (
    <div className="main">
      <Router>
        <Credential
          clickedLogin={clickedLogin}
          setClickedLogin={setClickedLogin}
        />
        <Routes>
          <Route
            path="/*"
            element={
              <>
                <HeaderBody setClickedLogin={setClickedLogin} />
                <Body setClickedLogin={setClickedLogin} />
                <FooterBody />
              </>
            }
          />
          <Route
            path="/wishlist"
            element={
              <>
                <HeaderBody setClickedLogin={setClickedLogin} />
                <Wishlist />
                <FooterBody />
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <Elements stripe={promise}>
                {" "}
                <Checkout setAmount={setAmount} checkout={true} />
              </Elements>
            }
          />
          <Route
            path="/payment"
            element={
              <Elements stripe={promise}>
                {" "}
                <Checkout amount={amount} payment={true} />
              </Elements>
            }
          />
          <Route
            path="/basket"
            element={
              <>
                <HeaderBody setClickedLogin={setClickedLogin} /> <Basket />
                <FooterBody />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
