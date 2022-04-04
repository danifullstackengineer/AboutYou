const addToWishlistStorage = (item: any) => {
  const wishlist = localStorage.getItem("wishlist");
  const newItem = { ...item, quantity: 1 };
  if (!wishlist) {
    localStorage.setItem("wishlist", JSON.stringify([newItem]));
  } else {
    const wishlistP = JSON.parse(wishlist);
    const exists = wishlistP.filter((oldItem: any) => oldItem.id === item.id);
    if (exists.length === 0) {
      const newWishlist = [...wishlistP, newItem];
      localStorage.removeItem("wishlist");
      localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    } else {
      wishlistP.map((oldItem: any) =>
        oldItem.id === item.id ? oldItem.quantity++ : oldItem
      );
      localStorage.removeItem("wishlist");
      localStorage.setItem("wishlist", JSON.stringify(wishlistP));
    }
    }
    window.dispatchEvent(new Event("wishlist"))
};

const getWishlistItemsStorage = ():| {
    backgroundImg: string;
    foregroundImg?: string;
    tags?: { name: string; special?: boolean }[];
    title: string;
    price: string;
    priceDiscount: { full: string; discount: string };
    colors: string[];
    sizes?: string[];
    id: string;
    quantity: number;
  }[]
    | undefined => {
    const wishlist = localStorage.getItem("wishlist")
    if (!wishlist) return undefined;
    const wishlistP = JSON.parse(wishlist);
    return wishlistP;
}

export { addToWishlistStorage, getWishlistItemsStorage };
