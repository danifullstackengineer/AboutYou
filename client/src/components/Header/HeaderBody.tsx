import React from "react";
import Header from "./Header";
import "../../styles/components/Header/HeaderBody.css";
import HeaderSticky from "../../Comp-Single/HeaderSticky";

function HeaderBody({
  setClickedLogin,
  chosenMode,
  setChosenMode,
  setClickedMenu,
  headerRef,
  clickedMenu,
  custom,
  accessories,
}: {
  setClickedLogin: React.Dispatch<React.SetStateAction<boolean>>;
  chosenMode: boolean | undefined;
  setChosenMode: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setClickedMenu: React.Dispatch<React.SetStateAction<boolean>>;
  headerRef: React.RefObject<HTMLDivElement>;
  clickedMenu: boolean;
  custom?: boolean;
  accessories?: boolean;
}) {
  return (
    <div className="headerBody">
      <HeaderSticky headerRef={headerRef}/>
      <Header
        setClickedMenu={setClickedMenu}
        setClickedLogin={setClickedLogin}
        chosenMode={chosenMode}
        setChosenMode={setChosenMode}
        headerRef={headerRef}
        clickedMenu={clickedMenu}
        custom={custom}
        accessories={accessories}
      />
    </div>
  );
}

export default React.memo(HeaderBody);
