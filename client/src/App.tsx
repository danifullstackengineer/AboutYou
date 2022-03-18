import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/index.css";

import Header from "./components/Header/Header";
import HeaderAdd from "./components/Header/HeaderAdd";
import HeaderSmall from './components/Header/HeaderSmall';

function App() {
  return (
    <div className="main">
      <Router>
        <Routes>
          <Route
            path="/*"
            element={
              <>
                <HeaderAdd />
                <Header />
                <HeaderSmall />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
