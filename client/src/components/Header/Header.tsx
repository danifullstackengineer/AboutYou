import React, { useState, useEffect, useContext, useRef } from "react";
import "../../styles/components/Header/Header.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import NBLogo from "../../Comp-Single/NBLogo";
import { useWindowDimensions } from "../../Hooks/Viewport";
import { MobileContext } from "../../Context/Mobile";

function Header({
  chosenMode,
  setChosenMode,
  setClickedMenu,
  headerRef,
  clickedMenu,
  custom,
  accessories,
}: {
  setClickedLogin: React.Dispatch<React.SetStateAction<boolean>>;
  chosenMode: boolean | undefined;
  setChosenMode: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setClickedMenu: React.Dispatch<React.SetStateAction<boolean>>;
  headerRef: React.RefObject<HTMLDivElement>;
  clickedMenu: boolean;
  custom?: boolean;
  accessories?: boolean;
}) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const mContext = useContext(MobileContext);
  const location = useLocation();

  const [search, setSearch] = useState<string>();

  useEffect(() => {
    if (chosenMode !== undefined) {
      if (!custom) {
        setChosenMode(true);
      }
    }
  }, [chosenMode, setChosenMode, custom]);

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (window.location.pathname === "/light" && chosenMode !== true) {
      setChosenMode(true);
    } else if (window.location.pathname === "/dark" && chosenMode !== false) {
      setChosenMode(false);
    }
  }, [chosenMode, location.pathname, setChosenMode]);

  const [scrollAmount, setScrollAmount] = useState<number>(0);

  useEffect(() => {
    if (!mContext.isMobile) {
      window.addEventListener("scroll", () => {
        var winScroll =
          document.body.scrollTop || document.documentElement.scrollTop;
        var height =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;
        var scrolled = (winScroll / height) * 100;
        setScrollAmount(scrolled);
      });
      return () => {
        window.removeEventListener("scroll", () => {});
      };
    }
  }, [mContext.isMobile]);

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      divRef.current &&
      !(location.pathname === "/light" || location.pathname === "/dark")
    ) {
      divRef.current.style.marginBottom = "1.5em";
    }
  }, [divRef, location]);

  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mobileRef.current) {
      mobileRef.current.style.width = scrollAmount + "%";
    }
  }, [mobileRef, scrollAmount]);

  return (
    <div
      className={`header ${
        chosenMode || chosenMode === undefined ? "header-light" : "header-dark"
      }`}
      ref={headerRef}
    >
      <div className="header__top">
        <div className="header__top-logo">
          <NBLogo chosenMode={chosenMode} />
        </div>
      </div>
      <div
        className={`header__dropdown ${
          clickedMenu ? "header__dropdown-active" : ""
        }`}
        onClick={() => {
          setClickedMenu(!clickedMenu);
        }}
      >
        {chosenMode === undefined || chosenMode ? (
          <img
            src={"/assets/png/dropdown-light.png"}
            loading={"eager"}
            alt={""}
          />
        ) : (
          <img
            src={"/assets/png/dropdown-dark.png"}
            loading={"eager"}
            alt={""}
          />
        )}
      </div>
      <div ref={divRef} className="header__bottom">
        <div className="header__bottom-btns">
          <button
            type="button"
            className={
              !accessories && !custom ? "header__bottom-btns-active" : ""
            }
            onClick={() => navigate("/")}
          >
            <Trans
              i18nKey={
                width <= 600
                  ? "Header.Chooser.First.cut"
                  : "Header.Chooser.First.uncut"
              }
            >
              {width <= 600 ? "Products" : "All Products"}
            </Trans>
          </button>
          <button
            type="button"
            className={custom ? "header__bottom-btns-active" : ""}
            onClick={() => navigate("/light")}
          >
            <Trans
              i18nKey={
                width <= 600
                  ? "Header.Chooser.Second.cut"
                  : "Header.Chooser.Second.uncut"
              }
            >
              {width <= 600 ? "Customizable" : "Customizable Products"}
            </Trans>
          </button>
          <button
            type="button"
            className={accessories ? "header__bottom-btns-active" : ""}
            onClick={() => navigate("/accessories")}
          >
            <Trans
              i18nKey={
                width <= 600
                  ? "Header.Chooser.Third.cut"
                  : "Header.Chooser.Third.uncut"
              }
            >
              {width <= 600 ? "Accessories" : "All accessories"}
            </Trans>
          </button>
        </div>
        {window.location.pathname === "/light" ||
        window.location.pathname === "/dark" ? (
          <div
            className={`header__bottom-mode ${
              custom ? "header__bottom-mode-active" : ""
            }`}
          >
            <div>
              <img
                src={"/assets/svg/sun.svg"}
                alt={"/assets/svg/sun.svg"}
                onClick={() => {
                  navigate("/light");
                  setChosenMode(true);
                }}
              />
              <div
                onClick={() => {
                  navigate(
                    chosenMode === undefined
                      ? "/dark"
                      : chosenMode
                      ? "/dark"
                      : "/light"
                  );
                  setChosenMode(chosenMode === undefined ? false : !chosenMode);
                }}
                className={`header__bottom-mode-switch ${
                  chosenMode === false
                    ? "header__bottom-mode-switch-dark"
                    : "header__bottom-mode-switch-light"
                }`}
              ></div>
              <img
                src={"/assets/svg/moon.svg"}
                alt={"/assets/svg/moon.svg"}
                onClick={() => {
                  navigate("/dark");
                  setChosenMode(false);
                }}
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      {!mContext.isMobile ? (
        <div className="header__progress">
          <div ref={mobileRef} className="header__progress-amount"></div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default React.memo(Header);
