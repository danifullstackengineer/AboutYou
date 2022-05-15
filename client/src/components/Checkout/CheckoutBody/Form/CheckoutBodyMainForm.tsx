import React, { useState, useEffect, useRef } from "react";
import "../../../../styles/components/Checkout/CheckoutBody/Form/CheckoutBodyMainForm.css";
import InputFormCheckout from "../../../../Comp-Single/InputFormCheckout";
import IAddress from "../../../../types/address";
import {
  getFirstAddress,
  getSecondAddress,
  setFirstAddress,
  setSecondAddress,
} from "../../../../Logic/localStorage/address";
import { useWindowDimensions } from "../../../../Hooks/Viewport";

function CheckoutBodyMainForm({
  title,
  newAddress,
  setIsEveryField,
  clickedContinue,
  firstAddrRef,
  secondAddrRef,
}: {
  newAddress?: boolean;
  title: string;
  setIsEveryField: React.Dispatch<React.SetStateAction<boolean>>;
  clickedContinue: boolean;
  firstAddrRef?: React.RefObject<HTMLDivElement>;
  secondAddrRef?: React.RefObject<HTMLDivElement>;
}) {
  const [activeFormality, setActiveFormality] = useState<boolean[]>([
    true,
    false,
  ]);
  const [transition, setTransition] = useState<boolean[]>([false, false]);

  const [address, setAddress] = useState<IAddress>();

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

  const [isGoodFirst, setIsGoodFirst] = useState<boolean>(false);
  const [isGoodLast, setIsGoodLast] = useState<boolean>(false);
  const [isGoodAddress, setIsGoodAddress] = useState<boolean>(false);
  const [isGoodSecondAddress, setIsGoodSecondAddress] = useState<boolean>(true);
  const [isGoodState, setIsGoodState] = useState<boolean>(true);
  const [isGoodTax, setIsGoodTax] = useState<boolean>(true);
  const [isGoodPostal, setIsGoodPostal] = useState<boolean>(false);
  const [isGoodCity, setIsGoodCity] = useState<boolean>(false);
  const [isGoodBirth, setIsGoodBirth] = useState<boolean>(false);
  const [isGoodCountry, setIsGoodCountry] = useState<boolean>(false);

  const [firstInput, setFirstInput] = useState<string>("");
  const [lastInput, setLastInput] = useState<string>("");
  const [addres1Input, setAddress1Input] = useState<string>("");
  const [address2Input, setAddress2Input] = useState<string>("");
  const [stateInput, setStateInput] = useState<string>("");
  const [codeInput, setCodeInput] = useState<string>("");
  const [cityInput, setCityInput] = useState<string>("");
  const [birthInput, setBirthInput] = useState<string>("");
  const [taxInput, setTaxInput] = useState<string>("");
  const [countryInput, setCountryInput] = useState<string>("");

  useEffect(() => {
    if (newAddress) {
      if (
        isGoodFirst &&
        isGoodLast &&
        isGoodAddress &&
        isGoodPostal &&
        isGoodCity &&
        isGoodCountry &&
        isGoodSecondAddress &&
        isGoodState
      ) {
        setSecondAddress({
          formality: activeFormality[0] ? "Ms." : "Mrs.",
          country: countryInput.trim(),
          firstName: firstInput.trim(),
          lastName: lastInput.trim(),
          addressOne: addres1Input.trim(),
          addressTwo: address2Input.trim(),
          state: stateInput.trim(),
          p_code: codeInput.trim(),
          city: cityInput.trim(),
        });
      }
    } else if (
      isGoodFirst &&
      isGoodLast &&
      isGoodAddress &&
      isGoodPostal &&
      isGoodCity &&
      isGoodBirth &&
      isGoodCountry &&
      isGoodSecondAddress &&
      isGoodState &&
      isGoodTax
    ) {
      setFirstAddress({
        formality: activeFormality[0] ? "Ms." : "Mrs.",
        country: countryInput.trim(),
        firstName: firstInput.trim(),
        lastName: lastInput.trim(),
        addressOne: addres1Input.trim(),
        addressTwo: address2Input.trim(),
        state: stateInput.trim(),
        p_code: codeInput.trim(),
        city: cityInput.trim(),
        birth: birthInput.trim(),
        tax: taxInput.trim(),
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
    isGoodSecondAddress,
    isGoodTax,
    isGoodState,
    lastInput,
    newAddress,
    countryInput,
    stateInput,
    taxInput,
  ]);

  useEffect(() => {
    if (newAddress) {
      if (
        isGoodFirst &&
        isGoodLast &&
        isGoodAddress &&
        isGoodPostal &&
        isGoodCity &&
        isGoodCountry &&
        isGoodSecondAddress &&
        isGoodState
      ) {
        setIsEveryField(true);
        // Address Input For Main Address is different from Billing Addresss
        setSecondAddress({
          formality: activeFormality[0] ? "Ms." : "Mrs.",
          country: countryInput.trim(),
          firstName: firstInput.trim(),
          lastName: lastInput.trim(),
          addressOne: addres1Input.trim(),
          addressTwo: address2Input.trim(),
          state: stateInput.trim(),
          p_code: codeInput.trim(),
          city: cityInput.trim(),
        });
      } else {
        setIsEveryField(false);
      }
    } else {
      if (
        isGoodFirst &&
        isGoodLast &&
        isGoodAddress &&
        isGoodSecondAddress &&
        isGoodTax &&
        isGoodState &&
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
    isGoodSecondAddress,
    isGoodTax,
    isGoodState,
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
    countryInput,
    setIsEveryField,
    stateInput,
  ]);

  const countryRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLDivElement>(null);
  const addressRef = useRef<HTMLDivElement>(null);
  const postalRef = useRef<HTMLDivElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);
  const birthRef = useRef<HTMLDivElement>(null);
  const country2Ref = useRef<HTMLDivElement>(null);
  const first2Ref = useRef<HTMLDivElement>(null);
  const second2Ref = useRef<HTMLDivElement>(null);
  const address2Ref = useRef<HTMLDivElement>(null);
  const postal2Ref = useRef<HTMLDivElement>(null);
  const city2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isGoodCountry) {
      countryRef.current?.scrollIntoView({ block: "center" });
    } else if (!isGoodFirst) {
      firstRef.current?.scrollIntoView({ block: "center" });
    } else if (!isGoodLast) {
      secondRef.current?.scrollIntoView({ block: "center" });
    } else if (!isGoodAddress) {
      addressRef.current?.scrollIntoView({ block: "center" });
    } else if (!isGoodPostal) {
      postalRef.current?.scrollIntoView({ block: "center" });
    } else if (!isGoodCity) {
      cityRef.current?.scrollIntoView({ block: "center" });
    } else if (!isGoodBirth) {
      birthRef.current?.scrollIntoView({ block: "center" });
    }
  }, [clickedContinue, newAddress]);

  const { width } = useWindowDimensions();

  console.log(isGoodSecondAddress);

  useEffect(() => {
    if (firstAddrRef && firstAddrRef.current && newAddress) {
      firstAddrRef.current.style.marginBottom = "2em";
    } else if (secondAddrRef && secondAddrRef.current && newAddress) {
      secondAddrRef.current.style.marginBottom = "2em";
    }
  }, [firstAddrRef, secondAddrRef, newAddress]);

  return (
    <div
      ref={
        firstAddrRef ? firstAddrRef : secondAddrRef ? secondAddrRef : undefined
      }
      className="checkoutBodyMainForm"
    >
      <h1>{title}</h1>
      <div className="checkoutBodyMainForm__title-country">
        <div className="checkoutBodyMainForm__input">
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
          <InputFormCheckout
            inputRef={newAddress ? country2Ref : countryRef}
            bgColor="rgb(240,240,240)"
            width={100}
            height={40}
            placeholder={"Country"}
            optional={false}
            margin={width <= 650 ? [20, 0, 20, 0] : [20, 0, 20, 0]}
            setIsGood={setIsGoodCountry}
            initialInput={address?.country}
            setInputParent={setCountryInput}
            percWidth={true}
            widthWithoutMargin={width <= 650 ? undefined : "calc(50% - 10px)"}
            regex={/^[a-zA-Z ]{2,100}$/i}
            regexWarning={"Please use a valid country."}
          />
        </div>
      </div>
      <div className="checkoutBodyMainForm__input">
        <InputFormCheckout
          inputRef={newAddress ? first2Ref : firstRef}
          bgColor="rgb(240,240,240)"
          width={width <= 650 ? 100 : 50}
          height={40}
          placeholder={"First name"}
          optional={false}
          margin={width <= 650 ? [20, 0, 20, 0] : [20, 10, 20, 0]}
          setIsGood={setIsGoodFirst}
          initialInput={address?.firstName}
          setInputParent={setFirstInput}
          percWidth={true}
          regex={/^[a-zA-Z ]{2,100}$/i}
          regexWarning={"Please use a valid first name."}
        />
        <InputFormCheckout
          inputRef={newAddress ? second2Ref : secondRef}
          bgColor="rgb(240,240,240)"
          height={40}
          width={width <= 650 ? 100 : 50}
          placeholder={"Last name"}
          optional={false}
          margin={width <= 650 ? [20, 0, 20, 0] : [20, 0, 20, 10]}
          setIsGood={setIsGoodLast}
          initialInput={address?.lastName}
          setInputParent={setLastInput}
          percWidth={true}
          regex={/^[a-zA-Z ]{2,100}$/i}
          regexWarning={"Please use a valid last name."}
        />
      </div>
      <div className="checkoutBodyMainForm__input">
        <InputFormCheckout
          inputRef={newAddress ? address2Ref : addressRef}
          bgColor="rgb(240,240,240)"
          width={100}
          height={40}
          placeholder={"Address 1"}
          optional={false}
          margin={[20, 0, 20, 0]}
          setIsGood={setIsGoodAddress}
          initialInput={address?.addressOne}
          setInputParent={setAddress1Input}
          percWidth={true}
          regex={/^[\w .-]{2,100}$/i}
          regexWarning={
            "Please use a valid address. Only '.' and '-' are allowed."
          }
        />
      </div>
      <div className="checkoutBodyMainForm__input">
        <InputFormCheckout
          bgColor="rgb(240,240,240)"
          width={100}
          height={40}
          placeholder={"Address 2 (optional)"}
          optional={true}
          margin={[20, 0, 20, 0]}
          initialInput={address?.addressTwo}
          setInputParent={setAddress2Input}
          setIsGood={setIsGoodSecondAddress}
          percWidth={true}
          regex={/^[\w .-]{2,100}$/i}
          regexWarning={
            "Please use a valid address. Only '.' and '-' are allowed."
          }
        />
      </div>
      <div className="checkoutBodyMainForm__input">
        <InputFormCheckout
          bgColor="rgb(240,240,240)"
          width={100}
          height={40}
          placeholder={"State"}
          optional={true}
          margin={[20, 0, 20, 0]}
          initialInput={address?.state}
          setInputParent={setStateInput}
          percWidth={true}
          setIsGood={setIsGoodState}
          regex={/^[a-zA-Z ]{2,100}$/i}
          regexWarning={"Please use a valid city."}
        />
      </div>
      <div className="checkoutBodyMainForm__input">
        <InputFormCheckout
          inputRef={newAddress ? postal2Ref : postalRef}
          bgColor="rgb(240,240,240)"
          width={width <= 650 ? 100 : 50}
          height={40}
          placeholder={"Postal code"}
          optional={false}
          margin={width <= 650 ? [20, 0, 20, 0] : [20, 10, 20, 0]}
          setIsGood={setIsGoodPostal}
          initialInput={address?.p_code}
          setInputParent={setCodeInput}
          percWidth={true}
          regex={/^[\w ]{2,100}$/i}
          regexWarning={"Please use a valid postal code."}
        />
        <InputFormCheckout
          inputRef={newAddress ? city2Ref : cityRef}
          bgColor="rgb(240,240,240)"
          width={width <= 650 ? 100 : 50}
          height={40}
          placeholder={"City"}
          optional={false}
          margin={width <= 650 ? [20, 0, 20, 0] : [20, 0, 20, 10]}
          setIsGood={setIsGoodCity}
          initialInput={address?.city}
          setInputParent={setCityInput}
          percWidth={true}
          regex={/^[a-zA-Z ]{2,100}$/i}
          regexWarning={"Please use a valid city."}
        />
      </div>
      {newAddress === true ? (
        ""
      ) : (
        <div className="checkoutBodyMainForm__input">
          <InputFormCheckout
            inputRef={birthRef}
            bgColor="rgb(240,240,240)"
            width={width <= 650 ? 100 : 50}
            height={40}
            placeholder={"YYYY-MM-DD"}
            optional={false}
            margin={width <= 650 ? [20, 0, 20, 0] : [20, 10, 20, 0]}
            setIsGood={setIsGoodBirth}
            initialInput={address?.birth}
            setInputParent={setBirthInput}
            percWidth={true}
            birth={true}
            regex={
              /^(19[0-9][0-9])|(20[0-2][0-2])\/((0[1-9])|(1[0-2]))\/((0[1-9])|(1[0-9])|(2[0-9])|(3[0-1]))$/
            }
            regexWarning={"From 1900/01/01 up to 2022/12/31"}
          />
          <InputFormCheckout
            bgColor="rgb(240,240,240)"
            width={width <= 650 ? 100 : 50}
            height={40}
            placeholder={"Tax ID"}
            optional={true}
            margin={width <= 650 ? [20, 0, 20, 0] : [20, 0, 20, 10]}
            initialInput={address?.tax}
            setInputParent={setTaxInput}
            setIsGood={setIsGoodTax}
            percWidth={true}
            regex={/^[\d]{2,100}$/i}
            regexWarning={"Please use a valid Tax ID."}
          />
        </div>
      )}
    </div>
  );
}

export default React.memo(CheckoutBodyMainForm);
