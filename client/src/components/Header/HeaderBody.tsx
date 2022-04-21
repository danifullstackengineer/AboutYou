import React, { useEffect, useState } from "react";
import Header from "./Header";
import "../../styles/components/Header/HeaderBody.css";

function HeaderBody({
  setClickedLogin,
  chosenMode,
  setChosenMode,
  setClickedMenu,
  currentOption,
  setCurrentOption,
  headerRef,
  clickedMenu,
  hideMode,
}: {
  setClickedLogin: React.Dispatch<React.SetStateAction<boolean>>;
  chosenMode: boolean | undefined;
  setChosenMode: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setClickedMenu: React.Dispatch<React.SetStateAction<boolean>>;
  currentOption: boolean[];
  setCurrentOption: React.Dispatch<React.SetStateAction<boolean[]>>;
  headerRef: React.RefObject<HTMLDivElement>;
  clickedMenu: boolean;
  hideMode?: boolean;
}) {

  return (
    <div className="headerBody">
      <Header
        setCurrentOption={setCurrentOption}
        currentOption={currentOption}
        setClickedMenu={setClickedMenu}
        setClickedLogin={setClickedLogin}
        chosenMode={chosenMode}
        setChosenMode={setChosenMode}
        headerRef={headerRef}
        clickedMenu={clickedMenu}
        hideMode={hideMode}
      />
    </div>
  );
}

export default HeaderBody;
