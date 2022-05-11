import { ExtendedProductType } from "../../Context/Basket";
import { ProductType, ProductTypeBasket } from "../../types/Product";
import { cloneDeep } from "lodash";
import React from "react";

const addToBasketStorageAndContext = (
  item: ProductType | ProductTypeBasket,
  basket: ExtendedProductType[] | ProductTypeBasket[],
  setBasket: React.Dispatch<React.SetStateAction<ExtendedProductType[]>>
): void => {
  const duplicate = (): boolean | undefined => {
    for (let i = 0; i < basket.length; i++) {
      if (basket[i].id === item.id) return true;
      else continue;
    }
  };
  var basket_clone = cloneDeep(basket);
  if (duplicate()) {
    basket_clone.map((product: ExtendedProductType) => {
      if (product.id !== item.id) return product;
      else {
        product.quantity++;
        return product;
      }
    });
  } else {
    basket_clone = [...basket, { ...item, quantity: 1 }];
  }
  setBasket(basket_clone);
  localStorage.setItem("basket", JSON.stringify(basket_clone));
};

const removeFromBasketStorageAndContext = (
  id: string,
  basket: ExtendedProductType[],
  setBasket: React.Dispatch<React.SetStateAction<ExtendedProductType[]>>
): void => {
  var basket_clone = cloneDeep(basket);
  basket_clone = basket_clone.filter(
    (product: ExtendedProductType) => product.id !== id
  );
  setBasket(basket_clone);
  localStorage.setItem("basket", JSON.stringify(basket_clone));
};

const getTotalPriceBasket = (basket: ExtendedProductType[]): number => {
  var total = 0;
  basket.forEach((product) => (total += product.quantity * product.price));
  return total;
};

const isProductInBasket = (
  id: string,
  basket: ExtendedProductType[]
): boolean => {
  var isIn = false;
  basket.forEach((product) => (product.id === id ? (isIn = true) : undefined));
  return isIn;
};

const decrementProductStorage = (
  id: string,
  basket: ExtendedProductType[],
  setBasket: React.Dispatch<React.SetStateAction<ExtendedProductType[]>>
): void => {
  var basket_clone = cloneDeep(basket);
  basket_clone.filter((product: ExtendedProductType) =>
    product.id === id && product.quantity > 1 ? product.quantity-- : product
  );
  setBasket(basket_clone);
  localStorage.setItem("basket", JSON.stringify(basket_clone));
};

export {
  addToBasketStorageAndContext,
  removeFromBasketStorageAndContext,
  getTotalPriceBasket,
  isProductInBasket,
  decrementProductStorage,
};
