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
import { MdOutlineDeliveryDining } from "react-icons/md";
import DropdownImg from "../Dropdown/DropdownImg";
import DropdownBrands from "../Dropdown/DropdownBrands";

// Images
import dropdownOne1 from "../../assets/dropdown/dropdownOne/one.webp";
import dropdownOne2 from "../../assets/dropdown/dropdownOne/two.webp";
import dropdownOne3 from "../../assets/dropdown/dropdownOne/three.webp";
import dropdownOne4 from "../../assets/dropdown/dropdownOne/four.webp";

import dropdownTwo1 from "../../assets/dropdown/dropdownTwo/one.jpg";
import dropdownTwo2 from "../../assets/dropdown/dropdownTwo/two.jpg";
import dropdownTwo3 from "../../assets/dropdown/dropdownTwo/three.jpg";
import dropdownTwo4 from "../../assets/dropdown/dropdownTwo/four.jpg";

//Brands
import brandOne1 from "../../assets/dropdown/brands/one/only.webp";
import brandOne2 from "../../assets/dropdown/brands/one/vero-moda.webp";
import brandOne3 from "../../assets/dropdown/brands/one/about-you.webp";
import brandOne4 from "../../assets/dropdown/brands/one/le-ger.webp";
import brandOne5 from "../../assets/dropdown/brands/one/vila.webp";
import brandOne6 from "../../assets/dropdown/brands/one/edited.webp";
import brandOne7 from "../../assets/dropdown/brands/one/pieces.webp";
import brandOne8 from "../../assets/dropdown/brands/one/guido.webp";
import brandOne9 from "../../assets/dropdown/brands/one/oliver.webp";
import brandOne10 from "../../assets/dropdown/brands/one/rawwear.webp";

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

  const [dropdownOne, setDropdownOne] = useState<
    {
      image: string;
      title: string;
      item: string;
    }[]
  >([
    {
      image: dropdownOne1,
      title: "Lena Gercke",
      item: "Striped Shirt Lsddssds",
    },
    { image: dropdownOne2, title: "Tara Zoe", item: "Classy Long Blouse" },
    {
      image: dropdownOne3,
      title: "Lilia for LeGer",
      item: "Black Shirt Zebra",
    },
    {
      image: dropdownOne4,
      title: "Kianush for LeGer",
      item: "Black Mesh Jeans",
    },
  ]);

  const [dropdownTwo, setDropdownTwo] = useState<
    { image: string; title: string; item: string; special: boolean }[]
  >([
    {
      image: dropdownTwo1,
      title: "Bodytype: Wider Hips",
      item: "Swimwear for Curves",
      special: true,
    },
    {
      image: dropdownTwo2,
      title: "Feel Good",
      item: "Swimsuits",
      special: true,
    },
    {
      image: dropdownTwo3,
      title: "Coat trends that are ruling the season",
      item: "Transitional Coats",
      special: true,
    },
    {
      image: dropdownTwo4,
      title: "Stolen looks from your dads closet",
      item: "Dad-Style",
      special: true,
    },
  ]);

  const [categoriesOne, setCategoriesOne] = useState<
    {
      category: { name: string; types: { name: string; special?: boolean }[] };
    }[]
  >([
    {
      category: {
        name: "Categories",
        types: [
          { name: "New" },
          { name: "Trending" },
          { name: "Jackets" },
          { name: "Coats" },
          { name: "Dresses" },
          { name: "Sweaters & knitwear" },
          { name: "Tops" },
          { name: "Jeans" },
          { name: "Pants" },
          { name: "Sweaters & hoodies" },
          { name: "Blouses & tunics" },
          { name: "Underwear" },
          { name: "Swimwear" },
          { name: "Skirts" },
          { name: "Plus sizes" },
          { name: "Maternity wear" },
          { name: "Occasions" },
          { name: "Blazers" },
          { name: "Jumpsuits & playsuits" },
          { name: "Show more", special: true },
        ],
      },
    },
    {
      category: {
        name: "Highlights",
        types: [
          { name: "More sustainable" },
          { name: "Exclusive" },
          { name: "Premium" },
        ],
      },
    },
    {
      category: {
        name: "Shop by fit",
        types: [
          { name: "Curvy" },
          { name: "Petite" },
          { name: "Tall" },
          { name: "Materynity wear" },
        ],
      },
    },
  ]);

  const [brandOne, setBrandOne] = useState<{
    name: string;
    images: { img: string }[];
  }>({
    name: "Top Brands",
    images: [
      { img: brandOne1 },
      { img: brandOne2 },
      { img: brandOne3 },
      { img: brandOne4 },
      { img: brandOne5 },
      { img: brandOne6 },
      { img: brandOne7 },
      { img: brandOne8 },
      { img: brandOne9 },
      { img: brandOne10 },
    ],
  });

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
            <div className="header__top-option-pop-up header__top-option-pop-up-user">
              <div className="header__top-option-pop-up-user-text">
                You are not registered yet
              </div>
              <button className="header__top-option-pop-up-user-btn">
                Log in
              </button>
              <div className="header__top-option-pop-up-user-border"></div>
              <div className="header__top-option-pop-up-user-options">
                <div className="header__top-option-pop-up-user-option">
                  <span className="header__top-option-pop-up-user-option-icon">
                    <MdOutlineDeliveryDining />
                  </span>
                  <span className="header__top-option-pop-up-user-option-text">
                    Track your orders
                  </span>
                </div>
                <div className="header__top-option-pop-up-user-option">
                  <span className="header__top-option-pop-up-user-option-icon">
                    <AiOutlineHeart />
                  </span>
                  <span className="header__top-option-pop-up-user-option-text">
                    Like your favorites
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="header__top-option">
            <AiOutlineHeart />
            <div className="header__top-option-pop-up header__top-option-pop-up-fav">
              <div className="header__top-option-pop-up-fav-text">
                Your wishlist is empty!
              </div>
              <div className="header__top-option-pop-up-fav-border"></div>
              <div className="header__top-option-pop-up-fav-text2">
                <span>
                  Select{" "}
                  <span className="header__top-option-pop-up-fav-heart">
                    <AiOutlineHeart />
                  </span>{" "}
                  to add something to your Wishlist
                </span>
              </div>
            </div>
            <div className="header__top-option-pop-up header__top-option-pop-up-wishlist">
              <button>Wishlist</button>
            </div>
          </div>
          <div className="header__top-option">
            <BsBasket3 />
            <div className="header__top-option-pop-up header__top-option-pop-up-basket">
              <div className="header__top-option-pop-up-basket-text">
                Your basket is empty!
              </div>
              <div className="header__top-option-pop-up-basket-border"></div>
              <div className="header__top-option-pop-up-basket-text2">
                Add item(s) to your basket.
              </div>
            </div>
            <div className="header__top-option-pop-up header__top-option-basket-second">
              <div className="header__top-option-pop-up-basket-text">
                Haven't found anything yet?
              </div>
              <button>Shop new items</button>
              <button>Discover outfits</button>
            </div>
          </div>
        </div>
      </div>
      <div className="header__bottom">
        <div className="header__bottom-option">
          <span>Outfits</span>
          <div className="header__bottom-option-pop-up">
            <DropdownImg itemProps={dropdownOne} />
          </div>
        </div>
        <div className="header__bottom-option">
          <span>Stories</span>
          <div className="header__bottom-option-pop-up">
            <DropdownImg itemProps={dropdownTwo} />
          </div>
        </div>
        <div className="header__bottom-option">
          <span>Clothing</span>
          <div className="header__bottom-option-pop-up">
            <DropdownBrands itemProps={categoriesOne} imageProps={brandOne} />
          </div>
        </div>
        <div className="header__bottom-option">
          <span>Shoes</span>
          <div className="header__bottom-option-pop-up"></div>
        </div>
        <div className="header__bottom-option">
          <span>Sportswear</span>
          <div className="header__bottom-option-pop-up"></div>
        </div>
        <div className="header__bottom-option">
          <span>Accessories</span>
          <div className="header__bottom-option-pop-up"></div>
        </div>
        <div className="header__bottom-option">
          <span>Premium</span>
          <div className="header__bottom-option-pop-up"></div>
        </div>
        <div className="header__bottom-option header__bottom-option-special">
          <span>SALE</span>
          <div className="header__bottom-option-pop-up"></div>
        </div>
        <div className="header__bottom-option">
          <span>Brands</span>
          <div className="header__bottom-option-pop-up"></div>
        </div>
      </div>
    </div>
  );
}

export default Header;
