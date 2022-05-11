import { useQuery } from "@apollo/client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { getAccessoriesBasedOnParent } from "../Apollo/Accessory";
import "../styles/Comp-Single/Product360.css";
import { AccessoryType } from "../types/Accessory";
import { ProductType } from "../types/Product";
import InteractiveBtn from "./InteractiveBtn";
import { BasketContext } from "../Context/Basket";

function Product360({
  product,
  clickedMenu,
  setClickedMenu,
  setClickedBasket,
  clickedBasket,
  handleOpening,
}: {
  product: ProductType;
  clickedMenu: boolean;
  setClickedBasket: React.Dispatch<React.SetStateAction<boolean>>;
  setClickedMenu: React.Dispatch<React.SetStateAction<boolean>>;
  clickedBasket: boolean;
  handleOpening: (type: "user" | "wishlist" | "basket" | "language") => void;
}) {
  const bContext = useContext(BasketContext);

  const { loading, error, data } = useQuery(getAccessoriesBasedOnParent, {
    variables: {
      parentId: product.id,
    },
  });

  const [addedAccessory, setAddedAccessory] = useState<boolean[]>();
  const [hasSelectedAccessory, setHasSelectedAccessory] =
    useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<boolean[]>(
    product.sizes.map(() => false)
  );
  const [hasSelectedSize, setHasSelectedSize] = useState<boolean>(false);
  const [sizeIdx, setSizeIdx] = useState<number>();
  const [selectedColor, setSelectedColor] = useState<boolean[]>(
    product.colors.map(() => false)
  );
  const [hasSelectedColor, setHasSelectedColor] = useState<boolean>(false);
  const [colorIdx, setColorIdx] = useState<number>();
  const [accIndex, setAccIndex] = useState<number>();

  const mainRef = useRef<HTMLDivElement>(null);

  //todo: handle error
  useEffect(() => {}, [error]);

  useEffect(() => {
    if (data) {
      var arrAcc: boolean[] = [];
      data.getAccessoriesBasedOnParent.map(
        (accessory: AccessoryType, i: number) => {
          arrAcc.push(false);
        }
      );
      setAddedAccessory(arrAcc);
    }
  }, [data]);

  const handleAddAccessory = (index: number) => {
    setAddedAccessory((prevState) =>
      prevState?.map((truth, i) => {
        if (i === index) {
          if (truth) {
            setAccIndex(undefined);
          } else {
            setAccIndex(i);
          }
          setHasSelectedAccessory(!truth);
          return !truth;
        } else {
          return false;
        }
      })
    );
    setAccIndex(index);
  };

  const handleAddSize = (index: number) => {
    setSelectedSize((prevState) =>
      prevState.map((color, i) => {
        if (i === index) {
          setHasSelectedColor(!color);
          return !color;
        }
        return false;
      })
    );
    setSizeIdx(index);
  };
  const handleAddColor = (index: number) => {
    setSelectedColor((prevState) =>
      prevState.map((size, i) => {
        if (i === index) {
          setHasSelectedSize(!size);
          return !size;
        }
        return false;
      })
    );
    setColorIdx(index);
  };

  const getTotalAfterAccessory = (): number => {
    if (addedAccessory && accIndex !== undefined && data) {
      return (
        data.getAccessoriesBasedOnParent[accIndex].price + product.price
      ).toFixed(2);
    } else return product.price;
  };

  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setTotal(getTotalAfterAccessory());
  }, [accIndex]);

  const [file, setFile] = useState<any>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const warn = "Please use a valid image file.";
    if (!e.target.files || e.target.files.length === 0) {
      alert(warn);
    } else {
      if (e.target.files.length > 1) {
        alert("Please only upload one file.");
      } else {
        const regex = /image\/([a-zA-Z\d\-\.]{1,})/i;
        if (!regex.test(e.target.files[0].type)) {
          alert(warn);
        } else {
          setFile(e.target.files[0]);
        }
      }
    }
  };

  const [clicked, setClicked] = useState<boolean>(false);

  const [hasSelectedOptions, setHasSelectedOptions] = useState<boolean>(false);

  useEffect(() => {
    if (hasSelectedColor && hasSelectedSize) {
      setHasSelectedOptions(true);
    } else {
      setHasSelectedOptions(false);
    }
  }, [hasSelectedColor, hasSelectedSize]);

  const handleAddToBasket = (): void => {
    if (sizeIdx && colorIdx) {
      bContext.addToBasket({
        ...product,
        selectedSize: product.sizes[sizeIdx],
        selectedColor: product.colors[colorIdx],
        selectedAccessory: accIndex
          ? data.getAccessoriesBasedOnParent[accIndex]
          : undefined,
        customStyle: file,
      });
    }
    if (!clickedMenu) {
      setClickedMenu(true);
      setTimeout(() => {
        setClickedBasket(true);
      }, 150);
    } else {
      console.log("true clicked menu!");
      if (!clickedBasket) {
        handleOpening("basket");
      }
    }
  };

  const handleRemoveFromBasket = ():void => {

  }

  useEffect(()=>{
    console.log("menu is changing..." , clickedMenu);
  }, [clickedMenu])

  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (clicked) {
      document.dispatchEvent(
        new CustomEvent("clicked360", { detail: product.backgroundImg })
      );
    }
  }, [clicked]);

  return (
    <div className="product360" ref={mainRef}>
      <div
        className={`product360__left ${
          clicked ? "product360__left-360" : "product360__left-360-inactive"
        }`}
        onClick={() => setClicked(true)}
        ref={imageContainerRef}
      >
        {!clicked ? (
          <img
            src={product.backgroundImg + "1.jpg"}
            alt={""}
            loading={"lazy"}
          />
        ) : (
          ""
        )}
        {!clicked ? (
          <img
            src={product.foregroundImg + "10.jpg"}
            alt={""}
            loading={"lazy"}
          />
        ) : (
          ""
        )}
        {clicked ? (
          <div id="product360__threesixty">
            <div id="product360__spinner">
              <span>0%</span>
            </div>
            <ol id="product360__threesixty_images"></ol>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="product360__right" onClick={() => setClicked(false)}>
        <div className="product360__right-top">
          <div className="product360__right-sizes">
            <span>Available Sizes</span>
            <ul>
              {product.sizes.map((size, i) => {
                return (
                  <li
                    key={i}
                    onClick={() => handleAddSize(i)}
                    className={
                      selectedSize[i] ? "product360__right-sizes-selected" : ""
                    }
                  >
                    {size}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="product360__right-colors">
            <span>Available Colors</span>
            <ul>
              {product.colors.map((color, i) => {
                return (
                  <li
                    key={i}
                    className={
                      selectedColor[i]
                        ? "product360__right-colors-selected"
                        : ""
                    }
                    onClick={() => handleAddColor(i)}
                  >
                    {color}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="product360__right-custom">
            {data ? (
              <>
                <span>Add extra Accessories</span>
                <ul>
                  {data.getAccessoriesBasedOnParent.map(
                    (accessory: AccessoryType, i: number) => {
                      return (
                        <li
                          key={i}
                          onClick={() => handleAddAccessory(i)}
                          className={
                            addedAccessory
                              ? addedAccessory[i]
                                ? "product360__right-custom-active"
                                : ""
                              : ""
                          }
                        >
                          <img
                            src={accessory.image}
                            alt={""}
                            loading={"lazy"}
                          />
                          <div className="product360__right-custom-info">
                            <span>{accessory.title}</span>
                            <span>${accessory.price}</span>
                          </div>
                          <div
                            className={`product360__right-custom-checker ${
                              addedAccessory
                                ? addedAccessory[i]
                                  ? "product360__right-custom-checker-active"
                                  : ""
                                : ""
                            }`}
                          ></div>
                        </li>
                      );
                    }
                  )}
                </ul>
              </>
            ) : (
              ""
            )}
          </div>
          <div className="product360__right-price">
            <span>Total:</span> <span>${total}</span>
          </div>
        </div>
        <div
          className={`product360__right-bottom ${
            accIndex !== undefined ? "product360__right-bottom-disabled" : ""
          }`}
        >
          <span>Your custom style</span>
          <div className="product360__right-bottom-info">
            {file && accIndex === undefined ? (
              <img
                src={URL.createObjectURL(file)}
                alt={"Retry"}
                loading="eager"
              />
            ) : (
              ""
            )}
            <div
              className={`product360__right-bottom-upload ${
                file && accIndex === undefined
                  ? "product360__right-bottom-upload-uploaded"
                  : ""
              }`}
            >
              <label htmlFor="upload-photo">
                {accIndex !== undefined ? "Not available." : "Upload"}
              </label>
              <input
                type="file"
                name="photo"
                multiple={false}
                accept="image/*"
                id="upload-photo"
                onChange={(e) => handleFileChange(e)}
                disabled={accIndex !== undefined ? true : false}
              />
              {file && accIndex === undefined ? (
                <button type="button" onClick={() => setFile(undefined)}>
                  Remove
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        {hasSelectedOptions ? (
          <div
            className={`product360__right-basket`}
            onClick={handleAddToBasket}
          >
            <InteractiveBtn
              text={"Add to Basket"}
              width={100}
              height={50}
              type={undefined}
              percWidth={true}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      {!clicked ? (
        <img src={"/assets/cursor/360-icon.svg"} alt={""} loading={"lazy"} />
      ) : (
        ""
      )}
    </div>
  );
}

export default React.memo(Product360);
