import React from "react";
import "../../styles/components/Footer/FooterBody.css";
import FifthFooter from "./FifthFooter";
import FirstFooter from "./FirstFooter";
import SecondFooter from "./SecondFooter";
import SixthFooter from "./SixthFooter";

function FooterBody({chosenMode}: {chosenMode?: boolean | undefined}) {
  return (
    <div className="footerBody">
      <FirstFooter />
      <SecondFooter chosenMode={chosenMode}/>
      <FifthFooter chosenMode={chosenMode}/>
      <SixthFooter chosenMode={chosenMode}/>
    </div>
  );
}

export default React.memo(FooterBody);
