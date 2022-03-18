import React, { useState, useRef } from "react";
import "../../styles/components/Header/Header.css";
import mainLogo from "../../assets/svg/mainLogo.svg";
import { AiOutlineSearch } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBasket3 } from "react-icons/bs";

function Header() {
  const [selectedType, setSelectedType] = useState<boolean[]>([
    true,
    false,
    false,
  ]);

  const [search, setSearch] = useState<string>();
  const inputRef = useRef<HTMLDivElement>(null);
  const [toggleSearch, setToggleSearch] = useState<boolean>(false);

  const handleSearchClick = () => {
    if (inputRef.current) {
      if (toggleSearch) {
        inputRef.current.style.display = "none";
        setToggleSearch(false);
      }
      else {
        inputRef.current.style.display = "flex";
        setToggleSearch(true);
      }
    }
  };

  return (
    <div className="header">
      <div className="header__top">
        <div className="header__top-selections">
          <div
            onClick={() => setSelectedType([true, false, false])}
            className={`header__top-selection ${
              selectedType[0] ? "header__top-selection-special" : ""
            }`}
          >
            Women
          </div>
          <div
            onClick={() => setSelectedType([false, true, false])}
            className={`header__top-selection ${
              selectedType[1] ? "header__top-selection-special" : ""
            }`}
          >
            Men
          </div>
          <div
            onClick={() => setSelectedType([false, false, true])}
            className={`header__top-selection ${
              selectedType[2] ? "header__top-selection-special" : ""
            }`}
          >
            Kids
          </div>
        </div>
        <div className="header__top-logo">
          <div className="header__top-logo-container">
            <span className="header__top-logo-about">ABOUT</span>
            <div className="header__top-logo-you">
              <span className="header__top-logo-you-text">YOU</span>
              <img src={mainLogo}></img>
            </div>
          </div>
        </div>
        <div className="header__top-options">
          <div className="header__top-option" onClick={handleSearchClick}>
            <AiOutlineSearch />
            <div className="header__top-option-search" ref={inputRef}>
              <form>
                <input
                  type="text"
                  name="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search for brands, items &amp; more..."
                />
              </form>
            </div>
          </div>
          <div className="header__top-option header__top-option-special">
            <BiWorld />
            <div className="header__top-option-lang">EN</div>
          </div>
          <div className="header__top-option">
            <BiUser />
          </div>
          <div className="header__top-option">
            <AiOutlineHeart />
          </div>
          <div className="header__top-option">
            <BsBasket3 />
          </div>
        </div>
      </div>
      <div className="header__bottom">
        <div className="header__bottom-option">
          Outfits
        </div>
        <div className="header__bottom-option">
          Stories
        </div>
        <div className="header__bottom-option">
          Clothing
        </div>
        <div className="header__bottom-option">
          Shoes
        </div>
        <div className="header__bottom-option">
          Sportswear
        </div>
        <div className="header__bottom-option">
          Accessories
        </div>
        <div className="header__bottom-option">
          Premium
        </div>
        <div className="header__bottom-option header__bottom-option-special">
          SALE
        </div>
        <div className="header__bottom-option">
          Brands
        </div>
      </div>
    </div>
  );
}

export default Header;
