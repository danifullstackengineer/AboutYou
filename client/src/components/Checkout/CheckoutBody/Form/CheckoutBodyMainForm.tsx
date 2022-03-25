import React, { useState, useRef, useEffect } from "react";
import "../../../../styles/components/Checkout/CheckoutBody/Form/CheckoutBodyMainForm.css";
import { RiArrowDropDownLine } from "react-icons/ri";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineCheckCircle } from "react-icons/ai";
import germanyFlag from "../../../../assets/country-flags/de.svg";
import romaniaFlag from "../../../../assets/country-flags/ro.svg";
import serbiaFlag from "../../../../assets/country-flags/rs.svg";
import russianFlag from "../../../../assets/country-flags/ru.svg";
import netherlandsFlag from "../../../../assets/country-flags/nl.svg";
import japaneseFlag from "../../../../assets/country-flags/jp.svg";
import useOutsideAlerter from "../../../../Hooks/OutsideAlerter";
import InputFormCheckout from "../../../../Comp-Single/InputFormCheckout";

function CheckoutBodyMainForm({
  title,
  newAddress,
}: {
  newAddress?: boolean;
  title: string;
}) {
  const [activeFormality, setActiveFormality] = useState<boolean[]>([
    true,
    false,
  ]);
  const [transition, setTransition] = useState<boolean[]>([false, false]);

  const [toggleCountry, setToggleCountry] = useState<boolean>(false);
  const countryRef = useRef<HTMLDivElement>(null);
  const [selectedCountry, setSelectedCountry] =
    useState<{ name: string; flag: string }>();

  const outside = useOutsideAlerter(countryRef);

  useEffect(() => {
    if (outside) {
      setToggleCountry(false);
    }
  }, [outside]);

  const [languages, setLanguages] = useState<{ name: string; flag: string }[]>([
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
      name: "Japan",
      flag: japaneseFlag,
    },
  ]);

  const handleCountryChange = (index: number): void => {
    setSelectedCountry(languages[index]);
    setToggleCountry(false);
  };

  return (
    <div className="checkoutBodyMainForm">
      <h1>{title}</h1>
      <div className="checkoutBodyMainForm__title-country">
        <div
          className={`checkoutBodyMainForm__title ${
            transition[0]
              ? "checkoutBodyMainForm__title-transition-right"
              : transition[1]
              ? "checkoutBodyMainForm__title-transition-left"
              : ""
          }`}
        >
          <button
            className={
              activeFormality[1] ? "checkoutBodyMainForm__active-btn" : ""
            }
            onClick={() => {
              setTransition([false, true]);
              setActiveFormality([true, false]);
            }}
          >
            Ms.
          </button>
          <button
            className={
              activeFormality[0] ? "checkoutBodyMainForm__active-btn" : ""
            }
            onClick={() => {
              setTransition([true, false]);
              setActiveFormality([false, true]);
            }}
          >
            Mrs.
          </button>
        </div>
        <div
          className={`checkoutBodyMainForm__country ${
            toggleCountry ? "checkoutBodyMainForm__country-clicked" : ""
          }`}
          ref={countryRef}
        >
          <span
            className="checkoutBodyMainForm__country-warn"
            style={{ display: selectedCountry ? "none" : "block" }}
          >
            Country selection is mandatory
          </span>
          <button
            onClick={() => setToggleCountry(!toggleCountry)}
            style={{
              border: selectedCountry
                ? "1px solid black"
                : "1px solid rgb(200, 200, 200)",
            }}
          >
            <span
              style={{ color: selectedCountry ? "black" : "rgb(200,200,200)" }}
            >
              {selectedCountry ? selectedCountry.name : "Select country"}
            </span>
            <span>
              <RiArrowDropDownLine />
            </span>
          </button>
          <div
            className="checkoutBodyMainForm__country-selection"
            style={{ display: toggleCountry ? "flex" : "none" }}
          >
            <div>
              <div className="checkoutBodyMainForm__country-input">
                <span>
                  <AiOutlineSearch />
                </span>
                <input type="text" />
              </div>
              {languages.map((language, i) => {
                return (
                  <div
                    onClick={() => handleCountryChange(i)}
                    key={i}
                    className="checkoutBodyMainForm__country-selection-sel"
                  >
                    <img src={language.flag} alt={language.flag} />
                    <span>{language.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="checkoutBodyMainForm__input">
        <InputFormCheckout
          bgColor="rgb(240,240,240)"
          width={250}
          height={40}
          placeholder={"First name"}
          warning={"This entry cannot be left blank"}
          optional={false}
          margin={[0, 10, 0, 0]}
        />
        <InputFormCheckout
          bgColor="rgb(240,240,240)"
          height={40}
          width={250}
          placeholder={"Last name"}
          warning={"This entry cannot be left blank"}
          optional={false}
          margin={[0, 0, 0, 10]}
        />
      </div>
      <div className="checkoutBodyMainForm__input">
        <InputFormCheckout
          bgColor="rgb(240,240,240)"
          width={520}
          height={40}
          placeholder={"Address 1"}
          warning={"This entry cannot be left blank"}
          optional={false}
          margin={[0, 0, 0, 0]}
        />
      </div>
      <div className="checkoutBodyyMainForm__input">
        <InputFormCheckout
          bgColor="rgb(240,240,240)"
          width={520}
          height={40}
          placeholder={"Address 2 (optional)"}
          warning={""}
          optional={true}
          margin={[0, 0, 0, 0]}
        />
      </div>
      <div className="checkoutBodyMainForm__input">
        <InputFormCheckout
          bgColor="rgb(240,240,240)"
          width={520}
          height={40}
          placeholder={"State"}
          warning={""}
          optional={true}
          margin={[0, 0, 0, 0]}
        />
      </div>
      <div className="checkoutBodyMainForm__input">
        <InputFormCheckout
          bgColor="rgb(240,240,240)"
          width={250}
          height={40}
          placeholder={"Postal code"}
          optional={false}
          warning={"The postal code cannot be left blank"}
          margin={[0, 10, 0, 0]}
        />
        <InputFormCheckout
          bgColor="rgb(240,240,240)"
          width={250}
          height={40}
          placeholder={"City"}
          optional={false}
          warning={"This entry cannot be left blank"}
          margin={[0, 0, 0, 10]}
        />
      </div>
      {newAddress === true ? (
        ""
      ) : (
        <div className="checkoutBodyMainForm__input">
          <InputFormCheckout
            bgColor="rgb(240,240,240)"
            width={250}
            height={40}
            placeholder={"YYYY-MM-DD"}
            optional={false}
            warning={"Your date of birth cannot be left blank"}
            margin={[0, 10, 0, 0]}
          />
          <InputFormCheckout
            bgColor="rgb(240,240,240)"
            width={250}
            height={40}
            placeholder={"Tax ID"}
            optional={true}
            warning={""}
            margin={[0, 0, 10, 0]}
          />
        </div>
      )}
    </div>
  );
}

export default CheckoutBodyMainForm;
