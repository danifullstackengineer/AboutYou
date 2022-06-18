import {
  ExtendedAccessoryType,
  ExtendedProductType,
} from "../../Context/Basket";
import { ProductTypeBasket } from "../../types/Product";
import { cloneDeep } from "lodash";
import React from "react";
import { AccessoryTypeBasket } from "../../types/Accessory";

const addToBasketStorageAndContext = (
  item: ProductTypeBasket | AccessoryTypeBasket,
  basket: ProductTypeBasket[] | AccessoryTypeBasket[],
  setBasket: React.Dispatch<
    React.SetStateAction<ProductTypeBasket[] | AccessoryTypeBasket[]>
  >
): void => {
  const duplicate = (): boolean | undefined => {
    for (let i = 0; i < basket.length; i++) {
      if (basket[i]._id === item._id) return true;
      else continue;
    }
  };
  var basket_clone = cloneDeep(basket);
  if (duplicate()) {
    basket_clone.map((product: ProductTypeBasket | AccessoryTypeBasket) => {
      if (product._id !== item._id) return product;
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
  basket: ProductTypeBasket[] | AccessoryTypeBasket[],
  setBasket: React.Dispatch<
    React.SetStateAction<ProductTypeBasket[] | AccessoryTypeBasket[]>
  >
): void => {
  var basket_clone = cloneDeep(basket);
  basket_clone = basket_clone.filter(
    (product: ExtendedProductType | ExtendedAccessoryType) => product._id !== id
  );
  setBasket(basket_clone);
  localStorage.setItem("basket", JSON.stringify(basket_clone));
};

const getTotalPriceBasket = (
  basket: ProductTypeBasket[] | AccessoryTypeBasket[]
): number => {
  var total = 0;
  basket.forEach((product) => (total += product.quantity * product.price));
  return total;
};

const isProductInBasket = (
  id: string,
  basket: ProductTypeBasket[] | AccessoryTypeBasket[]
): boolean => {
  var isIn = false;
  basket.forEach((product) => (product._id === id ? (isIn = true) : undefined));
  return isIn;
};

const decrementProductStorage = (
  id: string,
  basket: ProductTypeBasket[] | AccessoryTypeBasket[],
  setBasket: React.Dispatch<
    React.SetStateAction<ProductTypeBasket[] | AccessoryTypeBasket[]>
  >
): void => {
  var basket_clone = cloneDeep(basket);
  basket_clone.filter((product: ExtendedProductType) =>
    product._id === id && product.quantity > 1 ? product.quantity-- : product
  );
  setBasket(basket_clone);
  localStorage.setItem("basket", JSON.stringify(basket_clone));
};

const updateProductStorage = (
  id: string,
  basket: ProductTypeBasket[] | AccessoryTypeBasket[],
  setBasket: React.Dispatch<
    React.SetStateAction<ProductTypeBasket[] | AccessoryTypeBasket[]>
  >,
  updateObject: Partial<ProductTypeBasket>
): void => {
  var basket_clone = cloneDeep(basket);
  basket_clone.map((product: ProductTypeBasket, i: number) => {
    if (product._id === id) {
      basket_clone[i] = { ...basket_clone[i], ...updateObject };
    }
    return basket_clone[i];
  });
  setBasket(basket_clone);
  localStorage.setItem("basket", JSON.stringify(basket_clone));
};

export {
  addToBasketStorageAndContext,
  removeFromBasketStorageAndContext,
  getTotalPriceBasket,
  isProductInBasket,
  decrementProductStorage,
  updateProductStorage,
};
