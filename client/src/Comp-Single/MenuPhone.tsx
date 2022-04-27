import React, { useContext, useRef } from 'react'
import { MobileContext } from '../Context/Mobile';
import '../styles/Comp-Single/MenuPhone.css';

const MenuPhone = ({
  clickedMenu,
  chosenMode,
  setClickedLogin,
  setChosenAction,
  setClickedBasket,
  setClickedWishlist,
  setClickedUser,
  setClickedLanguage,
  clickedBasket,
  clickedWishlist,
  clickedUser,
  clickedLanguage,
  handleOpening,
}: {
  clickedMenu: boolean;
  chosenMode: boolean | undefined;
  setClickedLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setChosenAction: React.Dispatch<React.SetStateAction<boolean[]>>;
  setClickedBasket: React.Dispatch<React.SetStateAction<boolean>>;
  setClickedWishlist: React.Dispatch<React.SetStateAction<boolean>>;
  setClickedUser: React.Dispatch<React.SetStateAction<boolean>>;
  setClickedLanguage: React.Dispatch<React.SetStateAction<boolean>>;
  clickedBasket: boolean;
  clickedWishlist: boolean;
  clickedUser: boolean;
  clickedLanguage: boolean;
  handleOpening: (type: "basket" | "wishlist" | "user" | "language") => void;}) => {

    const mainRef = useRef<HTMLDivElement>(null);
    
    const mContext = useContext(MobileContext);

  return (
    <div className={`menuPhone ${chosenMode === false ? "menuPhone-dark" : "menuPhone-light"} ${clickedMenu ? "menuPhone-active" : "menuPhone-inactive"} ${mContext.isMobile ? "menuPhone-mobile" : ""}`} ref={mainRef}>
      <div className={`menuPhone__top`}>
        <button onClick={() => handleOpening("basket")}>Basket</button>
        <button onClick={()=> handleOpening("wishlist")}>Wishlist</button>
        <button onClick={() => handleOpening("user")}>Account</button>
        <button onClick={() => handleOpening("language")}>Language</button>
        <button>
          <img src={"/assets/svg/dropdown-dark.svg"} alt={""} loading={"lazy"}/>
        </button>
      </div>
      <div className={`menuPhone__bottom`}></div>
    </div>
  )
}

export default MenuPhone