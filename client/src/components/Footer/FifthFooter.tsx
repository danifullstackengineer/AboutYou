import "../../styles/components/Footer/FifthFooter.css";
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";
import { BsPinterest } from "react-icons/bs";
import { FaTiktok } from "react-icons/fa";
import { useState } from "react";
import NBLogo from "../../Comp-Single/NBLogo";
import React from "react";
import { useNavigate } from "react-router-dom";

function FifthFooter({ chosenMode }: { chosenMode?: boolean | undefined }) {
  const [isIgHovered, setIsIgHovered] = useState<boolean>(false);

  const navigate = useNavigate();

  return (
    <div
      className={`fifthFooter ${
        chosenMode === false ? "fifthFooter-dark" : "fifthFooter-light"
      }`}
    >
      <footer>
        <section>
          <div>
            <div>
              <NBLogo chosenMode={chosenMode} size={150} />
            </div>
            <div className="fifthFooter__section1-social">
              <span>
                <BsFacebook />
              </span>
              <span
                onMouseOver={() => setIsIgHovered(true)}
                onMouseLeave={() => setIsIgHovered(false)}
              >
                {!isIgHovered ? (
                  <BsInstagram />
                ) : (
                  <img src={"/assets/logo/ig.webp"} alt="" />
                )}
              </span>
              <span>
                <BsTwitter />
              </span>
              <span>
                <BsYoutube />
              </span>
              <span>
                <BsPinterest />
              </span>
              <span>
                <FaTiktok />
              </span>
            </div>
          </div>
        </section>
        <section>
          <h3>CUSTOMER CARE</h3>
          <ul>
            <li>Contact</li>
            <li onClick={() => navigate("/help")}>Help</li>
            <li>Partner program</li>
            <li>Delivery area</li>
          </ul>
        </section>
        <section>
          <h3>SECURE SHOPPING</h3>
          <ul>
            <li>
              <img src={"/assets/png/ssl.png"} alt={""} loading={"lazy"} />
              Your data is secure with us
            </li>
          </ul>
        </section>
      </footer>
      <span>
        5) This sales promotion runs until 30/04/2022 (11:59pm CET). Further
        promotional conditions under
        https://www.aboutyou.com/campaign-conditions
      </span>
    </div>
  );
}

export default React.memo(FifthFooter);
