import { cloneDeep } from "lodash";
import { ExtendedProductType } from "../../Context/Basket";
import { ProductType } from "../../types/Product";

const addToWishlistStorageAndContext = (
  item: ProductType,
  wishlist: ExtendedProductType[],
  setWishlist: React.Dispatch<React.SetStateAction<ExtendedProductType[]>>
) => {
  const duplicate = (): boolean | undefined => {
    for (let i = 0; i < wishlist.length; i++) {
      if (wishlist[i].id === item.id) return true;
      else continue;
    }
  };
  if (!duplicate()) {
    var wishlist_clone = cloneDeep(wishlist);
    wishlist_clone = [...wishlist, { ...item, quantity: 1 }];
    setWishlist(wishlist_clone);
    localStorage.setItem("wishlist", JSON.stringify(wishlist_clone));
  }
};
const removeFromWishlistStorageAndContext = (
  id: string,
  wishlist: ExtendedProductType[],
  setWishlist: React.Dispatch<React.SetStateAction<ExtendedProductType[]>>
): void => {
  var wishlist_clone = cloneDeep(wishlist);
  wishlist_clone = wishlist_clone.filter(
    (product: ExtendedProductType) => product.id !== id
  );
  setWishlist(wishlist_clone);
  localStorage.setItem("wishlist", JSON.stringify(wishlist_clone));
};
const isProductInWishlist = (id: string, wishlist: ExtendedProductType[]) => {
  var isIn = false;
  wishlist.forEach((product) =>
    product.id === id ? (isIn = true) : undefined
  );

  return isIn;
};

export {
  addToWishlistStorageAndContext,
  removeFromWishlistStorageAndContext,
  isProductInWishlist,
};
