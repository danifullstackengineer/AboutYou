import React from "react";
import { Link } from "react-router-dom";
import "../../styles/components/CustomerCare/CustomerOption.css";

const CustomerOption = ({
  text,
  notfound_404,
}: {
  text: { title: string; description: string | string[] }[];
  notfound_404?: boolean;
}) => {
  return (
    <div className="customerOption">
      {text.map((text, i) => {
        return (
          <div className={"customerOption__option"} key={i}>
            <h3>{text.title}</h3>
            {typeof text.description === "string" ? (
              <h5>{text.description}</h5>
            ) : (
              <>
                {text.description.map((desc, i) => {
                  return <h5 key={i}>{desc}</h5>;
                })}
              </>
            )}
          </div>
        );
      })}
      {notfound_404 ? (
        <Link to="/">
          Click here to return to the main page or select one of the 3 options
          to the left.
        </Link>
      ) : (
        ""
      )}
    </div>
  );
};

export default React.memo(CustomerOption);
