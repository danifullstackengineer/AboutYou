import React, { useEffect, useState } from "react";
import "../styles/Comp-Single/LeftSelection.css";

function LeftSelection({
  setSelected,
  selected
}: {
    setSelected: React.Dispatch<React.SetStateAction<string[]>>;
    selected: string[];
}) {
  
  useEffect(() => {
    switch (selected?.length) {
      case 1:
        setActiveParent(undefined);
        setActiveChild(undefined);
        setActiveChildChild(undefined);
        break;
      case 2:
        setActiveChild(undefined);
        setActiveChildChild(undefined);
        break;
      case 3:
        setActiveChildChild(undefined);
    }
  }, [selected])

  const parentOptions = [
    { title: "Clothing", active: false },
    { title: "Shoes", active: false },
    { title: "Sportswear", active: false },
    { title: "Accessories", active: false },
    { title: "SALE", active: false },
    { title: "Premium", active: false },
  ];
  const childOptions = [
    [
      { title: "New", active: false },
      { title: "Jackets", active: false },
    ],
    [
      { title: "New", active: false },
      { title: "Ankle boots", active: false },
    ],
    [
      { title: "Sports", active: false },
      { title: "Sportswear", active: false },
    ],
    [
      { title: "New", active: false },
      { title: "Jewerly", active: false },
    ],
    [],
    [
      { title: "Jackets", active: false },
      { title: "Coats", active: false },
    ],
  ];
  const childChildOptions = [
    [
      [
        { title: "Jackets & coats", active: false },
        { title: "Dresses & skirts", active: false },
        { title: "Sweaters & cardigans", active: false },
      ],
      [
        { title: "Winter jackets", active: false },
        { title: "Vests", active: false },
        { title: "Leather jackets", active: false },
      ],
    ],
    [
      [
        { title: "Boots & ankle boots", active: false },
        { title: "Sneakers & athletic shoes", active: false },
        { title: "High heels", active: false },
      ],
      [
        { title: "Chelsea boots", active: false },
        { title: "Lace-up ankle boots", active: false },
        { title: "Classic ankle boots", active: false },
      ],
    ],
    [
      [
        { title: "Ski", active: false },
        { title: "Outdoor", active: false },
        { title: "Fitness", active: false },
      ],
      [
        { title: "Sports bottoms & leggins", active: false },
        { title: "Sports tops", active: false },
        { title: "Sports underwear", active: false },
      ],
    ],
    [
      [
        { title: "Bags & backpacks", active: false },
        { title: "Jewelry", active: false },
        { title: "Hats & caps", active: false },
      ],
      [
        { title: "Necklaces", active: false },
        { title: "Earrings", active: false },
        { title: "Bracelets", active: false },
      ],
    ],
    [[]],
    [
      [
        { title: "Winter jackets", active: false },
        { title: "Vests", active: false },
        { title: "Leather jackets", active: false },
      ],
      [
        { title: "Winter coats", active: false },
        { title: "Wool coats", active: false },
        { title: "Between-seasons coats", active: false },
      ],
    ],
  ];

  const [activeParent, setActiveParent] = useState<number>();
  const [activeChild, setActiveChild] = useState<number[]>();
  const [activeChildChild, setActiveChildChild] = useState<number[]>();

  const handleParentClick = (par: number): void => {
    setActiveParent(par);
    setActiveChild(undefined);
    setActiveChildChild(undefined);
    setSelected(["Women", parentOptions[par].title]);
  };
  const handleChildClick = (par: number, child: number): void => {
    setActiveChild([par, child]);
    setActiveChildChild(undefined);
    setSelected([
      "Women",
      parentOptions[par].title,
      childOptions[par][child].title,
    ]);
  };
  const handleChildChildClick = (
    par: number,
    child: number,
    childchild: number
  ): void => {
    setActiveChildChild([par, child, childchild]);
    setSelected([
      "Women",
      parentOptions[par].title,
      childOptions[par][child].title,
      childChildOptions[par][child][childchild].title,
    ]);
  };

  return (
    <div className="leftSelection">
      {parentOptions.map((option, i) => {
        return (
          <div
            className={`leftSelection__option ${
              activeParent === i ? "leftSelection__option-active" : ""
            } ${
              activeChild || activeChildChild
                ? "leftSelection__option-no-before"
                : ""
            }`}
            key={i}
          >
            <h1 onClick={() => handleParentClick(i)}>{option.title}</h1>
            {childOptions[i].map((suboption, j) => {
              return (
                <div
                  className={`leftSelection__suboption ${
                    (
                      activeChild
                        ? activeChild[1] === j && activeChild[0] === i
                        : undefined
                    )
                      ? "leftSelection__suboption-active"
                      : ""
                  } ${
                    activeChildChild ? "leftSelection__suboption-no-before" : ""
                  }`}
                  key={j}
                >
                  <h3 onClick={() => handleChildClick(i, j)}>
                    {suboption.title}
                  </h3>
                  {childChildOptions[i][j].map((subsuboption, z) => {
                    return (
                      <div
                        className={`leftSelection__subsuboption ${
                          (
                            activeChildChild
                              ? activeChildChild[0] === i &&
                                activeChildChild[1] === j &&
                                activeChildChild[2] === z
                              : undefined
                          )
                            ? "leftSelection__subsuboption-active"
                            : ""
                        }`}
                        key={z}
                      >
                        <h5 onClick={() => handleChildChildClick(i, j, z)}>
                          {subsuboption.title}
                        </h5>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default LeftSelection;
