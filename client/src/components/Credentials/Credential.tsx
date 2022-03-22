import React, { useEffect, useRef, useState } from "react";
import "../../styles/components/Credentials/Credential.css";
import { IoMdClose } from "react-icons/io";
import InteractiveBtn from "../../Comp-Single/InteractiveBtn";
import { FaFacebookF } from "react-icons/fa";
import { AiFillApple } from "react-icons/ai";
import InputForm from "../../Comp-Single/InputForm";
import { Link } from "react-router-dom";

function Credential({
  clickedLogin,
  setClickedLogin,
}: {
  clickedLogin: boolean;
  setClickedLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [chosenAction, setChosenAction] = useState<boolean[]>([true, false]);

  const [clickedNews, setClickedNews] = useState<boolean>(false);

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
        <form>
          <div className="credential__chooser">
            <div className="credential__chooser-type">
              <button
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
                  height={40}
                  placeholder={"First name"}
                  type={"text"}
                  border={[10, 10, 10, 10]}
                />
                <InputForm
                  width={270}
                  height={40}
                  placeholder={"Last name"}
                  type={"text"}
                  border={[10, 10, 10, 10]}
                />{" "}
              </>
            ) : (
              ""
            )}
            <InputForm
              width={270}
              height={40}
              placeholder={"Your email address"}
              type={"text"}
              border={[10, 10, 10, 10]}
            />
            <InputForm
              width={270}
              height={40}
              placeholder={"Password (min. 6 characters)"}
              type={"password"}
              border={[10, 10, 10, 10]}
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
