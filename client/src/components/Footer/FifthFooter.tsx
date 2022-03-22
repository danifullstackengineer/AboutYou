import React from "react";
import AboutYouLogo from "../../Comp-Single/AboutYouLogo";
import "../../styles/components/Footer/FifthFooter.css";
import { GrContact } from "react-icons/gr";
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";
import { BsPinterest } from "react-icons/bs";
import { FaTiktok } from "react-icons/fa";
import { FaExpeditedssl } from "react-icons/fa";

function FifthFooter() {
  return (
    <div className="fifthFooter">
      <footer>
        <section>
          <div>
            <AboutYouLogo />
          </div>
          <div className="fifthFooter__section1-contact">
            <GrContact />
            <span>Contact us</span>
          </div>
          <div className="fifthFooter__section1-social">
            <span>
              <BsFacebook />
            </span>
            <span>
              <BsInstagram />
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
        </section>
        <section>
          <h3>CUSTOMER CARE</h3>
          <ul>
            <li>Contact</li>
            <li>Help</li>
            <li>Partner program</li>
            <li>Delivery area</li>
          </ul>
        </section>
        <section>
          <h3>SECURE SHOPPING</h3>
          <ul>
            <li>
              <FaExpeditedssl /> Your data is secure with us
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

export default FifthFooter;
