import { useEffect, useState } from "react";
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
import Basket from "./components/Basket/Basket";
import UserInformation from "./components/UserInformation/UserInformation";
import useTimer from "./Hooks/Timer";

function App() {
  const [clickedLogin, setClickedLogin] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("");

  const promise = loadStripe(
    "pk_test_51KXAUxDelfvIQhggA3tpu3fek1HqAwqYU7SAxvQJtBhcD2ULDWuzvd0KouPGX7HrgJ8xKZbqk49L1HTL5Vwh01nj00LQLjwQQf"
  );

  const [{ seconds, setIsPaused, isPaused }] = useTimer(10000);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      authJWT().then((res: any) => {
        if (!res.success) {
          if (!isPaused) {
            setIsPaused(true);
          }
          localStorage.removeItem("token");
          window.dispatchEvent(new Event("loggedOut"));
        } else {
          if (isPaused) {
            setIsPaused(false);
          }
        }
      });
    } else {
      window.dispatchEvent(new Event("loggedOut"));
      if (!isPaused) {
        setIsPaused(true);
      }
      window.addEventListener("loggedIn", () => {
        setIsPaused(true);
      });
      return () => window.removeEventListener("loggedIn", () => {});
    }
  }, [seconds]);

  const [disableClosing, setDisableClosing] = useState<boolean>(false);

  return (
    <div className="main">
      <Router>
        <Credential
          clickedLogin={clickedLogin}
          setClickedLogin={setClickedLogin}
          disableClosing={disableClosing}
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
                <Checkout
                  setAmount={setAmount}
                  checkout={true}
                  setClickedLogin={setClickedLogin}
                  setDisableClosing={setDisableClosing}
                />
              </Elements>
            }
          />
          <Route
            path="/payment"
            element={
              <Elements stripe={promise}>
                {" "}
                <Checkout
                  amount={amount}
                  payment={true}
                  setClickedLogin={setClickedLogin}
                  setDisableClosing={setDisableClosing}
                />
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
          <Route
            path="/payment/success"
            element={
              <>
                <Elements stripe={promise}>
                  <Checkout
                    amount={amount}
                    paid={true}
                    setClickedLogin={setClickedLogin}
                    setDisableClosing={setDisableClosing}
                  />
                </Elements>
              </>
            }
          />
          <Route
            path="/payment/failure"
            element={
              <>
                <Elements stripe={promise}>
                  <Checkout
                    amount={amount}
                    paid={true}
                    setClickedLogin={setClickedLogin}
                    setDisableClosing={setDisableClosing}
                  />
                </Elements>
              </>
            }
          />
          <Route
            path="/orders"
            element={
              <>
                <HeaderBody
                  setClickedLogin={setClickedLogin}
                  noSmallAdd={true}
                />
                <UserInformation
                  type={0}
                  setClickedLogin={setClickedLogin}
                  setDisableClosing={setDisableClosing}
                />
                <FooterBody />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <HeaderBody
                  setClickedLogin={setClickedLogin}
                  noSmallAdd={true}
                />
                <UserInformation
                  type={1}
                  setClickedLogin={setClickedLogin}
                  setDisableClosing={setDisableClosing}
                />
                <FooterBody />
              </>
            }
          />
          <Route
            path="/help"
            element={
              <>
                <HeaderBody
                  setClickedLogin={setClickedLogin}
                  noSmallAdd={true}
                />
                <UserInformation
                  type={2}
                  setClickedLogin={setClickedLogin}
                  setDisableClosing={setDisableClosing}
                />{" "}
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
