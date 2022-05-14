import { createContext } from "react";
import { AccessoryType } from "../types/Accessory";
import { ProductType } from "../types/Product";
import { ExtendedAccessoryType, ExtendedProductType } from "./Basket";

export declare type WishlistContextType = {
  product: ExtendedProductType[] | ExtendedAccessoryType[];
  addToWishlist: (item: ProductType | AccessoryType) => void;
  removeFromWishlist: (id: ProductType["id"] | AccessoryType['id']) => void;
  isInWishlist: (id: ProductType["id"] | AccessoryType['id']) => boolean;
};

export const WishlistContext = createContext<WishlistContextType>({
  product: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  isInWishlist: () => {
    return false;
  },
});
