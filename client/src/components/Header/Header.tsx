import React, { useState, useRef } from "react";
import "../../styles/components/Header/Header.css";
import mainLogo from "../../assets/svg/mainLogo.svg";
import { AiOutlineSearch } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBasket3 } from "react-icons/bs";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import germanyFlag from "../../assets/country-flags/de.svg";
import romaniaFlag from "../../assets/country-flags/ro.svg";
import serbiaFlag from "../../assets/country-flags/rs.svg";
import russianFlag from "../../assets/country-flags/ru.svg";
import netherlandsFlag from "../../assets/country-flags/nl.svg";
import japaneseFlag from "../../assets/country-flags/jp.svg";
import { BsCheck } from "react-icons/bs";

function Header() {
  const [selectedType, setSelectedType] = useState<boolean[]>([
    true,
    false,
    false,
  ]);
  const [selectedLang, setSelectedLang] = useState<boolean[]>([true, false]);

  const [languages, setLanguages] = useState<
    { name: string; flag?: string; worldwide?: boolean; selected?: boolean }[]
  >([
    {
      name: "Germany",
      flag: germanyFlag,
    },
    {
      name: "Romania",
      flag: romaniaFlag,
    },
    {
      name: "Serbia",
      flag: serbiaFlag,
    },
    {
      name: "Netherlands",
      flag: netherlandsFlag,
    },
    {
      name: "Russia",
      flag: russianFlag,
    },
    {
      name: "Japanese",
      flag: japaneseFlag,
    },
    {
      name: "Worldwide",
      worldwide: true,
      selected: true,
    },
  ]);

  const [search, setSearch] = useState<string>();
  const inputRef = useRef<HTMLDivElement>(null);
  const [toggleSearch, setToggleSearch] = useState<boolean>(false);
  const [toggleLang, setToggleLang] = useState<boolean>();

  const handleSearchClick = () => {
    if (inputRef.current) {
      if (toggleSearch) {
        setToggleSearch(false);
      } else {
        setToggleSearch(true);
      }
    }
  };

  const handleCountryHover = () => {};

  const openLangSelect = () => {
    if (toggleLang === undefined) {
      setToggleLang(true);
      return;
    } else {
      setToggleLang(!toggleLang);
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
          <div
            className={`header__top-option header__top-option-not ${
              toggleSearch ? "header__top-option-not-anim" : ""
            }`}
          >
            <div
              className={`header__top-option-search-icon ${
                toggleSearch ? "header__top-option-search-icon-anim" : ""
              }`}
              onClick={handleSearchClick}
              ref={inputRef}
            >
              <AiOutlineSearch />
            </div>
            <div
              className={`header__top-option-search ${
                toggleSearch ? "header__top-option-search-anim" : ""
              }`}
            >
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
            <div
              className={`header__top-option-pop-up header__top-option-pop-up-lang`}
            >
              <div className="header__top-option-pop-up-lang-text">
                <span>
                  <BiWorld />
                </span>
                <span>Language and Country</span>
              </div>
              <div className="header__top-option-pop-up-lang-btns">
                <button
                  onClick={() => setSelectedLang([true, false])}
                  className={`${
                    selectedLang[0]
                      ? "header__top-option-pop-up-lang-btn-selected"
                      : ""
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setSelectedLang([false, true])}
                  className={`${
                    selectedLang[1]
                      ? "header__top-option-pop-up-lang-btn-selected"
                      : ""
                  }`}
                >
                  Spanish
                </button>
              </div>
              <div
                className="header__top-option-pop-up-lang-select"
                onClick={openLangSelect}
              >
                <span className="header__top-option-pop-up-lang-select-shop">
                  Current Shop
                </span>
                <span>
                  <span>
                    <BiWorld />
                  </span>{" "}
                  <span>Worldwide</span>{" "}
                  <span>
                    {!toggleLang ? <IoIosArrowDown /> : <IoIosArrowUp />}
                  </span>
                </span>
              </div>
              <div
                className={
                  toggleLang === undefined
                    ? "header__top-option-pop-up-lang-selections-first-time"
                    : !toggleLang
                    ? "header__top-option-pop-up-lang-selections"
                    : "header__top-option-pop-up-lang-selections-shown"
                }
              >
                {languages.map((language, i) => {
                  return (
                    <div
                      key={i}
                      className="header__top-option-pop-up-lang-selection"
                    >
                      <div className="header__top-option-pop-up-lang-selection-mark">
                        {language.selected ? <BsCheck /> : ""}
                      </div>
                      <span
                        className={
                          language.selected
                            ? "header__top-option-pop-up-lang-selection-selected"
                            : "header__top-option-pop-up-lang-selection-unselected"
                        }
                      >
                        {language.name}
                      </span>
                      {!language.worldwide ? (
                        <img src={language.flag as string} alt="" />
                      ) : (
                        <div className="header__top-option-pop-up-lang-selection-worldwide">
                          <BiWorld />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
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
        <div className="header__bottom-option">Outfits</div>
        <div className="header__bottom-option">Stories</div>
        <div className="header__bottom-option">Clothing</div>
        <div className="header__bottom-option">Shoes</div>
        <div className="header__bottom-option">Sportswear</div>
        <div className="header__bottom-option">Accessories</div>
        <div className="header__bottom-option">Premium</div>
        <div className="header__bottom-option header__bottom-option-special">
          SALE
        </div>
        <div className="header__bottom-option">Brands</div>
      </div>
    </div>
  );
}

export default Header;
