import { createContext } from "react";
import { ProductType } from "../types/Product";
import { ExtendedProductType } from "./Basket";

export declare type WishlistContextType = {
  product: ExtendedProductType[];
  addToWishlist: (item: ProductType) => void;
  removeFromWishlist: (id: ProductType["id"]) => void;
  isInWishlist: (id: ProductType["id"]) => boolean;
};

export const WishlistContext = createContext<WishlistContextType>({
  product: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  isInWishlist: () => {
    return false;
  },
});
