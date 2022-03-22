import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/index.css";

import Header from "./components/Header/Header";
import HeaderAdd from "./components/Header/HeaderAdd";
import HeaderSmall from "./components/Header/HeaderSmall";
import Slider from "./components/Slider/SliderComp";
import Body from "./components/Body";
import Credential from "./components/Credentials/Credential";

function App() {
  const [clickedLogin, setClickedLogin] = useState<boolean>(false);
  return (
    <div className="main">
      <Router>
        <Routes>
          <Route
            path="/*"
            element={
              <>
                <Credential
                  clickedLogin={clickedLogin}
                  setClickedLogin={setClickedLogin}
                />
                <HeaderAdd />
                <Body setClickedLogin={setClickedLogin} />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
