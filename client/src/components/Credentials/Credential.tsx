import React, { useEffect, useState, useContext, useCallback } from "react";
import "../../styles/components/Credentials/Credential.css";
import { IoMdClose } from "react-icons/io";
import InteractiveBtn from "../../Comp-Single/InteractiveBtn";
import { FaFacebookF } from "react-icons/fa";
import { AiFillApple } from "react-icons/ai";
import InputForm from "../../Comp-Single/InputForm";
import { Link } from "react-router-dom";
import { checkRegex } from "../../Logic/Credentials";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/Auth";
import { MobileContext } from "../../Context/Mobile";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  login_user_no_third_party,
  register_user_no_third_party,
} from "../../Apollo/User";

function Credential({
  clickedLogin,
  setClickedLogin,
  disableClosing,
  setChosenAction,
  chosenAction,
}: {
  clickedLogin: boolean;
  setClickedLogin: React.Dispatch<React.SetStateAction<boolean>>;
  disableClosing?: boolean;
  chosenAction: boolean[];
  setChosenAction: React.Dispatch<React.SetStateAction<boolean[]>>;
}) {
  const [clickedNews, setClickedNews] = useState<boolean>(false);
  const navigate = useNavigate();

  const context = useContext(AuthContext);
  const mContext = useContext(MobileContext);

  const [input1, setInput1] = useState<string>("");
  const [input2, setInput2] = useState<string>("");
  const [input3, setInput3] = useState<string>("");
  const [input4, setInput4] = useState<string>("");
  const [warn, setWarn] = useState<string>();
  const [fade_warning, set_fade_warning] = useState<boolean>(false);

  const [register_user_no_third_party_mut] = useMutation(
    register_user_no_third_party
  );

  const [login_user_no_third_party_query] = useLazyQuery(
    login_user_no_third_party
  );

  const handleShowFade = useCallback(() => {
    set_fade_warning(true);
    const timeout = setTimeout(() => {
      set_fade_warning(false);
    }, 2500);
    return () => clearTimeout(timeout);
  }, []);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    e.preventDefault();
    if (!isLoading && !fade_warning) {
      setIsLoading(true);
      if (chosenAction[0]) {
        const reg1 = checkRegex(input1, "first");
        if (!reg1) {
          setWarn("Please use a valid first name.");
		  setIsLoading(false);
          handleShowFade();
          return;
        }
        const reg2 = checkRegex(input2, "last");
        if (!reg2) {
          setWarn("Please use a valid last name.");
		  setIsLoading(false);
          handleShowFade();
          return;
        }
        const reg3 = checkRegex(input3, "email");
        if (!reg3) {
          setWarn("Please use a valid email address.");
		  setIsLoading(false);
          handleShowFade();
          return;
        }
        const reg4 = checkRegex(input4, "password");
        if (!reg4) {
          setWarn(
            "Please use a valid password. Only alphanumerics, @ and - are allowed and the password must be at least 6 digits long"
          );
		  setIsLoading(false);
          handleShowFade();
          return;
        }
        if (input1 && input2 && input3 && input4) {
          register_user_no_third_party_mut({
            variables: {
              first: input1,
              last: input2,
              email: input3,
              password: input4,
            },
          })
            .then(({ data }) => {
              setIsLoading(false);
              if (data.register_user_no_third_party.id === "-1") {
                setWarn("Email is already in use.");
                handleShowFade();
              } else {
                setWarn(
                  "Succesfully registered. Please check your email address."
                );
                handleShowFade();
                setTimeout(() => {
                  setChosenAction([false, true]);
                }, 2600);
              }
            })
            .catch(() => {
              setIsLoading(false);
              setWarn(
                "Something went wrong, please try again. If the problem persists, please contact us via email."
              );
              handleShowFade();
            });
        }
      } else if (chosenAction[1]) {
        const reg3 = checkRegex(input3, "email");
        if (!reg3) {
          setWarn("Please use a valid email address.");
		  setIsLoading(false);
          handleShowFade();
          return;
        }
        const reg4 = checkRegex(input4, "password");
        if (!reg4) {
          setWarn(
            "Please use a valid password. Only alphanumerics, @ and - are allowed and the password must be at least 6 digits long"
          );
		  setIsLoading(false);
          handleShowFade();
          return;
        }
        if (input3 && input4) {
          login_user_no_third_party_query({
            variables: { email: input3, password: input4 },
          })
            .then(({ data }) => {
              setIsLoading(false);
              if (data.login_user_no_third_party.success) {
                window.dispatchEvent(new Event("loggedIn"));
                const { uid, token, expirationDate } =
                  data.login_user_no_third_party;
                context.login(uid, token, new Date(parseInt(expirationDate)));
                setTimeout(() => {
                  setClickedLogin(false);
                }, 2600);
              }
              setWarn(data.login_user_no_third_party.message);
              handleShowFade();
            })
            .catch(() => {
              setIsLoading(false);
              setWarn(
                "Something went wrong, please try again. If the problem persists, please contact us via email."
              );
              handleShowFade();
            });
        }
      }
    } else {
      setWarn("Please wait 2 seconds before trying again.");
    }
  };

  return (
    <div
      className={`credential ${
        clickedLogin ? "credential__show" : "credential__hide"
      } ${mContext.isMobile ? "credential-mobile" : ""}`}
    >
      {warn ? (
        <div
          className={`credential__warn ${
            fade_warning ? "credential__warn-fade" : ""
          }`}
        >
          {warn}
        </div>
      ) : (
        ""
      )}
      <div className="credential__container">
        <div className="credential__container-top">
          <h2>{chosenAction[0] ? "Register" : "Log In"}</h2>
          <div
            className={`credential__container-close`}
            onClick={() => {
              if (!disableClosing) {
                setClickedLogin(false);
              } else {
                navigate("/");
                setClickedLogin(false);
              }
            }}
          >
            <IoMdClose />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="credential__chooser">
            <div className="credential__chooser-type">
              <button
                type="button"
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
                type="button"
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
                onClick={() => {
                  console.log("clicked fb");
                }}
                text={"Facebook"}
                width={250}
                height={50}
                bgColor={"#1878F2"}
                icon={<FaFacebookF />}
                isLoading={false}
                type="button"
                facebook={true}
              />
              <InteractiveBtn
                onClick={() => {}}
                text={"Apple"}
                width={250}
                height={50}
                bgColor={"white"}
                color={"black"}
                border={"1px solid rgb(200,200,200)"}
                icon={<AiFillApple />}
                isLoading={false}
                type="button"
              />
              <InteractiveBtn
                onClick={() => {
                  console.log("clicked fb");
                }}
                text={"Facebook"}
                width={250}
                height={50}
                bgColor={"#1878F2"}
                icon={<FaFacebookF />}
                isLoading={false}
                type="button"
              />
              <InteractiveBtn
                onClick={() => {
                  console.log("clicked fb");
                }}
                text={"Facebook"}
                width={250}
                height={50}
                bgColor={"#1878F2"}
                icon={<FaFacebookF />}
                isLoading={false}
                type="button"
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
                  setInputParent={setInput1}
                  transformAmount={-230}
                />
                <InputForm
                  width={270}
                  height={50}
                  placeholder={"Last name"}
                  type={"text"}
                  border={[10, 10, 10, 10]}
                  setInputParent={setInput2}
                  transformAmount={-230}
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
              setInputParent={setInput3}
              transformAmount={-230}
            />
            <InputForm
              width={270}
              height={50}
              placeholder={"Password (min. 6 characters)"}
              type={"password"}
              border={[10, 10, 10, 10]}
              setInputParent={setInput4}
              transformAmount={-230}
              autocomplete={true}
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
              onClick={(e) => handleSubmit(e)}
              text={chosenAction[0] ? "Register" : "Login"}
              width={250}
              height={50}
              //   isLoading={chosenAction[0] ? isLoadingRegister : isLoadingLogin}
              isLoading={isLoading}
              type="submit"
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
