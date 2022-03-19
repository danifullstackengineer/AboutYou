import React from "react";
import "../../styles/components/Dropdown/DropdownBrands.css";

function DropdownBrands({
  itemProps,
  imageProps,
}: {
  itemProps: {
    category: { name: string; types: { name: string; special?: boolean }[] };
  }[];
  imageProps: { name: string; images: { img: string }[] };
}) {
  return (
    <div className="dropdownBrands">
      {
        <div className="dropdownBrands__categorySpecial">
          <div className="dropdownBrands__items">
            <div className="dropdownBrands__title">
              {itemProps[0].category.name}
            </div>
            {itemProps[0].category.types.map((item, i) => {
              if (i < 10) {
                return (
                  <div
                    key={i}
                    className={
                      item.special
                        ? "dropdownBrands__items-special"
                        : "dropdownBrands__items-normal"
                    }
                  >
                    {item.name}
                  </div>
                );
              }
            })}
          </div>
          <div className="dropdownBrands__items">
            <div className="dropdownBrands__title-hidden dropdownBrands__title">
              {itemProps[0].category.name}
            </div>
            {itemProps[0].category.types.map((item, i) => {
              if (i >= 10) {
                return (
                  <div
                    key={i}
                    className={
                      item.special
                        ? "dropdownBrands__items-special"
                        : "dropdownBrands__items-normal"
                    }
                  >
                    {item.name}
                  </div>
                );
              }
            })}
          </div>
        </div>
      }
      <div className="dropdownBrands__category-container">
        {itemProps.map((item, i) => {
          if (i === 0) return;
          else {
            return (
              <div className="dropdownBrands__category" key={i}>
                <div className="dropdownBrands__items">
                  <div
                    className={`dropdownBrands__title`}
                    style={{ marginTop: `${i === 2 ? ".75em" : ""}` }}
                  >
                    {item.category.name}
                  </div>
                  {item.category.types.map((subitem, j) => {
                    return (
                      <div
                        key={j}
                        className={
                          subitem.special
                            ? "dropdownBrands__items-special"
                            : "dropdownBrands__items-normal"
                        }
                      >
                        {subitem.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }
        })}
      </div>
      <div className="dropdownBrands__categoryImage">
        <div className="dropdownBrands__itemsImage">
          <div className="dropdownBrands__image-container">
            <div className="dropdownBrands__title">{imageProps.name}</div>
            {imageProps.images.map((image, i) => {
              if (i < 5) {
                return (
                  <div className="dropdownBrands__image-containerInner">
                    <img src={image.img} key={i} />
                  </div>
                );
              }
            })}
          </div>
          {imageProps.images.length > 5 ? (
            <div className="dropdownBrands__image-container">
              <div className="dropdownBrands__title dropdownBrands__title-hidden">
                {imageProps.name}
              </div>
              {imageProps.images.map((image, i) => {
                if (i >= 5) {
                  return (
                    <div className="dropdownBrands__image-containerInner">
                      <img src={image.img} key={i} />
                    </div>
                  );
                }
              })}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default DropdownBrands;
