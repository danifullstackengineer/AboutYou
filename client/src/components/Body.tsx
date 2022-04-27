import React, { useEffect } from "react";
import SliderComp from "./Slider/SliderComp";
import "../styles/components/Body.css";
import BodyInner from "./Body/BodyInner";

function Body({
  setClickedLogin,
  chosenMode,
  setClickedMenu,
  clickedMenu,
  setClickedBasket,
  setClickedWishlist,
  handleOpening,
  clickedBasket,
  clickedWishlist,
  custom,
  accessories
}: {
  setClickedLogin: React.Dispatch<React.SetStateAction<boolean>>;
  chosenMode: boolean | undefined;
  setClickedMenu: React.Dispatch<React.SetStateAction<boolean>>;
  clickedMenu: boolean;
  setClickedBasket: React.Dispatch<React.SetStateAction<boolean>>;
  setClickedWishlist: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpening: (type: "user" | "wishlist" | "basket" | "language") => void;
  clickedBasket: boolean;
  clickedWishlist: boolean;
  custom?:boolean;
  accessories?:boolean;
}) {

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
