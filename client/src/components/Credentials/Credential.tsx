import React, { useEffect, useRef, useState } from "react";
import "../../styles/components/Credentials/Credential.css";
import { IoMdClose } from "react-icons/io";
import InteractiveBtn from "../../Comp-Single/InteractiveBtn";
import { FaFacebookF } from "react-icons/fa";
import { AiFillApple } from "react-icons/ai";
import InputForm from "../../Comp-Single/InputForm";
import { Link } from "react-router-dom";
import { checkRegex } from "../../Logic/Credentials";
import { register, login } from '../../API/Credential';

function Credential({
  clickedLogin,
  setClickedLogin,
}: {
  clickedLogin: boolean;
  setClickedLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [chosenAction, setChosenAction] = useState<boolean[]>([true, false]);

  const [clickedNews, setClickedNews] = useState<boolean>(false);

  const [regex, setRegex] = useState<boolean[]>([true, true, true, true]);
  const [warning, setWarning] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const [input1, setInput1] = useState<string>("");
  const [input2, setInput2] = useState<string>("");
  const [input3, setInput3] = useState<string>("");
  const [input4, setInput4] = useState<string>("");
  const [warn, setWarn] = useState<string[]>([
    "Please enter your first name",
    "Please enter your last name",
    "Please enter your email address",
    "Please enter your password",
  ]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    var warnArr = []
    if (!input1) {
      setWarn(['Please enter your first name', warn[1], warn[2], warn[3]])
    }
    if (!input2) {
      setWarn([warn[0], 'Please enter your last name', warn[2], warn[3]])
    }
    if (!input3) {
      setWarn([warn[0], warn[1], 'Please enter your email address', warn[3]])
    }
    if (!input4) {
      setWarn([warn[0], warn[1], warn[2], 'Please enter your password'])
    }
    if (chosenAction[0]) {
      register(input1, input2, input3, input4)
    }
    else {
      login(input3, input4) 
    }
  };

  return (
    <div
      className={`credential ${
        clickedLogin ? "credential__show" : "credential__hide"
      }`}
    >
      <div className="credential__container">
        <div className="credential__container-top">
          <h2>Log in</h2>
          <div
            className="credential__container-close"
            onClick={() => {
              setClickedLogin(false);
            }}
          >
            <IoMdClose />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="credential__chooser">
            <div className="credential__chooser-type">
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  setChosenAction([true, false]);
                }}
                className={`${
                  chosenAction[0] ? "credential__chooser-chose" : ""
                }`}
              >
                Register
              </button>
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  setChosenAction([false, true]);
                }}
                className={`${
                  chosenAction[1] ? "credential__chooser-chose" : ""
                }`}
              >
                Log in
              </button>
            </div>
            <div className="credential__chooser-misc">
              <InteractiveBtn
                text={"Facebook"}
                width={250}
                height={50}
                bgColor={"#1878F2"}
                icon={<FaFacebookF />}
              />
              <InteractiveBtn
                text={"Apple"}
                width={250}
                height={50}
                bgColor={"white"}
                color={"black"}
                border={"1px solid rgb(200,200,200)"}
                icon={<AiFillApple />}
              />
            </div>
          </div>
          <div className="credential__inputs">
            {chosenAction[0] ? (
              <>
                <InputForm
                  width={270}
                  height={50}
                  placeholder={"First name"}
                  type={"text"}
                  border={[10, 10, 10, 10]}
                  warning={false}
                  warningMsg={warn[0]}
                  setInputParent={setInput1}
                />
                <InputForm
                  width={270}
                  height={50}
                  placeholder={"Last name"}
                  type={"text"}
                  border={[10, 10, 10, 10]}
                  warning={false}
                  warningMsg={warn[1]}
                  setInputParent={setInput2}
                />
              </>
            ) : (
              ""
            )}
            <InputForm
              width={270}
              height={50}
              placeholder={"Your email address"}
              type={"text"}
              border={[10, 10, 10, 10]}
              warning={false}
              warningMsg={warn[2]}
              setInputParent={setInput3}
            />
            <InputForm
              width={270}
              height={50}
              placeholder={"Password (min. 6 characters)"}
              type={"password"}
              border={[10, 10, 10, 10]}
              warning={false}
              warningMsg={warn[3]}
              setInputParent={setInput4}
            />
          </div>
          {chosenAction[1] ? (
            <div className="credential__forgotPw">
              <Link to="">Forgot your password?</Link>
            </div>
          ) : (
            ""
          )}
          {chosenAction[0] ? (
            <div className="credential__address">
              <span className="credential__address-text">
                How should we address you?
              </span>
            </div>
          ) : (
            ""
          )}
          {chosenAction[0] ? (
            <div
              className="credential__asking-permission"
              onClick={() => setClickedNews(!clickedNews)}
            >
              <div
                className={`credential__asking-permission-input ${
                  clickedNews
                    ? "credential__asking-permission-input-clicked"
                    : ""
                }`}
              ></div>
              <span>
                I would like to receive email updates from ABOUT YOU on current
                trends, offers, and vouchers. Unsubscribe any time, free of
                charge.
              </span>
            </div>
          ) : (
            ""
          )}
          <div
            className={`credential__log-btn ${
              chosenAction[1] ? "credential__log-btn-extra-margin" : ""
            }`}
          >
            <InteractiveBtn
              text={chosenAction[0] ? "Register" : "Login"}
              width={250}
              height={50}
            />
          </div>
          {chosenAction[0] ? (
            <div className="credential__extra-info">
              <span>
                As with any online shop, you will receive all relevant order
                information from us via email. These include order confirmation,
                delivery confirmation, return information, recommendations). You
                may opt out of the recommendations at any time for free.
              </span>
              <Link to="">Privacy Policy</Link>
            </div>
          ) : (
            ""
          )}
        </form>
      </div>
      <div
        onClick={() => {
          setClickedLogin(false);
        }}
        className="credential__overlay"
      ></div>
    </div>
  );
}

export default Credential;
