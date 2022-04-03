const addToBasketStorage = (item: any) => {
  const basket = localStorage.getItem("basket");
  const newItem = { ...item, quantity: 1 }
  if (!basket) {
    localStorage.setItem("basket", JSON.stringify([newItem]));
  } else {
    const basketP = JSON.parse(basket);
    const exists = basketP.filter((oldItem: any) => oldItem.id === item.id);
    console.log(exists)
    if (exists.length === 0) {
      const newBasket =  [...basketP, newItem]
      localStorage.removeItem("basket");
      localStorage.setItem("basket", JSON.stringify(newBasket));
    } else {
      basketP.map((oldItem: any) =>
        oldItem.id === item.id ? oldItem.quantity++ : oldItem
      );
      localStorage.removeItem("basket");
      localStorage.setItem("basket", JSON.stringify(basketP));
    }
  }
  window.dispatchEvent(new Event("storage"));
};

const getBasketLengthStorage = (): number | undefined => {
  const basket = localStorage.getItem("basket");
  if (!basket) return undefined;
  const basketP = JSON.parse(basket);
  return basketP.length;
};
const getBasketItemsStorage = ():
  | {
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
  const basket = localStorage.getItem("basket");
  if (!basket) return undefined;
  const basketP = JSON.parse(basket);
  return basketP;
};

export { addToBasketStorage, getBasketLengthStorage, getBasketItemsStorage };
