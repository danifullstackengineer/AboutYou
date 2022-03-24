import React, { useEffect, useRef, useState } from "react";
import "../../styles/components/Dropdown/DropdownImg.css";

function DropdownImg({
  itemProps,
}: {
  itemProps: {
    image: string;
    title: string;
    item: string;
    special?: boolean;
    placeholder?: boolean;
  }[];
}) {
  const imageRef = useRef<HTMLImageElement>(null);

  return (
    <div className="dropdownImg">
      {itemProps.map((item, i) => {
        return (
          <div className="dropdownImg__item" key={i}>
            <img
              ref={imageRef}
              className={
                item.placeholder ? "dropdownImg__item-special-img" : ""
              }
              src={item.image}
              alt={item.item}
            />
            {item.placeholder ? (
              <div className="dropdownImg__item-placeholder">
                Discover{" "}
                <strong>all {item.special ? "outfits" : "stories"}</strong>
              </div>
            ) : (
              ""
            )}
            <div
              style={{ opacity: item.placeholder ? "0" : "1" }}
              className={`${
                item.special
                  ? "dropdownImg__item-text-special dropdownImg__item-text-upper"
                  : "dropdownImg__item-text dropdownImg__item-text-upper"
              }`}
            >
              {item.title}
            </div>
            <div
              style={{ opacity: item.placeholder ? "0" : "1" }}
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
    </div>
  );
}

export default DropdownImg;
