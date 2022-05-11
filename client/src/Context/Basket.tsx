import { createContext } from "react";
import { ProductType, ProductTypeBasket } from "../types/Product";

export declare type BasketContextType = {
  product: ExtendedProductType[] | ProductTypeBasket[];
  addToBasket: (item: ProductType | ProductTypeBasket) => void;
  removeFromBasket: (id: ProductType["id"]) => void;
  getTotalPrice: () => number;
  isInBasket: (id: ProductType["id"]) => boolean;
  decrementProduct: (id: ProductType['id']) => void;
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
  decrementProduct: () => {}
});
export type ExtendedProductType = ProductType & {
  quantity: number;
};
