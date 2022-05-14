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
      default:
        return (
          <CustomerOption
            notfound_404={true}
            text={[
              {
                title: "Link not found.",
                description: "",
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
      </div>
      <div className="customerCare__content">{renderJSX()}</div>
    </div>
  );
};

export default React.memo(CustomerCare);
