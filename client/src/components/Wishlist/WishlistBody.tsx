import React, { useState } from "react";
import "../../styles/components/Wishlist/WishlistBody.css";
import { GiMailShirt } from "react-icons/gi";
import { RiArrowUpDownFill } from "react-icons/ri";

function WishlistBody({
  selected,
  setSelected,
}: {
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const handleSelection = (i: number) => {
    setSelected(selected?.filter((option, z) => (z <= i ? option : undefined)));
  };

  const [activeDropdown] = useState<
    [
      { type: { option: string; active: boolean }[] },
      { type: { option: string; active: boolean }[] }
    ]
  >([
    {
      type: [
        { option: "Item view", active: true },
        { option: "View model", active: false },
      ],
    },
    {
      type: [
        { option: "Your style", active: true },
        { option: "Highest price", active: false },
        { option: "Lowest price", active: false },
        { option: "New arrivals", active: false },
        { option: "Maximum reduction", active: false },
      ],
    },
  ]);

  return (
    <div className="wishlistBody">
      <h5>
        {selected?.map((option, i) => {
          return (
            <div key={i} className="wishlistBody__descriptive">
              {i === selected.length - 1 ? (
                <span onClick={() => handleSelection(i)}>{option}</span>
              ) : (
                <>
                  <span onClick={() => handleSelection(i)}>{option}</span>
                  &nbsp;&gt;&nbsp;
                </>
              )}
            </div>
          );
        })}
      </h5>
      <div className="wishlistBody__selection">
        <div className="wishlistBody__selection-left">
          <h2>{selected ? selected[selected.length - 1] : "Women"}</h2>
          <span>3,023</span>
        </div>
        <div className="wishlistBody__selection-right">
          <button className={``}>
            <span>
              <GiMailShirt />
            </span>
            <span>View</span>
          </button>
          <div className="wishlistBody__selection-right-dropdown">
            {activeDropdown[0].type.map((item, i) => {
              return (
                <span
                  key={i}
                  className={
                    item.active
                      ? "wishlistBody__selection-right-dropdown-active"
                      : ""
                  }
                >
                  {item.option}
                </span>
              );
            })}
          </div>
          <button className={``}>
            <span>
              <RiArrowUpDownFill />
            </span>
            <span>Sort</span>
          </button>
          <div className="wishlistBody__selection-right-dropdown"></div>
        </div>
      </div>
    </div>
  );
}

export default WishlistBody;
