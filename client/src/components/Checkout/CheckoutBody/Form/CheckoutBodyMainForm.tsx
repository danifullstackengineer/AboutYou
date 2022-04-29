import React, { useState, useRef, useEffect } from "react";
import "../../../../styles/components/Checkout/CheckoutBody/Form/CheckoutBodyMainForm.css";
import { RiArrowDropDownLine } from "react-icons/ri";
import { AiOutlineSearch } from "react-icons/ai";
import useOutsideAlerter from "../../../../Hooks/OutsideAlerter";
import InputFormCheckout from "../../../../Comp-Single/InputFormCheckout";
import IAddress from "../../../../types/address";
import {
  getFirstAddress,
  getSecondAddress,
  setFirstAddress,
  setSecondAddress,
} from "../../../../Logic/localStorage/address";

function CheckoutBodyMainForm({
  title,
  newAddress,
  setIsEveryField,
  clickedContinue,
}: {
  newAddress?: boolean;
  title: string;
  setIsEveryField: React.Dispatch<React.SetStateAction<boolean>>;
  clickedContinue: boolean;
}) {
  const [activeFormality, setActiveFormality] = useState<boolean[]>([
    true,
    false,
  ]);
  const [transition, setTransition] = useState<boolean[]>([false, false]);

  const [toggleCountry, setToggleCountry] = useState<boolean>(false);
  const countryRef = useRef<HTMLDivElement>(null);
  const [selectedCountry, setSelectedCountry] = useState<{
    name: string;
    flag: string;
  }>();

  const outside = useOutsideAlerter(countryRef);

  const [address, setAddress] = useState<IAddress>();

  useEffect(() => {
    if (outside) {
      setToggleCountry(false);
    }
  }, [outside]);

  useEffect(() => {
    if (newAddress) {
      const addr = getSecondAddress();
      if (addr) {
        setAddress(addr);
      }
    } else {
      const addr = getFirstAddress();
      if (addr) {
        setAddress(addr);
      }
    }
  }, [newAddress]);

  // useEffect(() => {
  //   if (address) {
  //     setSelectedCountry(
  //       languages.filter((language) => language.name === address.country)[0]
  //     );
  //     setActiveFormality(
  //       address.formality === "Mrs." ? [false, true] : [true, false]
  //     );
  //   }
  // }, [address, languages]);

  // const handleCountryChange = (index: number): void => {
  //   setSelectedCountry(languages[index]);
  //   setToggleCountry(false);
  // };

  const [isGoodFirst, setIsGoodFirst] = useState<boolean>(false);
  const [isGoodLast, setIsGoodLast] = useState<boolean>(false);
  const [isGoodAddress, setIsGoodAddress] = useState<boolean>(false);
  const [isGoodPostal, setIsGoodPostal] = useState<boolean>(false);
  const [isGoodCity, setIsGoodCity] = useState<boolean>(false);
  const [isGoodBirth, setIsGoodBirth] = useState<boolean>(false);
  const [isGoodCountry, setIsGoodCountry] = useState<boolean>(false);

  useEffect(() => {
    if (selectedCountry) {
      setIsGoodCountry(true);
    } else {
      setIsGoodCountry(false);
    }
  }, [selectedCountry]);

  const [firstInput, setFirstInput] = useState<string>("");
  const [lastInput, setLastInput] = useState<string>("");
  const [addres1Input, setAddress1Input] = useState<string>("");
  const [address2Input, setAddress2Input] = useState<string>("");
  const [stateInput, setStateInput] = useState<string>("");
  const [codeInput, setCodeInput] = useState<string>("");
  const [cityInput, setCityInput] = useState<string>("");
  const [birthInput, setBirthInput] = useState<string>("");
  const [taxInput, setTaxInput] = useState<string>("");

  useEffect(() => {
    if (newAddress) {
      if (
        isGoodFirst &&
        isGoodLast &&
        isGoodAddress &&
        isGoodPostal &&
        isGoodCity &&
        isGoodCountry
      ) {
        setSecondAddress({
          formality: activeFormality[0] ? "Ms." : "Mrs.",
          country: selectedCountry ? selectedCountry.name : "",
          firstName: firstInput,
          lastName: lastInput,
          addressOne: addres1Input,
          addressTwo: address2Input,
          state: stateInput,
          p_code: codeInput,
          city: cityInput,
        });
      }
    } else if (
      isGoodFirst &&
      isGoodLast &&
      isGoodAddress &&
      isGoodPostal &&
      isGoodCity &&
      isGoodBirth &&
      isGoodCountry
    ) {
      setFirstAddress({
        formality: activeFormality[0] ? "Ms." : "Mrs.",
        country: selectedCountry ? selectedCountry.name : "",
        firstName: firstInput,
        lastName: lastInput,
        addressOne: addres1Input,
        addressTwo: address2Input,
        state: stateInput,
        p_code: codeInput,
        city: cityInput,
        birth: birthInput,
        tax: taxInput,
      });
    }
  }, [
    clickedContinue,
    activeFormality,
    addres1Input,
    address2Input,
    birthInput,
    cityInput,
    codeInput,
    firstInput,
    isGoodAddress,
    isGoodBirth,
    isGoodCity,
    isGoodCountry,
    isGoodFirst,
    isGoodLast,
    isGoodPostal,
    lastInput,
    newAddress,
    selectedCountry,
    stateInput,
    taxInput
  ]);

  useEffect(() => {
    if (newAddress) {
      if (
        isGoodFirst &&
        isGoodLast &&
        isGoodAddress &&
        isGoodPostal &&
        isGoodCity &&
        isGoodCountry
      ) {
        setIsEveryField(true);
        // Address Input For Main Address is different from Billing Addresss
        setSecondAddress({
          formality: activeFormality[0] ? "Ms." : "Mrs.",
          country: selectedCountry ? selectedCountry.name : "",
          firstName: firstInput,
          lastName: lastInput,
          addressOne: addres1Input,
          addressTwo: address2Input,
          state: stateInput,
          p_code: codeInput,
          city: cityInput,
        });
      } else {
        setIsEveryField(false);
      }
    } else {
      if (
        isGoodFirst &&
        isGoodLast &&
        isGoodAddress &&
        isGoodPostal &&
        isGoodCity &&
        isGoodBirth &&
        isGoodCountry
      ) {
        setIsEveryField(true);
        // Address Input for Main Address is same as Billing Addres
      } else {
        setIsEveryField(false);
      }
    }
  }, [
    isGoodFirst,
    isGoodLast,
    isGoodAddress,
    isGoodPostal,
    isGoodCity,
    isGoodBirth,
    isGoodCountry,
    activeFormality,
    addres1Input,
    address2Input,
    cityInput,
    codeInput,
    firstInput,
    lastInput,
    newAddress,
    selectedCountry,
    setIsEveryField,
    stateInput,
  ]);

  return (
    <div
      className="checkoutBodyMainForm"
      style={{ marginBottom: newAddress ? "2em" : undefined }}
    >
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
              {/* {languages.map((language, i) => {
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
              })} */}
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
          setIsGood={setIsGoodFirst}
          initialInput={address?.firstName}
          setInputParent={setFirstInput}
        />
        <InputFormCheckout
          bgColor="rgb(240,240,240)"
          height={40}
          width={250}
          placeholder={"Last name"}
          warning={"This entry cannot be left blank"}
          optional={false}
          margin={[0, 0, 0, 10]}
          setIsGood={setIsGoodLast}
          initialInput={address?.lastName}
          setInputParent={setLastInput}
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
          setIsGood={setIsGoodAddress}
          initialInput={address?.addressOne}
          setInputParent={setAddress1Input}
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
          initialInput={address?.addressTwo}
          setInputParent={setAddress2Input}
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
          initialInput={address?.state}
          setInputParent={setStateInput}
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
          setIsGood={setIsGoodPostal}
          initialInput={address?.p_code}
          setInputParent={setCodeInput}
        />
        <InputFormCheckout
          bgColor="rgb(240,240,240)"
          width={250}
          height={40}
          placeholder={"City"}
          optional={false}
          warning={"This entry cannot be left blank"}
          margin={[0, 0, 0, 10]}
          setIsGood={setIsGoodCity}
          initialInput={address?.city}
          setInputParent={setCityInput}
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
            setIsGood={setIsGoodBirth}
            initialInput={address?.birth}
            setInputParent={setBirthInput}
          />
          <InputFormCheckout
            bgColor="rgb(240,240,240)"
            width={250}
            height={40}
            placeholder={"Tax ID"}
            optional={true}
            warning={""}
            margin={[0, 0, 10, 0]}
            initialInput={address?.tax}
            setInputParent={setTaxInput}
          />
        </div>
      )}
    </div>
  );
}

export default CheckoutBodyMainForm;
