import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CustomerOption from "./CustomerOption";
import "../../styles/components/CustomerCare/CustomerCare.css";
import InteractiveBtn from "../../Comp-Single/InteractiveBtn";

const CustomerCare = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  const renderJSX = (): JSX.Element | undefined => {
    switch (type) {
      case "contact":
        return (
          <CustomerOption
            text={[
              {
                title: "Phone Number",
                description: "+40770515023 - Available 09:00-16:00 UTC+3",
              },
              {
                title: "Email Address",
                description:
                  "danifullstack@gmail.com - Available 09:00-16:00 UTC+3",
              },
              {
                title: "Our Address",
                description: [
                  "USA 32571 Mills Islands",
                  "Pennsylvania Greenholtview 76077-9210",
                ],
              },
            ]}
          />
        );
      case "partner-program":
        return <CustomerOption text={[{ title: "", description: "" }]} />;
      case "delivery-area":
        return <CustomerOption text={[{ title: "", description: "" }]} />;
      case "ssl":
        return (
          <CustomerOption
            text={[
              {
                title: "SSL",
                description: [
                  "We care about our customer's security when they shop online, and to ensure that this is the case, we are using TLS version 1.3 to protect our website against malicious attackers.",
                ],
              },
            ]}
          />
        );
    }
  };

  return (
    <div className="customerCare">
      <div className="customerCare__btns">
        <InteractiveBtn
          text={"Contact"}
          width={100}
          height={50}
          percWidth={true}
          bgColor={type === "contact" ? "black" : "rgb(100,100,100)"}
          type="button"
          hoverBgColor={"black"}
          onClick={() => navigate("/customer-care/contact")}
        />
        <InteractiveBtn
          text={"Partner Program"}
          width={100}
          height={50}
          percWidth={true}
          bgColor={type === "partner-program" ? "black" : "rgb(100,100,100)"}
          type="button"
          hoverBgColor={"black"}
          onClick={() => navigate("/customer-care/partner-program")}
        />
        <InteractiveBtn
          text={"Delivery Area"}
          width={100}
          height={50}
          percWidth={true}
          bgColor={type === "delivery-area" ? "black" : "rgb(100,100,100)"}
          hoverBgColor={"black"}
          type="button"
          onClick={() => navigate("/customer-care/delivery-area")}
        />
        <InteractiveBtn
          text={"SSL"}
          width={100}
          height={50}
          percWidth={true}
          bgColor={type === "ssl" ? "black" : "rgb(100,100,100)"}
          hoverBgColor={"black"}
          type="button"
          onClick={() => navigate("/customer-care/ssl")}
        />
      </div>
      <div className="customerCare__content">{renderJSX()}</div>
    </div>
  );
};

export default React.memo(CustomerCare);
