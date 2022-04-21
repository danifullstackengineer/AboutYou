import React, { useEffect, useState, useContext } from "react";
import "../../styles/components/Credentials/Credential.css";
import { IoMdClose } from "react-icons/io";
import InteractiveBtn from "../../Comp-Single/InteractiveBtn";
import { FaFacebookF } from "react-icons/fa";
import { AiFillApple } from "react-icons/ai";
import InputForm from "../../Comp-Single/InputForm";
import { Link } from "react-router-dom";
import { checkRegex } from "../../Logic/Credentials";
import { register, login } from "../../API/Credential";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/Auth";

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
  const [warn] = useState<string[]>([
    "Please enter your first name",
    "Please enter your last name",
    "Please enter your email address",
    "Please enter your password",
  ]);

  const [isLoadingLogin, setIsLoadingLogin] = useState<boolean>(false);
  const [isLoadingRegister, setIsLoadingRegister] = useState<boolean>(false);

  const handleSubmit = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    e.preventDefault();
    if (chosenAction[0]) {
      setWarning([
        !checkRegex(input1, "first"),
        !checkRegex(input2, "last"),
        !checkRegex(input3, "email"),
        !checkRegex(input4, "password"),
      ]);
      if (!warning[0] && !warning[1] && !warning[2] && !warning[3]) {
        setIsLoadingRegister(true);
        register(input1, input2, input3, input4).then((res) => {
          if (res.success) {
            login(input3, input4).then((resLogin) => {
              console.log(resLogin);
              if (resLogin.success && resLogin.userData) {
                window.dispatchEvent(new Event("loggedIn"));
                setClickedLogin(false);
                context.login(
                  resLogin.userData.uid,
                  resLogin.userData.token,
                  new Date(resLogin.userData.expirationDate)
                );
              }
            });
          }
          setIsLoadingRegister(false);
        });
      }
    } else {
      setWarning([
        warning[0],
        warning[1],
        !checkRegex(input3, "email"),
        !checkRegex(input4, "password"),
      ]);
      if (!warning[3] && !warning[4]) {
        setIsLoadingLogin(true);
        login(input3, input4).then((res) => {
          setTimeout(() => {
            if (res.success && res.userData) {
              window.dispatchEvent(new Event("loggedIn"));
              setClickedLogin(false);
              context.login(
                res.userData.uid,
                res.userData.token,
                new Date(res.userData.expirationDate)
              );
            }
            setIsLoadingLogin(false);
          }, 1000);
        });
      }
    }
  };

  useEffect(() => {
    if (warning[0] && input1) {
      setWarning([false, warning[1], warning[2], warning[3]]);
    }
    if (warning[1] && input2) {
      setWarning([warning[0], false, warning[2], warning[3]]);
    }
    if (warning[2] && input3) {
      setWarning([warning[0], warning[1], false, warning[3]]);
    }
    if (warning[3] && input4) {
      setWarning([warning[0], warning[1], warning[2], false]);
    }
  }, [input1, input2, input3, input4, warning]);

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
                  warning={warning[0]}
                  warningMsg={warn[0]}
                  setInputParent={setInput1}
                  transformAmount={-230}
                />
                <InputForm
                  width={270}
                  height={50}
                  placeholder={"Last name"}
                  type={"text"}
                  border={[10, 10, 10, 10]}
                  warning={warning[1]}
                  warningMsg={warn[1]}
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
              warning={warning[2]}
              warningMsg={warn[2]}
              setInputParent={setInput3}
              transformAmount={-230}
            />
            <InputForm
              width={270}
              height={50}
              placeholder={"Password (min. 6 characters)"}
              type={"password"}
              border={[10, 10, 10, 10]}
              warning={warning[3]}
              warningMsg={warn[3]}
              setInputParent={setInput4}
              transformAmount={-230}
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
              onClick={(e) => handleSubmit(e)}
              text={chosenAction[0] ? "Register" : "Login"}
              width={250}
              height={50}
              isLoading={chosenAction[0] ? isLoadingRegister : isLoadingLogin}
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
