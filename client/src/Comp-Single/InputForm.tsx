import React, { useEffect, useRef, useState } from "react";
import "../styles/Comp-Single/InputForm.css";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { IoIosClose } from "react-icons/io";

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
  dontShowDelete
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
}) {
  const [input, setInput] = useState<string>("");
  const [deleteTyped, setDeleteTyped] = useState<boolean>(false);

  const divRef = useRef<HTMLDivElement>(null);

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [clearInput, setClearInput] = useState<boolean>(false);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.setAttribute("data-placeholder", placeholder);
    }
  }, [placeholder]);


  useEffect(() => {
    if (divRef.current) {
      divRef.current.style.setProperty("--transformVariableY", transformAmount + "%")
    }
  }, [transformAmount])

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

  return (
    <div
      ref={divRef}
      className={`inputForm ${isFocused ? "inputForm__focused" : ""} ${
        warning ? "inputForm-warn" : ""
      }`}
      style={{
        marginTop: border[0] + "px",
        marginRight: border[1] + "px",
        marginBottom: border[2] + "px",
        marginLeft: border[3] + "px",
      }}
    >
      <input
        ref={inputRef}
        onFocus={() => setIsFocused(true)}
        onBlur={() => (deleteTyped ? undefined : setIsFocused(false))}
        type={type}
        placeholder={placeholder}
        style={{ width: width, height: height }}
        name="input"
        onChange={(e) => {
          setInput(e.target.value);
          if (setInputParent) {
            setInputParent(e.target.value);
          }
        }}
        value={input}
      />
      {warning ? (
        <span className="inputForm__icon-warn">
          <HiOutlineExclamationCircle />
        </span>
      ) : (
        ""
      )}
      {deleteTyped && !dontShowDelete ? (
        <span
          className="inputForm__icon-delete"
          onClick={() => {
            setClearInput(true);
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
    </div>
  );
}

export default InputForm;
