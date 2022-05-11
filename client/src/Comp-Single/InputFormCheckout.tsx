import React, { useEffect, useRef, useState } from "react";
import "../styles/Comp-Single/InputFormCheckout.css";
import useOutsideAlerter from "../Hooks/OutsideAlerter";

function InputFormCheckout({
  width,
  placeholder,
  optional,
  height,
  bgColor,
  margin,
  setIsGood,
  initialInput,
  setInputParent,
  percWidth,
  widthWithoutMargin,
  inputRef,
  birth,
  regex,
  regexWarning,
}: {
  width: number;
  height: number;
  placeholder: string;
  optional: boolean;
  bgColor: string;
  margin: number[];
  setIsGood: React.Dispatch<React.SetStateAction<boolean>>;
  initialInput?: string;
  setInputParent: React.Dispatch<React.SetStateAction<string>>;
  percWidth?: boolean;
  widthWithoutMargin?: string;
  inputRef?: React.RefObject<HTMLDivElement>;
  birth?: boolean;
  regex?: RegExp;
  regexWarning: string;
}) {
  const [selectedInput, setSelectedInput] = useState<boolean>(false);
  const parentRef = useRef<HTMLDivElement>(null);
  const outside = useOutsideAlerter(parentRef);
  const [showWarn, setShowWarn] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [warning, setWarning] = useState<string>(
    "This entry cannot be left blank"
  );

  useEffect(() => {
    if (!input) {
      if (!optional) {
        setShowWarn(true);
        setWarning("This entry cannot be left blank");
      } else {
        setShowWarn(false);
      }
    } else if (!regex?.test(input)) {
      setShowWarn(true);
      setWarning(regexWarning);
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

  useEffect(() => {
    if (initialInput) {
      setInput(initialInput);
      setInputParent(initialInput);
    }
  }, [initialInput, setInputParent]);

  const getIcon = (): JSX.Element => {
    if (showWarn) {
      return <span className="inputFormCheckout__warn-icon"></span>;
    } else {
      return <span className="inputFormCheckout__good-icon"></span>;
    }
  };
  useEffect(() => {
    if (setIsGood) {
      if (showWarn) {
        setIsGood(false);
      } else {
        setIsGood(true);
      }
    }
  }, [showWarn, optional, setIsGood]);

  const [leadingSlash, setLeadingSlash] = useState<boolean>(false);

  return (
    <div
      ref={inputRef}
      className="inputFormCheckout"
      style={{
        width: widthWithoutMargin
          ? widthWithoutMargin
          : percWidth
          ? width + "%"
          : "px",
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
        onChange={(e) => {
          if (birth) {
            const regex = /^([0-9]{1,4})(\/([0-9]{1,2})?)?(\/([0-9]{1,2})?)?$/;
            if (regex.test(e.target.value)) {
              if (
                (e.target.value.length === 4 || e.target.value.length === 7) &&
                !leadingSlash
              ) {
                setInput(e.target.value + "/");
                setInputParent(e.target.value + "/");
                setLeadingSlash(true);
              } else {
                setInput(e.target.value);
                setInputParent(e.target.value);
                setLeadingSlash(false);
              }
            } else {
              e.preventDefault();
            }
          } else {
            setInput(e.target.value);
            setInputParent(e.target.value);
          }
        }}
      />
      {getIcon()}
    </div>
  );
}

export default React.memo(InputFormCheckout);
