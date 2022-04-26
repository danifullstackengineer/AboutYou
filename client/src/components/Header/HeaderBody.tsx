import React, { useEffect, useState } from "react";
import Header from "./Header";
import "../../styles/components/Header/HeaderBody.css";

function HeaderBody({
  setClickedLogin,
  chosenMode,
  setChosenMode,
  setClickedMenu,
  headerRef,
  clickedMenu,
  hideMode,
  custom,
  accessories
}: {
  setClickedLogin: React.Dispatch<React.SetStateAction<boolean>>;
  chosenMode: boolean | undefined;
  setChosenMode: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setClickedMenu: React.Dispatch<React.SetStateAction<boolean>>;
  headerRef: React.RefObject<HTMLDivElement>;
  clickedMenu: boolean;
  hideMode?: boolean;
  custom?: boolean;
  accessories?:boolean;
}) {

  return (
    <div className="headerBody">
      <Header
        setClickedMenu={setClickedMenu}
        setClickedLogin={setClickedLogin}
        chosenMode={chosenMode}
        setChosenMode={setChosenMode}
        headerRef={headerRef}
        clickedMenu={clickedMenu}
        hideMode={hideMode}
        custom={custom}
        accessories={accessories}
      />
    </div>
  );
}

export default HeaderBody;
