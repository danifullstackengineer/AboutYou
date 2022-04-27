import React, { useEffect, useState } from "react";
import '../styles/Comp-Single/HeaderSticky.css';

function HeaderSticky({close} : {close: boolean}){

  
  return (
    <div
    className={`headerSticky ${close ? "headerSticky-close" : ""}`}
      style={{
        zIndex: 1,
        height: close ? "0" : "250px",
        width: "100%",
      }}
    ></div>
  );
}

export default React.memo(HeaderSticky);
