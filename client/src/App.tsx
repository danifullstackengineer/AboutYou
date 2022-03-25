import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/index.css";
import Body from "./components/Body";
import Credential from "./components/Credentials/Credential";
import HeaderBody from "./components/Header/HeaderBody";
import FooterBody from "./components/Footer/FooterBody";
import Wishlist from "./components/Wishlist/Wishlist";
import Checkout from "./components/Checkout/Checkout";

function App() {
  const [clickedLogin, setClickedLogin] = useState<boolean>(false);
  const dispatch = useDispatch();
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
                <Body />
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
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
