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

import brandTwo1 from "../../assets/dropdown/brands/two/adidas.webp";
import brandTwo2 from "../../assets/dropdown/brands/two/tamaris.webp";
import brandTwo3 from "../../assets/dropdown/brands/one/about-you.webp";
import brandTwo4 from "../../assets/dropdown/brands/two/puma.webp";
import brandTwo5 from "../../assets/dropdown/brands/two/rebook.webp";
import brandTwo6 from "../../assets/dropdown/brands/two/marco.webp";
import brandTwo7 from "../../assets/dropdown/brands/two/img.webp";
import brandTwo8 from "../../assets/dropdown/brands/two/tommy.webp";

import brandThree1 from "../../assets/dropdown/brands/two/adidas.webp";
import brandThree2 from "../../assets/dropdown/brands/two/puma.webp";
import brandThree3 from "../../assets/dropdown/brands/three/special.webp";
import brandThree4 from "../../assets/dropdown/brands/three/only-play.webp";
import brandThree5 from "../../assets/dropdown/brands/three/cmp.webp";

import brandFour1 from "../../assets/dropdown/brands/one/about-you.webp";
import brandFour2 from "../../assets/dropdown/brands/two/tommy.webp";
import brandFour3 from "../../assets/dropdown/brands/four/guess.webp";
import brandFour4 from "../../assets/dropdown/brands/two/tamaris.webp";
import brandFour5 from "../../assets/dropdown/brands/four/klein.webp";
import brandFour6 from "../../assets/dropdown/brands/four/joop.webp";
import brandFour7 from "../../assets/dropdown/brands/one/le-ger.webp";

import brandFive1 from "../../assets/dropdown/brands/five/hugo.webp";
import brandFive2 from "../../assets/dropdown/brands/four/klein.webp";
import brandFive3 from "../../assets/dropdown/brands/four/joop.webp";
import brandFive4 from "../../assets/dropdown/brands/five/about-you-sm.webp";
import brandFive5 from "../../assets/dropdown/brands/five/kennel.webp";
import brandFive6 from "../../assets/dropdown/brands/five/pepe.webp";
import brandFive7 from "../../assets/dropdown/brands/five/boss.webp";
import brandFive8 from "../../assets/dropdown/brands/five/drykorn.webp";
import brandFive9 from "../../assets/dropdown/brands/five/blauer.webp";
import brandFive10 from "../../assets/dropdown/brands/five/boss.webp";

