import React from "react";
import Header from "./Header";
import HeaderAdd from "./HeaderAdd";
import HeaderSmall from "./HeaderSmall";
import '../../styles/components/Header/HeaderBody.css';

function HeaderBody({
  setClickedLogin,
}: {
  setClickedLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="headerBody">
      <HeaderAdd />
      <Header setClickedLogin={setClickedLogin} />
      <HeaderSmall />
    </div>
  );
}

export default HeaderBody;
