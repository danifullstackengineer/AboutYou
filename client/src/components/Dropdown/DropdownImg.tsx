import React from "react";
import "../../styles/components/Dropdown/DropdownImg.css";
import placeholder from "../../assets/dropdown/placeholder.jpg";

function DropdownImg({
  itemProps,
}: {
  itemProps: {
    image: string;
    title: string;
    item: string;
    special?: boolean;
  }[];
}) {
  return (
    <div className="dropdownImg">
      {itemProps.map((item, i) => {
        return (
          <div className="dropdownImg__item" key={i}>
            <img src={item.image} alt={item.item} />
            <div
              className={`${
                item.special
                  ? "dropdownImg__item-text-special dropdownImg__item-text-upper"
                  : "dropdownImg__item-text dropdownImg__item-text-upper"
              }`}
            >
              {item.title}
            </div>
            <div
              className={`${
                item.special
                  ? "dropdownImg__item-text-special"
                  : "dropdownImg__item-text"
              }`}
            >
              {item.item}
            </div>
          </div>
        );
      })}
      <div className="dropdownImg__item dropdownImg__item-placeholder">
        <div className="dropdownImg__item-placeholder-div">
          <img
            src={placeholder}
            alt="placeholder"
            className="dropdownImg__item-img-placeholder"
          />
        </div>
        <div className="dropdownImg__item-placeholder-text">
          Discover{" "}
          <strong>all {itemProps[0].special ? "stories" : "outfits"}</strong>
        </div>
        <div
          style={{ opacity: "0" }}
          className="dropdownImg__item-text dropdownImg__item-text-title"
        >
          d
        </div>
        <div style={{ opacity: "0" }} className="dropdownImg__item-text">
          d
        </div>
      </div>
    </div>
  );
}

export default DropdownImg;
