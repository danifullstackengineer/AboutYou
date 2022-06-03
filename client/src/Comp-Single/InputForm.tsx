import React, { useEffect, useRef, useState } from "react";
import "../styles/Comp-Single/InputForm.css";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { IoIosClose } from "react-icons/io";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function InputForm({
  width,
  placeholder,
  type,
  height,
  border,
  warning,
  warningMsg,
  setInputParent,
  transformAmount,
  dontShowDelete,
  value,
  locked,
  bgColor,
  calendar,
  setDate,
  phoneNumber,
  date,
  autocomplete,
}: {
  width: number;
  placeholder: string;
  type: string;
  height: number;
  border: number[];
  warning?: boolean;
  warningMsg?: string;
  setInputParent?: React.Dispatch<React.SetStateAction<string>>;
  transformAmount: number;
  dontShowDelete?: boolean;
  value?: string;
  locked?: boolean;
  bgColor?: string;
  calendar?: boolean;
  setDate?: React.Dispatch<React.SetStateAction<Date | string>>;
  phoneNumber?: boolean;
  date?: string | Date;
  autocomplete?: boolean;
}) {
  const [input, setInput] = useState<string>("");
  const [deleteTyped, setDeleteTyped] = useState<boolean>(false);

  const divRef = useRef<HTMLDivElement>(null);

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [clearInput, setClearInput] = useState<boolean>(false);

  useEffect(() => {
    if (value) {
      setInput(value);
    }
  }, [value]);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.setAttribute("data-placeholder", placeholder);
    }
  }, [placeholder]);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.style.setProperty(
        "--transformVariableY",
        transformAmount + "%"
      );
    }
  }, [transformAmount]);

  useEffect(() => {
    if (input && !warning && isFocused) {
      setDeleteTyped(true);
    } else {
      setDeleteTyped(false);
    }
  }, [input, isFocused, warning]);

  useEffect(() => {
    if (clearInput) {
      setInput("");
    }
    setClearInput(false);
  }, [clearInput]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && clearInput) {
      inputRef.current.focus();
    }
  }, [input, clearInput]);

  const [visibleDate, setVisibleDate] = useState<boolean>(false);

  const handlePhoneNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const regex = /^([+]?[0-9]{0,15})$/;
    if (regex.test(e.target.value)) {
      setInput(e.target.value);
      if (setInputParent) {
        setInputParent(e.target.value);
      }
    }
  };

  return (
    <div
      ref={divRef}
      className={`inputForm ${isFocused || input ? "inputForm__focused" : ""} ${
        warning ? "inputForm-warn" : ""
      } ${locked ? "inputForm-locked" : ""} ${
        calendar ? "inputForm-calendar" : ""
      }`}
      style={{
        marginTop: border[0] + "px",
        marginRight: border[1] + "px",
        marginBottom: border[2] + "px",
        marginLeft: border[3] + "px",
      }}
    >
      <input
        disabled={locked}
        ref={inputRef}
        onClick={() => setVisibleDate(!visibleDate)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => (deleteTyped ? undefined : setIsFocused(false))}
        type={type}
        placeholder={placeholder}
        style={{
          width: width,
          height: height,
          backgroundColor: bgColor ? bgColor : undefined,
        }}
        name="input"
        onChange={(e) => {
          if (!phoneNumber) {
            setInput(e.target.value);
            if (setInputParent) {
              setInputParent(e.target.value);
            }
          } else {
            handlePhoneNumberChange(e);
          }
        }}
        value={input}
        readOnly={calendar}
        autoComplete={autocomplete ? "on" : "off"}
      />
      {warning ? (
        <span className="inputForm__icon-warn">
          <HiOutlineExclamationCircle />
        </span>
      ) : (
        ""
      )}
      {deleteTyped && !dontShowDelete && !locked ? (
        <span
          className="inputForm__icon-delete"
          onClick={() => {
            setClearInput(true);
            if (setInputParent) {
              setInputParent("");
            }
          }}
        >
          <IoIosClose />
        </span>
      ) : (
        ""
      )}
      <span
        style={{ opacity: warning ? "1" : "0" }}
        className="inputForm__span-warn"
      >
        {warningMsg}
      </span>
      {calendar ? (
        <div
          className="inputForm__calendar"
          style={{ top: height + 10, display: visibleDate ? "block" : "none" }}
        >
          <Calendar
            calendarType="ISO 8601"
            onChange={(value: Date) => {
              if (setDate && date instanceof Date) {
                setDate(value);
              }
              setVisibleDate(!visibleDate);
            }}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default React.memo(InputForm);
