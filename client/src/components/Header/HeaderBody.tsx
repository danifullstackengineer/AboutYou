import React from "react";
import Header from "./Header";
import HeaderAdd from "./HeaderAdd";
import HeaderSmall from "./HeaderSmall";
import '../../styles/components/Header/HeaderBody.css';

function HeaderBody({
  setClickedLogin,
  noSmallAdd
}: {
    setClickedLogin: React.Dispatch<React.SetStateAction<boolean>>;
    noSmallAdd?: boolean;
}) {
  return (
    <div className="headerBody">
      <HeaderAdd />
      <Header setClickedLogin={setClickedLogin} />
      {!noSmallAdd ? <HeaderSmall /> : ""}
    </div>
  );
}

export default HeaderBody;
