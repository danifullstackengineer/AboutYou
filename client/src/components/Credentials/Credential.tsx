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
  const [data, setData] = useState<{
    first: string;
    last: string;
    email: string;
    password: string;
  }>({ first: "", last: "", email: "", password: "" });
  const [warn, setWarn] = useState<string>();
  const [fade_warning, set_fade_warning] = useState<boolean>(false);
  const [loginForm, setLoginForm] = useState<boolean>(false);
  const [registerForm, setRegisterForm] = useState<boolean>(false);
  const [reset, setReset] = useState<number>(1);

  const [
    register_user_no_third_party_mut,
    { loading: loadingReg, error: errorReg, data: dataReg },
  ] = useMutation(register_user_no_third_party, {
    variables: {
      first: data.first,
      last: data.last,
      email: data.email,
      password: data.password,
    },
  });

  useEffect(() => {
    if (chosenAction) {
      setReset(reset + 1);
      setData({ first: "", last: "", email: "", password: "" });
      setInput1("");
      setInput2("");
      setInput3("");
      setInput4("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenAction]);

  const [
    login_user_no_third_party_query,
    { loading: loadingLog, error: errorLog, data: dataLog },
  ] = useLazyQuery(login_user_no_third_party, {
    variables: {
      email: data.email,
      password: data.password,
    },
  });

  const handleShowFade = useCallback(() => {
    set_fade_warning(true);
    const timeout = setTimeout(() => {
      set_fade_warning(false);
    }, 2500);
    return () => clearTimeout(timeout);
  }, []);

  const handleSubmit = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!loadingReg && !loadingLog && !fade_warning) {
      if (chosenAction[0]) {
        const reg1 = checkRegex(input1, "first");
        if (!reg1) {
          setWarn("Please use a valid first name.");
          handleShowFade();
          return;
        }
        const reg2 = checkRegex(input2, "last");
        if (!reg2) {
          setWarn("Please use a valid last name.");
          handleShowFade();
          return;
        }
        const reg3 = checkRegex(input3, "email");
        if (!reg3) {
          setWarn("Please use a valid email address.");
          handleShowFade();
          return;
        }
        const reg4 = checkRegex(input4, "password");
        if (!reg4) {
          setWarn(
            "Please use a valid password. Only alphanumerics, @ and - are allowed and the password must be at least 6 digits long"
          );
          handleShowFade();
          return;
        }
        if (input1 && input2 && input3 && input4) {
          setData({
            first: input1.trim(),
            last: input2.trim(),
            email: input3.trim(),
            password: input4.trim(),
          });
          setRegisterForm(true);
        }
      } else if (chosenAction[1]) {
        const reg3 = checkRegex(input3, "email");
        if (!reg3) {
          setWarn("Please use a valid email address.");
          handleShowFade();
          return;
        }
        const reg4 = checkRegex(input4, "password");
        if (!reg4) {
          setWarn(
            "Please use a valid password. Only alphanumerics, @ and - are allowed and the password must be at least 6 digits long"
          );
          handleShowFade();
          return;
        }
        if (input3 && input4) {
          setData({
            first: input1,
            last: input2,
            email: input3.trim(),
            password: input4.trim(),
          });
          setLoginForm(true);
        }
      }
    } else {
      setWarn("Please wait 2 seconds before trying again.");
    }
  };

  useEffect(() => {
    if (registerForm) {
      register_user_no_third_party_mut();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerForm]);

  useEffect(() => {
    if (loginForm) {
      login_user_no_third_party_query();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginForm]);

  useEffect(() => {
    if (errorReg) {
      setRegisterForm(false);
      setWarn(
        "Something went wrong, please try again. If the problem persists, please contact us via email."
      );
      handleShowFade();
      setData({ first: "", last: "", email: "", password: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorReg]);

  useEffect(() => {
    if (errorLog) {
      setLoginForm(false);
      setWarn(
        "Something went wrong, please try again. If the problem persists, please contact us via email."
      );
      handleShowFade();
      setData({ first: "", last: "", email: "", password: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorLog]);

  useEffect(() => {
    if (dataReg && registerForm && !loadingReg) {
      setRegisterForm(false);
      if (dataReg.register_user_no_third_party.id === "-1") {
        setWarn("Email is already in use.");
        handleShowFade();
      } else {
        setWarn("Succesfully registered. Please check your email address.");
        handleShowFade();
        const timeout = setTimeout(() => {
          setChosenAction([false, true]);
          return () => clearTimeout(timeout);
        }, 2600);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataReg, registerForm, loadingReg]);

  useEffect(() => {
    if (dataLog && loginForm && !loadingLog) {
      setLoginForm(false);
      if (dataLog.login_user_no_third_party.success) {
        window.dispatchEvent(new Event("loggedIn"));
        const { uid, token, expirationDate } =
          dataLog.login_user_no_third_party;
        context.login(uid, token, new Date(parseInt(expirationDate)));
        setWarn(dataLog.login_user_no_third_party.message);
        handleShowFade();
        console.log(dataLog.login_user_no_third_party.message);
        const timeout = setTimeout(() => {
          setClickedLogin(false);
          return () => clearTimeout(timeout);
        }, 2600);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataLog, loginForm, loadingLog]);

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
                  reset={reset}
                />
                <InputForm
                  width={270}
                  height={50}
                  placeholder={"Last name"}
                  type={"text"}
                  border={[10, 10, 10, 10]}
                  setInputParent={setInput2}
                  transformAmount={-230}
                  reset={reset}
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
              reset={reset}
            />
            <InputForm
              width={270}
              height={50}
              placeholder={"Password (min. 6 characters)"}
              type={"password"}
              border={[10, 10, 10, 10]}
              setInputParent={setInput4}
              transformAmount={-230}
              reset={reset}
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
              isLoading={chosenAction[0] ? loadingReg : loadingLog}
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
