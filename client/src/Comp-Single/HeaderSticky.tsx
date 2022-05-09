import React, { useEffect, useState } from "react";
import '../styles/Comp-Single/HeaderSticky.css';

function HeaderSticky({close} : {close: boolean}){


  return (
    <div
    className={`headerSticky ${close ? "headerSticky-close" : ""}`}
    ></div>
  );
}

export default React.memo(HeaderSticky);
