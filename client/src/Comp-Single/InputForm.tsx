import React, { useEffect, useRef, useState } from "react";
import "../styles/Comp-Single/InputForm.css";

function InputForm({
  width,
  placeholder,
  type,
  height,
  border,
}: {
  width: number;
  placeholder: string;
  type: string;
  height: number;
  border: number[];
}) {
  const [input, setInput] = useState<string>("");

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
      className={`inputForm ${isFocused ? "inputForm__focused" : ""}`}
      style={{
        width: width,
        height: height,
        marginTop: border[0] + "px",
        marginRight: border[1] + "px",
        marginBottom: border[2] + "px",
        marginLeft: border[3] + "px",
      }}
    >
      <input
        type={type}
        placeholder={placeholder}
        name="input"
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
    </div>
  );
}

export default InputForm;
