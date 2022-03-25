import React, { useEffect, useRef, useState } from "react";
import "../styles/Comp-Single/InputForm.css";
import { HiOutlineExclamationCircle } from "react-icons/hi";

function InputForm({
  width,
  placeholder,
  type,
  height,
  border,
  warning,
  warningMsg,
  setInputParent,
}: {
  width: number;
  placeholder: string;
  type: string;
  height: number;
  border: number[];
  warning?: boolean;
  warningMsg?: string;
  setInputParent?: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [input, setInput] = useState<string>("");
  const [empty, setEmpty] = useState<boolean>(false);

  const divRef = useRef<HTMLDivElement>(null);

  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.setAttribute("data-placeholder", placeholder);
    }
  }, []);

  return (
    <div
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
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
        style={{
          width: width,
          height: height,
        }}
        type={type}
        placeholder={placeholder}
        name="input"
        onChange={(e) => {
          setInput(e.target.value);
          if (setInputParent) {
            setInputParent(e.target.value);
          }
          if (!e.target.value) {
            setEmpty(true);
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
      {warning ? (
        <span className="inputForm__span-warn">{warningMsg}</span>
      ) : (
        ""
      )}
    </div>
  );
}

export default InputForm;
