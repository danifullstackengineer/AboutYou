import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Comp-Single/AboutYouLogo.css";
import { useLazyQuery } from "@apollo/client";
import { getUserFirstName } from "../Apollo/User";
import { getIdStorage } from "../Logic/localStorage/user";

function AboutYouLogo() {
  const navigate = useNavigate();

  const [idVariable, setIdVariable] = useState<string>();

  const [getFirstName, {loading}] = useLazyQuery(getUserFirstName, {
    variables: {
      id: idVariable ? idVariable : "",
    },
  });
  const [name, setName] = useState<string | undefined>();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("loggedIn", () => {
      setIsLoggedIn(true);
    });
    window.addEventListener("loggedOut", () => {
      setIsLoggedIn(false);
    });
    return () => {
      window.removeEventListener("loggedIn", () => {});
      window.removeEventListener("loggedOut", () => {});
    };
  }, []);

  useEffect(() => {
    const id = getIdStorage();
    if (id) {
      setIdVariable(id);
    } else {
      setName(undefined);
      setIdVariable(undefined)
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (idVariable) {
      getFirstName().then((res) => {
        setName(res.data.getUserInfo.first);
      })
    }
  }, [idVariable, getFirstName]);

  return (
    <div className="aboutYouLogo" onClick={() => navigate("/")}>
      <span className="aboutYouLogo__about">ABOUT</span>
      <div
        className={`aboutYouLogo__you ${
          loading ? "aboutYouLogo__you-opacity" : ""
        }`}
      >
        <span
          className="aboutYouLogo__you-text"
          style={{ textTransform: "uppercase" }}
        >
          {name ? name : "YOU"}
        </span>
        <img src={"/assets/svg/mainLogo.svg"} alt={"/assets/svg/mainLogo.svg"}></img>
      </div>
    </div>
  );
}

export default AboutYouLogo;
