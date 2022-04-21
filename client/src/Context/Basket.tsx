import { createContext } from "react";
import { ProductType } from "../types/Product";

export declare type BasketContextType = {
  product: ExtendedProductType[];
  addToBasket: (item: ProductType) => void;
  removeFromBasket: (id: ProductType["id"]) => void;
  getTotalPrice: () => number;
  isInBasket: (id: ProductType["id"]) => boolean;
};

export const BasketContext = createContext<BasketContextType>({
  product: [],
  addToBasket: () => {},
  removeFromBasket: () => {},
  getTotalPrice: () => {
    return 0;
  },
  isInBasket: () => {
    return false;
  },
});
export type ExtendedProductType = ProductType & {
  quantity: number;
};
