import "../../styles/components/UserInformation/UserInformation.css";
import Help from "./TypeInformation/Help";
import Orders from "./TypeInformation/Orders";
import Profile from "./TypeInformation/Profile";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiLockAlt } from "react-icons/bi";
import { VscSettings } from "react-icons/vsc";
import { RiMessage2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useContext } from "react";
import { AuthContext } from "../../Context/Auth";

function UserInformation({
  type,
  setClickedLogin,
  setDisableClosing,
}: {
  type: number;
  setClickedLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setDisableClosing: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  useEffect(() => {
    if (!context.isLoggedIn) {
      setClickedLogin(true);
      setDisableClosing(true);
    } else {
      setClickedLogin(false);
      setDisableClosing(false);
    }
  }, [context]);

  return (
    <div
      className="userInformation"
      style={{
        paddingLeft: type === 2 ? "0" : "300px",
        marginTop: type !== 2 ? "3.5em" : undefined,
      }}
    >
      {type !== 2 ? (
        <div className="userInformation__selection">
          <button
            type="button"
            className={type === 0 ? "userInformation__selection-active" : ""}
            onClick={() => navigate("/orders")}
          >
            <span>
              <AiOutlineShoppingCart />
            </span>
            <span>Orders</span>
          </button>
          <button
            type="button"
            className={type === 1 ? "userInformation__selection-active" : ""}
            onClick={() => navigate("/profile")}
          >
            <span>
              <BiLockAlt />
            </span>
            <span>Profile &amp; security</span>
          </button>
          <button type="button">
            <span>
              <VscSettings />
            </span>
            <span>Settings</span>
          </button>
          <button
            type="button"
            className={type === 2 ? "userInformation__selection-active" : ""}
            onClick={() => navigate("/help")}
          >
            <span>
              <RiMessage2Line />
            </span>
            <span>Help</span>
          </button>
        </div>
      ) : (
        ""
      )}
      <div className="userInformation__content">
        {type === 0 ? (
          <Orders />
        ) : type === 1 ? (
          <Profile />
        ) : type === 2 ? (
          <Help />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default UserInformation;