import brandSix1 from "../../assets/dropdown/brands/six/large.webp";

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
      category: {
        name: string;
        special: boolean;
        types: { name: string; special?: boolean }[];
      };
    }[]
  >([
    {
      category: {
        special: true,
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
        special: false,
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
        special: false,
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

  const [categoriesTwo, setCategoriesTwo] = useState<
    {
      category: {
        name: string;
        special: boolean;
        types: { name: string; special?: boolean }[];
      };
    }[]
  >([
    {
      category: {
        special: true,
        name: "Categories",
        types: [
          {
            name: "New",
          },
          {
            name: "Trending",
          },
          {
            name: "Ankle boots",
          },
          {
            name: "Boots",
          },
          {
            name: "Sneakers",
          },
          { name: "High heels" },
          {
            name: "Sandals",
          },
          {
            name: "Sports shoes",
          },
          {
            name: "Low shoes",
          },
          {
            name: "Slip-ons",
          },
          {
            name: "Slippers",
          },
          {
            name: "Ballet flats",
          },
          {
            name: "Exclusive",
          },
          {
            name: "More sustainable",
          },
        ],
      },
    },
  ]);

  const [brandTwo, setBrandTwo] = useState<{
    name: string;
    images: { img: string }[];
  }>({
    name: "Top Brands",
    images: [
      { img: brandTwo1 },
      { img: brandTwo2 },
      { img: brandTwo3 },
      { img: brandTwo4 },
      { img: brandTwo5 },
      { img: brandTwo6 },
      { img: brandTwo7 },
      { img: brandTwo8 },
    ],
  });

  const [categoriesFour, setCategoriesFour] = useState<
    {
      category: {
        name: string;
        special: boolean;
        types: { name: string; special?: boolean }[];
      };
    }[]
  >([
    {
      category: {
        special: true,
        name: "Categories",
        types: [
          { name: "New" },
          { name: "Bags & backpacks" },
          { name: "Jewelry" },
          { name: "Hats & caps" },
          { name: "Scarves & Wraps" },
          { name: "Belts" },
          { name: "Wallets" },
          { name: "Sunglasses" },
          { name: "Gloves" },
          { name: "Hair accessories" },
          { name: "Smartphone cases" },
          { name: "Fabric masks" },
          { name: "Exclusive" },
          { name: "More sustainable" },
        ],
      },
    },
  ]);

  const [brandFour, setBrandFour] = useState<{
    name: string;
    images: { img: string }[];
  }>({
    name: "Top Brands",
    images: [
      { img: brandFour1 },
      { img: brandFour2 },
      { img: brandFour3 },
      { img: brandFour4 },
      { img: brandFour5 },
      { img: brandFour6 },
      { img: brandFour7 },
    ],
  });

  const [categoriesFive, setCategoriesFive] = useState<
    {
      category: {
        name: string;
        special: boolean;
        types: { name: string; special?: boolean }[];
      };
    }[]
  >([
    {
      category: {
        special: true,
        name: "Categories",
        types: [
          { name: "New" },
          { name: "Jackets & coats" },
          { name: "Dresses" },
          { name: "Knitwear" },
          { name: "Tops" },
          { name: "Jeans" },
          { name: "Sweaters & hoodies" },
          { name: "Pants" },
          { name: "Blouses & tunics" },
          { name: "Underwear & swimwear" },
          { name: "Skirts" },
          { name: "Jumpsuits & playsuits" },
          { name: "Shoes" },
          { name: "Accessories" },
        ],
      },
    },
  ]);

  const [brandFive, setBrandFive] = useState<{
    name: string;
    images: { img: string }[];
  }>({
    name: "Top Brands",
    images: [
      { img: brandFive1 },
      { img: brandFive2 },
      { img: brandFive3 },
      { img: brandFive4 },
      { img: brandFive5 },
      { img: brandFive6 },
      { img: brandFive7 },
      { img: brandFive8 },
      { img: brandFive9 },
      { img: brandFive10 },
    ],
  });

  const [categoriesSix, setCategoriesSix] = useState<
    {
      category: {
        name: string;
        special: boolean;
        types: { name: string; special?: boolean }[];
      };
    }[]
  >([
    {
      category: {
        special: true,
        name: "",
        types: [
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
          { name: "Blazers" },
          { name: "Jumpsuits & playsuits" },
          { name: "Shoes" },
          { name: "Accessories" },
          { name: "Premium" },
          { name: "Show more", special: true },
        ],
      },
    },
  ]);

  const [categoriesSeven, setCategoriesSeven] = useState<
    {
      category: {
        name: string;
        special: boolean;
        types: {
          name: string;
          special?: boolean;
          underlined?: boolean;
          specialMargin?: true;
        }[];
      };
    }[]
  >([
    {
      category: {
        special: true,
        name: "",
        types: [
          { name: "ONLY", underlined: true },
          { name: "ABOUT YOU", underlined: true },
          { name: "VERO MODA", underlined: true },
          { name: "LeGer by Lena Gercke", underlined: true },
          { name: "VILA", underlined: true },
          { name: "EDITED", underlined: true },
          { name: "PIECES", underlined: true },
          { name: "ADIDAS ORIGINALS", underlined: true },
          { name: "TAMARIS", underlined: true },
          { name: "Guido Maria Kretschmer", underlined: true },
          { name: "s.Oliver", underlined: true },
          { name: "ADIDAS PERFORMANCE", underlined: true },
          { name: "TOMMY", underlined: true },
          { name: "PUMA", underlined: true },
          { name: "Show more", specialMargin: true, special: true },
        ],
      },
    },
  ]);

  const [categoriesThree, setCategoriesThree] = useState<
    {
      category: {
        name: string;
        special: boolean;
        types: { name: string; special?: boolean }[];
      };
    }[]
  >([
    {
      category: {
        special: true,
        name: "Sports",
        types: [
          { name: "Ski" },
          { name: "Outdoor" },
          { name: "Fitness" },
          { name: "Running" },
          { name: "Yoga" },
          { name: "Snowboard" },
          { name: "Tennis" },
          { name: "Basketball" },
          { name: "Ball games" },
        ],
      },
    },
    {
      category: {
        special: true,
        name: "Sportswear",
        types: [
          { name: "Sports bottoms & leggings" },
          { name: "Sports tops" },
          { name: "Sports underwear" },
          { name: "Sports jackets" },
          { name: "Sports sweaters" },
          { name: "Swim & surfwear" },
          { name: "More sustainable" },
        ],
      },
    },
    {
      category: {
        special: false,
        name: "Sports shoes",
        types: [
          { name: "Outdoor shoes" },
          { name: "Running shoes" },
          { name: "Sports shoes" },
          { name: "Pollside shoes" },
          { name: "Show more", special: true },
        ],
      },
    },
    {
      category: {
        special: false,
        name: "Sports bags & backpacks",
        types: [{ name: "Sports bags" }, { name: "Sports backpacks" }],
      },
    },
  ]);

  const [brandThree, setBrandThree] = useState<{
    name: string;
    images: { img: string }[];
  }>({
    name: "Top Brands",
    images: [
      { img: brandThree1 },
      { img: brandThree2 },
      { img: brandThree3 },
      { img: brandThree4 },
      { img: brandThree5 },
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
            <DropdownBrands
              hasSpecial={true}
              itemProps={categoriesOne}
              imageProps={brandOne}
              maxImg={5}
            />
          </div>
        </div>
        <div className="header__bottom-option">
          <span>Shoes</span>
          <div className="header__bottom-option-pop-up">
            <DropdownBrands
              itemProps={categoriesTwo}
              imageProps={brandTwo}
              maxImg={4}
            />
          </div>
        </div>
        <div className="header__bottom-option">
          <span>Sportswear</span>
          <div className="header__bottom-option-pop-up">
            <DropdownBrands
              itemProps={categoriesThree}
              hasSpecial={true}
              imageProps={brandThree}
              maxImg={5}
              slider={true}
            />
          </div>
        </div>
        <div className="header__bottom-option">
          <span>Accessories</span>
          <div className="header__bottom-option-pop-up">
            <DropdownBrands
              itemProps={categoriesFour}
              imageProps={brandFour}
              maxImg={4}
            />
          </div>
        </div>
        <div className="header__bottom-option">
          <span>Premium</span>
          <div className="header__bottom-option-pop-up">
            <DropdownBrands
              itemProps={categoriesFive}
              imageProps={brandFive}
              maxImg={5}
            />
          </div>
        </div>
        <div className="header__bottom-option header__bottom-option-special">
          <span>SALE</span>
          <div className="header__bottom-option-pop-up">
            <DropdownBrands itemProps={categoriesSix} largeImg={brandSix1} />
          </div>
        </div>
        <div className="header__bottom-option">
          <span>Brands</span>
          <div className="header__bottom-option-pop-up">
            <DropdownBrands itemProps={categoriesSeven} brandButton={true} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
