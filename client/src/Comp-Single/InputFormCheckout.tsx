import React, { useEffect, useRef, useState } from "react";
import "../styles/Comp-Single/InputFormCheckout.css";
import useOutsideAlerter from "../Hooks/OutsideAlerter";

function InputFormCheckout({
  width,
  placeholder,
  warning,
  optional,
  height,
  bgColor,
  margin,
}: {
  width: number;
  height: number;
  placeholder: string;
  warning: string;
  optional: boolean;
  bgColor: string;
  margin: number[];
}) {
  const [selectedInput, setSelectedInput] = useState<boolean>(false);
  const parentRef = useRef<HTMLDivElement>(null);
  const outside = useOutsideAlerter(parentRef);
  const [showWarn, setShowWarn] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    if (!input) {
      setShowWarn(true);
    } else {
      setShowWarn(false);
    }
  }, [input]);

  useEffect(() => {
    if (outside) {
      setSelectedInput(false);
    }
  }, [outside]);

  const handleInputClick = (): void => {
    setSelectedInput(true);
  };

  const getIcon = (): JSX.Element => {
    if (showWarn && !optional) {
      return <span className="inputFormCheckout__warn-icon"></span>;
    } else {
      return <span className="inputFormCheckout__good-icon"></span>;
    }
  };

  return (
    <div
      ref={parentRef}
      className="inputFormCheckout"
      style={{
        width: width,
        height: height + "px",
        backgroundColor: bgColor,
        marginTop: margin[0] + "px",
        marginRight: margin[1] + "px",
        marginBottom: margin[2] + "px",
        marginLeft: margin[3] + "px",
        borderBottom: selectedInput
          ? "1px solid black"
          : "1px solid transparent",
      }}
    >
      {showWarn ? (
        <span className="inputFormCheckout__warn">{warning}</span>
      ) : (
        ""
      )}
      <input
        type="text"
        placeholder={placeholder}
        onClick={handleInputClick}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {getIcon()}
    </div>
  );
}

export default InputFormCheckout;
