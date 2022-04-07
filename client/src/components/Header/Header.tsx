import React, { useState, useRef, useEffect } from "react";
import "../../styles/components/Header/Header.css";
import { AiOutlineSearch } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBasket3 } from "react-icons/bs";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiLockAlt } from "react-icons/bi";
import { VscSettings } from "react-icons/vsc";
import { RiMessage2Line } from "react-icons/ri";
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
import { useNavigate } from "react-router-dom";
import { getBasketItemsStorage } from "../../Logic/localStorage/basket";

import InteractiveBtn from "../../Comp-Single/InteractiveBtn";
import AboutYouLogo from "../../Comp-Single/AboutYouLogo";
import ItemCount from "../../Comp-Single/ItemCount";
import CartItem from "../../Comp-Single/CartItem";
import { getTotalBasketPrice } from "../../Logic/basket";
import { getWishlistItemsStorage } from "../../Logic/localStorage/wishlist";

function Header({
  setClickedLogin,
}: {
  setClickedLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();

  const [selectedType, setSelectedType] = useState<boolean[]>([
    true,
    false,
    false,
  ]);
  const [selectedLang, setSelectedLang] = useState<boolean[]>([true, false]);
  const [itemCount, setItemCount] = useState<
    {
      backgroundImg: string;
      foregroundImg?: string | undefined;
      tags?:
        | {
            name: string;
            special?: boolean | undefined;
          }[]
        | undefined;
      title: string;
      price: string;
      priceDiscount: { full: string; discount: string };
      colors: string[];
      sizes?: string[] | undefined;
      id: string;
      quantity: number;
    }[]
  >();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("loggedIn", () => {
      setIsLoggedIn(true);
    });
    window.addEventListener("loggedOut", () => {
      setIsLoggedIn(false);
      localStorage.removeItem("token");
    });
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    return () => {
      window.removeEventListener("loggedIn", () => { })
      window.removeEventListener("loggedOut", ()=>{})
    }
  }, []);

  const [languages] = useState<
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
  const [dropdownOne] = useState<
    {
      image: string;
      title: string;
      item: string;
      placeholder?: boolean;
    }[]
  >([
    {
      image: "/assets/dropdown/dropdownOne/one.webp",
      title: "Lena Gercke",
      item: "Striped Shirt Lsddssds",
    },
    {
      image: "/assets/dropdown/dropdownOne/two.webp",
      title: "Tara Zoe",
      item: "Classy Long Blouse",
    },
    {
      image: "/assets/dropdown/dropdownOne/three.webp",
      title: "Lilia for LeGer",
      item: "Black Shirt Zebra",
    },
    {
      image: "/assets/dropdown/dropdownOne/four.webp",
      title: "Kianush for LeGer",
      item: "Black Mesh Jeans",
    },
    {
      image: "/assets/dropdown/placeholder.jpg",
      title: "placeholder",
      item: "placeholder",
      placeholder: true,
    },
  ]);

  const [dropdownTwo] = useState<
    {
      image: string;
      title: string;
      item: string;
      special: boolean;
      placeholder?: boolean;
    }[]
  >([
    {
      image: "/assets/dropdown/dropdownTwo/one.jpg",
      title: "Bodytype: Wider Hips",
      item: "Swimwear for Curves",
      special: true,
    },
    {
      image: "/assets/dropdown/dropdownTwo/two.jpg",
      title: "Feel Good",
      item: "Swimsuits",
      special: true,
    },
    {
      image: "/assets/dropdown/dropdownTwo/three.jpg",
      title: "Coat trends that are ruling the season",
      item: "Transitional Coats",
      special: true,
    },
    {
      image: "/assets/dropdown/dropdownTwo/four.jpg",
      title: "Stolen looks from your dads closet",
      item: "Dad-Style",
      special: true,
    },
    {
      image: "/assets/dropdown/placeholder.jpg",
      title: "placeholder",
      item: "placeholder",
      special: true,
      placeholder: true,
    },
  ]);

  const [categoriesOne] = useState<
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

  const [brandOne] = useState<{
    name: string;
    images: { img: string }[];
  }>({
    name: "Top Brands",
    images: [
      { img: "/assets/dropdown/brands/one/only.webp" },
      { img: "/assets/dropdown/brands/one/vero-moda.webp" },
      { img: "/assets/dropdown/brands/one/about-you.webp" },
      { img: "/assets/dropdown/brands/one/le-ger.webp" },
      { img: "/assets/dropdown/brands/one/vila.webp" },
      { img: "/assets/dropdown/brands/one/edited.webp" },
      { img: "/assets/dropdown/brands/one/pieces.webp" },
      { img: "/assets/dropdown/brands/one/guido.webp" },
      { img: "/assets/dropdown/brands/one/oliver.webp" },
      { img: "/assets/dropdown/brands/one/rawwear.webp" },
    ],
  });

  const [categoriesTwo] = useState<
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

  const [brandTwo] = useState<{
    name: string;
    images: { img: string }[];
  }>({
    name: "Top Brands",
    images: [
      { img: "/assets/dropdown/brands/two/adidas.webp" },
      { img: "/assets/dropdown/brands/two/tamaris.webp" },
      { img: "/assets/dropdown/brands/one/about-you.webp" },
      { img: "/assets/dropdown/brands/two/puma.webp" },
      { img: "/assets/dropdown/brands/two/rebook.webp" },
      { img: "/assets/dropdown/brands/two/marco.webp" },
      { img: "/assets/dropdown/brands/two/img.webp" },
      { img: "/assets/dropdown/brands/two/tommy.webp" },
    ],
  });

  const [categoriesFour] = useState<
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

  const [brandFour] = useState<{
    name: string;
    images: { img: string }[];
  }>({
    name: "Top Brands",
    images: [
      { img: "/assets/dropdown/brands/one/about-you.webp" },
      { img: "/assets/dropdown/brands/two/tommy.webp" },
      { img: "/assets/dropdown/brands/four/guess.webp" },
      { img: "/assets/dropdown/brands/two/tamaris.webp" },
      { img: "/assets/dropdown/brands/four/klein.webp" },
      { img: "/assets/dropdown/brands/four/joop.webp" },
      { img: "/assets/dropdown/brands/one/le-ger.webp" },
    ],
  });

  const [categoriesFive] = useState<
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

  const [brandFive] = useState<{
    name: string;
    images: { img: string }[];
  }>({
    name: "Top Brands",
    images: [
      { img: "/assets/dropdown/brands/five/hugo.webp" },
      { img: "/assets/dropdown/brands/four/klein.webp" },
      { img: "/assets/dropdown/brands/four/joop.webp" },
      { img: "/assets/dropdown/brands/five/about-you-sm.webp" },
      { img: "/assets/dropdown/brands/five/kennel.webp" },
      { img: "/assets/dropdown/brands/five/pepe.webp" },
      { img: "/assets/dropdown/brands/five/boss.webp" },
      { img: "/assets/dropdown/brands/five/drykorn.webp" },
      { img: "/assets/dropdown/brands/five/blauer.webp" },
      { img: "/assets/dropdown/brands/five/boss.webp" },
    ],
  });

  const [categoriesSix] = useState<
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

  const [categoriesSeven] = useState<
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

  const [categoriesThree] = useState<
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

  const [brandThree] = useState<{
    name: string;
    images: { img: string }[];
  }>({
    name: "Top Brands",
    images: [
      { img: "/assets/dropdown/brands/two/adidas.webp" },
      { img: "/assets/dropdown/brands/two/puma.webp" },
      { img: "/assets/dropdown/brands/three/special.webp" },
      { img: "/assets/dropdown/brands/three/only-play.webp" },
      { img: "/assets/dropdown/brands/three/cmp.webp" },
    ],
  });

  const [wishlist, setWishlist] = useState<
    {
      backgroundImg: string;
      foregroundImg?: string | undefined;
      tags?:
        | {
            name: string;
            special?: boolean | undefined;
          }[]
        | undefined;
      title: string;
      price: string;
      priceDiscount: { full: string; discount: string };
      colors: string[];
      sizes?: string[] | undefined;
      id: string;
      quantity: number;
    }[]
  >();

  useEffect(() => {
    window.addEventListener("basket", () => {
      setItemCount(getBasketItemsStorage());
    });
    window.addEventListener("wishlist", () => {
      setWishlist(getWishlistItemsStorage());
    });
  }, []);

  useEffect(() => {
    const items = getBasketItemsStorage();
    if (items) {
      setItemCount(items);
    }
    const wishlist = getWishlistItemsStorage();
    if (wishlist) {
      setWishlist(wishlist);
    }
  }, []);

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

  const handleCheckoutClick = (): void => {
    const token = localStorage.getItem("token");
    if (itemCount && token) {
      navigate("/checkout");
    } else if (itemCount) {
      setClickedLogin(true);
    }
  };

  const basketRef = useRef<HTMLDivElement>(null);
  const basketRefSecond = useRef<HTMLDivElement>(null);
  const [isMouseOverBasket, setIsMouseOverBasket] = useState<boolean>(false);

  useEffect(() => {
    if (basketRef.current && isMouseOverBasket && basketRefSecond.current) {
      basketRefSecond.current.style.top =
        basketRef.current.offsetHeight +
        basketRef.current.offsetTop +
        10 +
        "px";
      basketRefSecond.current.style.width =
        basketRef.current.offsetWidth + "px";
    }
  }, [isMouseOverBasket]);

  const wishlistRef = useRef<HTMLDivElement>(null);
  const wishlistRefSecond = useRef<HTMLDivElement>(null);
  const [isMouseOverWishlist, setIsMouseOverWishlist] =
    useState<boolean>(false);

  useEffect(() => {
    if (
      wishlistRef.current &&
      wishlistRefSecond.current &&
      isMouseOverWishlist
    ) {
      wishlistRefSecond.current.style.top =
        wishlistRef.current.offsetHeight +
        wishlistRef.current.offsetTop +
        10 +
        "px";
      wishlistRefSecond.current.style.width =
        wishlistRef.current.offsetWidth + "px";
    }
  }, [isMouseOverWishlist]);

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
          <AboutYouLogo />
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
            {isLoggedIn ? (
              <div className="header__top-option-pop-up header__top-option-pop-up-user">
                <div className="header__top-option-pop-up-user-content">
                  <div className="header__top-option-pop-up-user-content-option">
                    <span>{<AiOutlineShoppingCart />}</span>
                    Orders
                  </div>
                  <div className="header__top-option-pop-up-user-content-option">
                    <span>{<BiLockAlt />}</span>
                    Profile &amp; Security
                  </div>
                  <div className="header__top-option-pop-up-user-content-option">
                    <span>{<VscSettings />}</span>
                    Settings
                  </div>
                  <div className="header__top-option-pop-up-user-content-option">
                    <span>{<RiMessage2Line />}</span>
                    Help
                  </div>
                </div>
                <div className="header__top-option-pop-up-user-border"></div>
                <InteractiveBtn
                  onClick={() => {
                    window.dispatchEvent(new Event("loggedOut"));
                  }}
                  type="button"
                  text={"Log out"}
                  height={50}
                  width={250}
                  bgColor={"white"}
                  color={"black"}
                  hoverBgColor={"rgb(240,240,240)"}
                />
              </div>
            ) : (
              <div className="header__top-option-pop-up header__top-option-pop-up-user">
                <div className="header__top-option-pop-up-user-text">
                  You are not registered yet
                </div>
                <InteractiveBtn
                  text={"Log In"}
                  height={50}
                  margin={[20, 30, 20, 30]}
                  width={340}
                  onClick={() => setClickedLogin(true)}
                  type="button"
                />
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
            )}
          </div>
          <div
            className="header__top-option"
            onMouseOver={() => setIsMouseOverWishlist(true)}
            onMouseLeave={() => setIsMouseOverWishlist(false)}
          >
            <AiOutlineHeart />
            {wishlist && wishlist.length > 0 && isLoggedIn ? (
              <div
                className="header__top-option-pop-up header__top-option-pop-up-basket"
                ref={wishlistRef}
              >
                <div className="header__top-option-pop-up-fav-text">
                  Your wishlist
                </div>
                <div className="header__top-option-pop-up-fav-border"></div>
                <div className="header__top-option-pop-up-basket-items-placeholder">
                  {wishlist
                    ? wishlist.map((item, i) => {
                        return (
                          <div key={i}>
                            <CartItem
                              quantity={item.quantity}
                              background={
                                item.foregroundImg
                                  ? item.foregroundImg
                                  : item.backgroundImg
                              }
                              title={item.title}
                              subtitle={item.title}
                              price={
                                item.price
                                  ? item.price
                                  : item.priceDiscount.discount
                              }
                            />
                          </div>
                        );
                      })
                    : ""}
                </div>
              </div>
            ) : (
              <>
                <div
                  className="header__top-option-pop-up header__top-option-pop-up-fav"
                  ref={wishlistRef}
                >
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
              </>
            )}
            <div
              className="header__top-option-pop-up header__top-option-pop-up-wishlist"
              ref={wishlistRefSecond}
            >
              <button onClick={() => navigate("/wishlist")}>Wishlist</button>
            </div>
          </div>
          <div
            className="header__top-option"
            onMouseOver={() => setIsMouseOverBasket(true)}
            onMouseLeave={() => setIsMouseOverBasket(false)}
          >
            <BsBasket3 />
            <div
              className="header__top-option-pop-up header__top-option-pop-up-basket"
              ref={basketRef}
            >
              <div className="header__top-option-pop-up-basket-text">
                {itemCount ? "Your basket" : "Your basket is empty!"}
              </div>
              <div className="header__top-option-pop-up-basket-border"></div>
              <div className="header__top-option-pop-up-basket-items">
                {itemCount ? (
                  <div className="header__top-option-pop-up-basket-items-placeholder">
                    {itemCount.map((item, i) => {
                      return (
                        <div key={i}>
                          <CartItem
                            quantity={item.quantity}
                            background={
                              item.foregroundImg
                                ? item.foregroundImg
                                : item.backgroundImg
                            }
                            title={item.title}
                            subtitle={item.title}
                            price={
                              item.price
                                ? item.price
                                : item.priceDiscount.discount
                            }
                          />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="header__top-option-pop-up-basket-text2">
                    Add item(s) to your basket.
                  </div>
                )}
              </div>
            </div>
            <div
              className="header__top-option-pop-up header__top-option-basket-second"
              ref={basketRefSecond}
            >
              {itemCount ? (
                <div className="header__top-option-pop-up-basket-total">
                  <span>Total amount</span>
                  <span>$ {getTotalBasketPrice(itemCount)}</span>
                </div>
              ) : (
                <div className="header__top-option-pop-up-basket-text">
                  Haven't found anything yet?
                </div>
              )}
              <button
                onClick={() => (itemCount ? navigate("/basket") : undefined)}
              >
                {itemCount ? "Basket" : "Shop new items"}
              </button>
              <button
                onClick={handleCheckoutClick}
                style={{
                  border: itemCount
                    ? "1px solid transparent"
                    : "1px solid rgb(220, 220, 220)",
                  backgroundColor: itemCount ? "#97C66B" : "white",
                  color: itemCount ? "white" : "black",
                }}
              >
                {itemCount ? "Checkout" : "Discover outfits"}
              </button>
            </div>
            {itemCount ? <ItemCount number={itemCount.length} /> : ""}
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
            <DropdownBrands
              itemProps={categoriesSix}
              largeImg={"/assets/dropdown/brands/six/large.webp"}
            />
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
