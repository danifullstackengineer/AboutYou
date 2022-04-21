import React, { useState, useEffect } from "react";
import "../../styles/components/Header/Header.css";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import NBLogo from "../../Comp-Single/NBLogo";

function Header({
  chosenMode,
  setChosenMode,
  setClickedMenu,
  currentOption,
  setCurrentOption,
  headerRef,
  clickedMenu,
  hideMode,
}: {
  setClickedLogin: React.Dispatch<React.SetStateAction<boolean>>;
  chosenMode: boolean | undefined;
  setChosenMode: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setClickedMenu: React.Dispatch<React.SetStateAction<boolean>>;
  currentOption: boolean[];
  setCurrentOption: React.Dispatch<React.SetStateAction<boolean[]>>;
  headerRef: React.RefObject<HTMLDivElement>;
  clickedMenu: boolean;
  hideMode?: boolean;
}) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();


  const [search, setSearch] = useState<string>();

  useEffect(() => {
    if (hideMode) {
      setChosenMode(true);
    }
  }, [hideMode, setChosenMode]);

  const [clickedDropdown, setClickedDropdown] = useState<boolean>();

  useEffect(() => {
    if (chosenMode !== undefined) {
      if (currentOption[0] || currentOption[2]) {
        setChosenMode(true);
      }
    }
  }, [currentOption, chosenMode, setChosenMode]);

  const [clickedSearch, setClickedSearch] = useState<boolean>();
  
  return (
    <div
      className={`header ${
        chosenMode || chosenMode === undefined ? "header-light" : "header-dark"
      } ${hideMode ? "header-no-chooser" : ""}`}
      ref={headerRef}
    >
      <div className="header__top">
        <div className="header__top-logo">
          <NBLogo chosenMode={chosenMode} />
        </div>
      </div>
      <div
        className={`header__dropdown ${
          clickedDropdown ? "header__dropdown-active" : ""
        }`}
        onClick={() => {
          setClickedMenu(!clickedMenu);
          setClickedDropdown(!clickedDropdown);
        }}
      >
        {chosenMode === undefined || chosenMode ? (
          <img src={"/assets/svg/dropdown.svg"} loading={"eager"} alt={""} />
        ) : (
          <img
            src={"/assets/svg/dropdown-dark.svg"}
            loading={"eager"}
            alt={""}
          />
        )}
      </div>
      <div className="header__bottom">
        <div className="header__bottom-btns">
          <button
            type="button"
            className={currentOption[0] ? "header__bottom-btns-active" : ""}
            onClick={() => setCurrentOption([true, false, false])}
          >
            <Trans i18nKey={"Header.Chooser.First"}>All products</Trans>
          </button>
          <button
            type="button"
            className={currentOption[1] ? "header__bottom-btns-active" : ""}
            onClick={() => setCurrentOption([false, true, false])}
          >
            <Trans i18nKey={"Header.Chooser.Second"}>
              Customizable products
            </Trans>
          </button>
          <button
            type="button"
            className={currentOption[2] ? "header__bottom-btns-active" : ""}
            onClick={() => setCurrentOption([false, false, true])}
          >
            <Trans i18nKey={"Header.Chooser.Third"}>All accessories</Trans>
          </button>
        </div>
        <div
          className={`header__bottom-mode ${
            currentOption[1] ? "header__bottom-mode-active" : ""
          }`}
        >
          <div
            className={`header__bottom-input ${
              clickedSearch
                ? "header__bottom-input-clicked"
                : "header__bottom-input-unclicked"
            }`}
          >
            <span
              onClick={() =>
                setClickedSearch(
                  clickedSearch === undefined ? true : !clickedSearch
                )
              }
            >
              <AiOutlineSearch />
            </span>
            <input
              placeholder={t("Header.Input")}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div>
            <img
              src={"/assets/svg/sun.svg"}
              alt={"/assets/svg/sun.svg"}
              onClick={() => setChosenMode(true)}
            />
            <div
              onClick={() =>
                setChosenMode(chosenMode === undefined ? false : !chosenMode)
              }
              className={`header__bottom-mode-switch ${
                chosenMode === false
                  ? "header__bottom-mode-switch-dark"
                  : "header__bottom-mode-switch-light"
              }`}
            ></div>
            <img
              src={"/assets/svg/moon.svg"}
              alt={"/assets/svg/moon.svg"}
              onClick={() => setChosenMode(false)}
            />
          </div>
        </div>
      </div>
      {hideMode ? (
        <div className="header__input">
          <div
            className={`header__bottom-input ${
              clickedSearch
                ? "header__bottom-input-clicked"
                : "header__bottom-input-unclicked"
            }`}
          >
            <span
              onClick={() =>
                setClickedSearch(
                  clickedSearch === undefined ? true : !clickedSearch
                )
              }
            >
              <AiOutlineSearch />
            </span>
            <input
              placeholder={t("Header.Input")}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Header;
