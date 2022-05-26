import { createContext } from "react";
import { ProductType, ProductTypeBasket } from "../types/Product";
import { AccessoryType, AccessoryTypeBasket } from "../types/Accessory";

export declare type BasketContextType = {
  product:
    | ProductTypeBasket[]
    | AccessoryTypeBasket[];
  addToBasket: (item: ProductTypeBasket | AccessoryTypeBasket) => void;
  removeFromBasket: (id: ProductType["id"] | AccessoryType["id"]) => void;
  getTotalPrice: () => number;
  isInBasket: (id: ProductType["id"] | AccessoryType["id"]) => boolean;
  decrementProduct: (id: ProductType["id"] | AccessoryType["id"]) => void;
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
  decrementProduct: () => {},
});
export type ExtendedProductType = ProductType & {
  quantity: number;
};
export type ExtendedAccessoryType = AccessoryType & {
  quantity: number;
};
