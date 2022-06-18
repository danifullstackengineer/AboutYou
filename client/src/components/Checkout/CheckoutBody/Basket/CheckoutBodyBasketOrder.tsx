import { Link } from "react-router-dom";
import "../../../../styles/components/Checkout/CheckoutBody/Basket/CheckoutBodyBasketOrder.css";
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import React, { useContext, useEffect, useRef, useState } from "react";
import { BasketContext, ExtendedProductType } from "../../../../Context/Basket";
import { updateProductStorage } from "../../../../Logic/localStorage/basket";
import { AccessoryTypeBasket } from "../../../../types/Accessory";
import { ProductTypeBasket } from "../../../../types/Product";

function CheckoutBodyBasketOrder({
  payment,
  setBasket,
  setHasAllFieldsReady,
}: {
  payment?: boolean;
  setBasket?: React.Dispatch<
    React.SetStateAction<ProductTypeBasket[] | AccessoryTypeBasket[]>
  >;
  setHasAllFieldsReady?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [changedAmount, setChangedAmount] = useState<boolean[]>();

  const bContext = useContext(BasketContext);

  const [clickedEdit, setClickedEdit] = useState<boolean[]>();

  const [sizeSelect, setSizeSelect] = useState<(string | undefined)[]>([]);
  const [colorSelect, setColorSelect] = useState<(string | undefined)[]>([]);

  useEffect(() => {
    if (bContext.product) {
      const arr: false[] = [];
      const size_and_color_arr: undefined[] = [];
      bContext.product.forEach((_) => {
        arr.push(false);
        size_and_color_arr.push(undefined);
      });
      setClickedEdit(arr);
      setSizeSelect(size_and_color_arr);
      setColorSelect(size_and_color_arr);
    }
  }, [bContext.product]);

  const handleEdit = (index: number, _id: string): void => {
    if (clickedEdit) {
      if (clickedEdit[index] && setBasket) {
        const selectedSize = sizeSelect[index];
        const selectedColor = colorSelect[index];

        const updateObj = {
          selectedColor:
            selectedColor !== undefined
              ? selectedColor
              : bContext.product[index].selectedColor,
          selectedSize:
            selectedSize !== undefined
              ? parseInt(selectedSize)
              : bContext.product[index].selectedSize,
        };
        updateProductStorage(_id, bContext.product, setBasket, updateObj);
      } else {
        // Clicked on edit
      }
      setClickedEdit([
        ...clickedEdit.map((edit, i) => (i === index ? !edit : edit)),
      ]);
    }
  };

  useEffect(() => {
    if (setHasAllFieldsReady) {
      var hasAllFieldsReady = true;
      bContext.product.forEach((product) => {
        if (product.sizes && product.colors) {
          if (!product.selectedColor || !product.selectedSize) {
            hasAllFieldsReady = false;
          }
        }
      });

      setHasAllFieldsReady(hasAllFieldsReady);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bContext.product]);

  return (
    <div
      className={`checkoutBodyBasketOrder ${
        payment ? "checkoutBodyBasketOrder-payment" : ""
      }`}
    >
      {!payment ? <h2>Your order</h2> : ""}
      {bContext.product.length === 0 ? (
        <div className={"checkoutBodyBasketOrder-empty"}>
          <h3>Your basket is empty!</h3>
          <Link to="/">Continue shopping</Link>
        </div>
      ) : (
        bContext.product?.map((item, i) => {
          return (
            <div
              key={i}
              className={`checkoutBodyBasketOrder__item ${
                changedAmount
                  ? changedAmount[i]
                    ? "checkoutBodyBasketOrder__item-loading"
                    : ""
                  : ""
              }`}
            >
              <img
                src={
                  item.dark ? item.backgroundImg : item.backgroundImg + "1.jpg"
                }
                alt={""}
                loading={"lazy"}
              />
              <div className="checkoutBodyBasketOrder__info">
                <div className="checkoutBodyBasketOrder__info-upper">
                  <div className="checkoutBodyBasketOrder__info-upper-left">
                    <h5>{item.title}</h5>

                    {!payment ? (
                      item.colors ? (
                        <>
                          <label htmlFor="color" hidden={true}></label>
                          <select
                            onChange={(e) =>
                              setColorSelect([
                                ...colorSelect.map((productColor, z) =>
                                  z === i ? e.target.value : productColor
                                ),
                              ])
                            }
                            name="color"
                            disabled={clickedEdit ? !clickedEdit[i] : true}
                            defaultValue={
                              item.selectedColor
                                ? item.selectedColor
                                : "Please select a color."
                            }
                          >
                            <option
                              value={"Please select a color."}
                              disabled={true}
                            >
                              Please select a color.
                            </option>
                            {item.colors
                              ? item.colors.map((color, p) => {
                                  return (
                                    <option key={p} value={color}>
                                      {color}
                                    </option>
                                  );
                                })
                              : ""}
                          </select>
                        </>
                      ) : (
                        ""
                      )
                    ) : (
                      <span>Color: {item.selectedColor}</span>
                    )}
                    {!payment ? (
                      item.sizes ? (
                        <>
                          <label htmlFor="size" hidden={true}>
                            Size:
                          </label>

                          <select
                            onChange={(e) =>
                              setSizeSelect([
                                ...sizeSelect.map((productSize, z) =>
                                  z === i ? e.target.value : productSize
                                ),
                              ])
                            }
                            name="size"
                            disabled={clickedEdit ? !clickedEdit[i] : true}
                            defaultValue={
                              item.selectedSize
                                ? item.selectedSize
                                : "Please select a size."
                            }
                          >
                            <option
                              value={"Please select a size."}
                              disabled={true}
                            >
                              Please select a size.
                            </option>
                            {item.sizes
                              ? item.sizes.map((size, p) => {
                                  return (
                                    <option key={p} value={size}>
                                      {size}
                                    </option>
                                  );
                                })
                              : ""}
                          </select>
                        </>
                      ) : (
                        ""
                      )
                    ) : (
                      <span>Size: {item.selectedSize}</span>
                    )}
                    {!payment ? <span>Quantity: {item.quantity}</span> : ""}
                  </div>
                  {!payment && item.colors && item.sizes ? (
                    <button onClick={() => handleEdit(i, item._id)}>
                      {clickedEdit && clickedEdit[i] ? "Save" : "Edit"}
                    </button>
                  ) : payment ? (
                    <div className="checkoutBodyBasketOrder__modify-amount">
                      <span>Amount:</span>
                      <div>
                        <div>
                          <span>{item.quantity}</span>
                          <div>
                            <span onClick={() => bContext.addToBasket(item)}>
                              <IoMdArrowDropup />
                            </span>
                            <span
                              onClick={() =>
                                bContext.decrementProduct(item._id)
                              }
                            >
                              <IoMdArrowDropdown />
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => bContext.removeFromBasket(item._id)}
                      >
                        Remove item
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="checkoutBodyBasketOrder__info-lower">
                  <span></span>
                  <span></span>
                  <span className="checkoutBodyBasketOrder__info-lower-nored">
                    $ {(item.quantity * item.price).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default React.memo(CheckoutBodyBasketOrder);
