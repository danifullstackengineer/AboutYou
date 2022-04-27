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
  custom,
  accessories,
  close
}: {
  setClickedLogin: React.Dispatch<React.SetStateAction<boolean>>;
  chosenMode: boolean | undefined;
  setChosenMode: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setClickedMenu: React.Dispatch<React.SetStateAction<boolean>>;
  headerRef: React.RefObject<HTMLDivElement>;
  clickedMenu: boolean;
  custom?: boolean;
  accessories?:boolean;
  close:boolean;
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
        custom={custom}
        accessories={accessories}
        close={close}
      />
    </div>
  );
}

export default HeaderBody;
