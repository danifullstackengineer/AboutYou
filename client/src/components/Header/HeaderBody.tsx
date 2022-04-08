import React, { useEffect, useState } from "react";
import Header from "./Header";
import HeaderAdd from "./HeaderAdd";
import HeaderSmall from "./HeaderSmall";
import "../../styles/components/Header/HeaderBody.css";

function HeaderBody({
  setClickedLogin,
  noSmallAdd,
}: {
  setClickedLogin: React.Dispatch<React.SetStateAction<boolean>>;
  noSmallAdd?: boolean;
}) {
  const [hidden, setHidden] = useState<boolean>(false);

  useEffect(() => {
    const smallAdd = localStorage.getItem("headerSmall");
    if (smallAdd && smallAdd === "true") {
      setHidden(true);
    } else {
      setHidden(false);
    }
  }, []);

  return (
    <div className="headerBody">
      <HeaderAdd />
      <Header setClickedLogin={setClickedLogin} />
      {!noSmallAdd && !hidden ? <HeaderSmall/> : ""}
    </div>
  );
}

export default HeaderBody;
