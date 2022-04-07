const addToBasketStorage = (item: any) => {
  const basket = localStorage.getItem("basket");
  const newItem = { ...item, quantity: 1 };
  if (!basket) {
    localStorage.setItem("basket", JSON.stringify([newItem]));
  } else {
    const basketP = JSON.parse(basket);
    const exists = basketP.filter((oldItem: any) => oldItem.id === item.id);
    if (exists.length === 0) {
      const newBasket = [...basketP, newItem];
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
  window.dispatchEvent(new Event("basket"));
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

const increaseItemQuantity = (item: {
  backgroundImg: string;
  foregroundImg?: string | undefined;
  tags?:
    | {
        name: string;
        special?: boolean | undefined;
      }[]
    | undefined;
  title: string;
  price: string;
  priceDiscount: { full: string; discount: string };
  colors: string[];
  sizes?: string[] | undefined;
  id: string;
  quantity: number;
}): void => {
  const basket = localStorage.getItem("basket");
  const newItem = { ...item, quantity: 1 };
  if (!basket) {
    localStorage.setItem("basket", JSON.stringify([newItem]));
  } else {
    const basketP = JSON.parse(basket);
    for (let i = 0; i < basketP.length; i++) {
      if (basketP[i].id === item.id) {
        basketP[i].quantity++;
      }
    }
    localStorage.removeItem("basket");
    localStorage.setItem("basket", JSON.stringify(basketP));
  }
  window.dispatchEvent(new Event("basket"));
};

const decreaseItemQuantity = (item: {
  backgroundImg: string;
  foregroundImg?: string | undefined;
  tags?:
    | {
        name: string;
        special?: boolean | undefined;
      }[]
    | undefined;
  title: string;
  price: string;
  priceDiscount: { full: string; discount: string };
  colors: string[];
  sizes?: string[] | undefined;
  id: string;
  quantity: number;
}) => {
  const basket = localStorage.getItem("basket");
  if (basket) {
    const basketP = JSON.parse(basket);
    for (let i = 0; i < basketP.length; i++) {
      if (basketP[i].id === item.id && basketP[i].quantity > 1) {
        basketP[i].quantity--;
      }
    }
    localStorage.removeItem("basket");
    localStorage.setItem("basket", JSON.stringify(basketP));
    window.dispatchEvent(new Event("basket"));
  }
};

const removeItemFromBasketStorage = (item: {
  backgroundImg: string;
  foregroundImg?: string | undefined;
  tags?:
    | {
        name: string;
        special?: boolean | undefined;
      }[]
    | undefined;
  title: string;
  price: string;
  priceDiscount: { full: string; discount: string };
  colors: string[];
  sizes?: string[] | undefined;
  id: string;
  quantity: number;
}): void => {
  const basket = localStorage.getItem("basket");
  if (basket) {
    const basketP = JSON.parse(basket);

    for (let i = 0; i < basketP.length; i++) {
      if (basketP[i].id === item.id) {
        basketP.splice(i, 1);
      }
    }
    localStorage.removeItem("basket");
    localStorage.setItem("basket", JSON.stringify(basketP));
    window.dispatchEvent(new Event("basket"));
  }
};

export {
  addToBasketStorage,
  getBasketLengthStorage,
  getBasketItemsStorage,
  decreaseItemQuantity,
  increaseItemQuantity,
  removeItemFromBasketStorage,
};
