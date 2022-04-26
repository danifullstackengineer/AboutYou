import React, { useEffect } from "react";
import SliderComp from "./Slider/SliderComp";
import "../styles/components/Body.css";
import BodyInner from "./Body/BodyInner";

function Body({
  setClickedLogin,
  chosenMode,
  setHeight,
  setClickedMenu,
  clickedMenu,
  setClickedBasket,
  setClickedWishlist,
  setClickedUser,
  setClickedLanguage,
  handleOpening,
  clickedBasket,
  clickedWishlist,
  custom,
  accessories
}: {
  setClickedLogin: React.Dispatch<React.SetStateAction<boolean>>;
  chosenMode: boolean | undefined;
  setHeight: React.Dispatch<React.SetStateAction<number | undefined>>;
  setClickedMenu: React.Dispatch<React.SetStateAction<boolean>>;
  clickedMenu: boolean;
  setClickedBasket: React.Dispatch<React.SetStateAction<boolean>>;
  setClickedWishlist: React.Dispatch<React.SetStateAction<boolean>>;
  setClickedUser: React.Dispatch<React.SetStateAction<boolean>>;
  setClickedLanguage: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpening: (type: "user" | "wishlist" | "basket" | "language") => void;
  clickedBasket: boolean;
  clickedWishlist: boolean;
  custom?:boolean;
  accessories?:boolean;
}) {
  useEffect(() => {
    setHeight(250);
  }, []);

  return (
    <div className="body">
      <SliderComp chosenMode={chosenMode} />
      <BodyInner
        setClickedLogin={setClickedLogin}
        chosenMode={chosenMode}
        setClickedMenu={setClickedMenu}
        clickedMenu={clickedMenu}
        setClickedBasket={setClickedBasket}
        setClickedWishlist={setClickedWishlist}
        setClickedUser={setClickedUser}
        setClickedLanguage={setClickedLanguage}
        handleOpening={handleOpening}
        clickedBasket={clickedBasket}
        clickedWishlist={clickedWishlist}
        custom={custom}
        accessories={accessories}
      />
    </div>
  );
}

export default React.memo(Body);
