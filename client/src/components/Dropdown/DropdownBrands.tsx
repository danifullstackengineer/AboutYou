import "../../styles/components/Dropdown/DropdownBrands.css";

function DropdownBrands({
  itemProps,
  imageProps,
  maxImg,
  largeImg,
  brandButton,
  hasSpecial,
  slider
}: {
  itemProps: {
    category: {
      special?: boolean;
      name: string;
      types: {
        name: string;
        special?: boolean;
        underlined?: boolean;
        specialMargin?: boolean;
      }[];
    };
  }[];
  imageProps?: { name: string; images: { img: string }[] };
  maxImg?: number;
  largeImg?: string;
  brandButton?: boolean;
    hasSpecial?: boolean;
  slider?:boolean
  }) {
  

  const returnDropdown = (): JSX.Element => {
    const myArr = itemProps.map((item, i) => {
      if (item.category.special) return <></>
      else {
        return (
          <div className="dropdownBrands__category" key={i}>
            <div className="dropdownBrands__items">
              <div
                className={`dropdownBrands__title`}
              >
                {item.category.name}
              </div>
              {item.category.types.map((subitem, j) => {
                return (
                  <div
                    key={j}
                    className={`${subitem.special
                        ? "dropdownBrands__items-special"
                        : subitem.underlined
                          ? "dropdownBrands__items-underlined"
                          : "dropdownBrands__items-normal"
                      } ${subitem.specialMargin
                        ? "dropdownBrands__items-special-margin"
                        : ""
                      }`}
                  >
                    <span>{subitem.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }
    })
    return <>{myArr}</>
  }
  
  return (
    <>
      <div className="dropdownBrands">
        {itemProps.map((item, i) => {
          if (item.category.special) {
            return (
              <div key={i} className="dropdownBrands__categorySpecial">
                <div className="dropdownBrands__items">
                  {itemProps[i].category.name ? (
                    <div className="dropdownBrands__title">
                      {itemProps[i].category.name}
                    </div>
                  ) : (
                    ""
                  )}
                  {itemProps[i].category.types.map((item, i) => {
                    if (i < 10) {
                      return (
                        <div
                          key={i}
                          className={`${
                            item.special
                              ? "dropdownBrands__items-special"
                              : item.underlined
                              ? "dropdownBrands__items-underlined"
                              : "dropdownBrands__items-normal"
                          } ${
                            item.specialMargin
                              ? "dropdownBrands__items-special-margin"
                              : ""
                          }`}
                        >
                          <span>{item.name}</span>
                        </div>
                      );
                    }
                    else return <></>
                  })}
                </div>
                {itemProps[i].category.types.length > 10 ? (
                  <div className="dropdownBrands__items">
                    {itemProps[i].category.name ? (
                      <div className="dropdownBrands__title-hidden dropdownBrands__title">
                        {itemProps[i].category.name}
                      </div>
                    ) : (
                      ""
                    )}
                    {itemProps[i].category.types.map((item, i) => {
                      if (i >= 10) {
                        return (
                          <div
                            key={i}
                            className={`${
                              item.special
                                ? "dropdownBrands__items-special"
                                : item.underlined
                                ? "dropdownBrands__items-underlined"
                                : "dropdownBrands__items-normal"
                            } ${
                              item.specialMargin
                                ? "dropdownBrands__items-special-margin"
                                : ""
                            }`}
                          >
                            <span>{item.name}</span>
                          </div>
                        );
                      }
                      else return <></>
                    })}
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
          }
          else return <></>
        })}
        {hasSpecial ? (
          <div className="dropdownBrands__category-container">
            {returnDropdown()}
            </div>
        ) : (
          ""
        )}

        {imageProps ? (
          <div className="dropdownBrands__categoryImage">
            <div className="dropdownBrands__itemsImage">
              <div className="dropdownBrands__image-container">
                <div className="dropdownBrands__title">{imageProps.name}</div>
                {imageProps.images.map((image, i) => {
                  if (maxImg ? i < maxImg : "") {
                    return (
                      <div
                        key={i}
                        className="dropdownBrands__image-containerInner"
                      >
                        <img src={image.img} alt={image.img}/>
                      </div>
                    );
                  }
                  else return <></>
                })}
              </div>
              {imageProps.images.length > 5 ? (
                <div className="dropdownBrands__image-container">
                  <div className="dropdownBrands__title dropdownBrands__title-hidden">
                    {imageProps.name}
                  </div>
                  {imageProps.images.map((image, i) => {
                    if (maxImg ? i >= maxImg : "") {
                      return (
                        <div
                          key={i}
                          className="dropdownBrands__image-containerInner"
                        >
                          <img src={image.img} alt={image.img}/>
                        </div>
                      );
                    }
                    else return <></>
                  })}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          ""
        )}
        {largeImg ? (
          <div className="dropdownBrands__categoryLarge">
            <img src={largeImg} alt="" />
          </div>
        ) : (
          ""
        )}
      </div>
      {brandButton ? (
        <div className="dropdownBrands__button">
          <button>Search by brand</button>
        </div>
      ) : (
        ""
      )}
      {slider ? <div className="dropdownBrands__slider">
        
      </div> : ""}
    </>
  );
}

export default DropdownBrands;
