// const addToBasketStorage = (item: any) => {
//   const basket = localStorage.getItem("basket");
//   const newItem = { ...item, quantity: 1 };
//   if (!basket) {
//     localStorage.setItem("basket", JSON.stringify([newItem]));
//   } else {
//     const basketP = JSON.parse(basket);
//     const exists = basketP.filter((oldItem: any) => oldItem.id === item.id);
//     if (exists.length === 0) {
//       const newBasket = [...basketP, newItem];
//       localStorage.removeItem("basket");
//       localStorage.setItem("basket", JSON.stringify(newBasket));
//     } else {
//       basketP.map((oldItem: any) =>
//         oldItem.id === item.id ? oldItem.quantity++ : oldItem
//       );
//       localStorage.removeItem("basket");
//       localStorage.setItem("basket", JSON.stringify(basketP));
//     }
//   }
//   window.dispatchEvent(new Event("basket"));
// };

import { ExtendedProductType } from "../../Context/Basket";
import { ProductType } from "../../types/Product";
import { cloneDeep } from "lodash";
import React from "react";
// const getBasketLengthStorage = (): number | undefined => {
//   const basket = localStorage.getItem("basket");
//   if (!basket) return undefined;
//   const basketP = JSON.parse(basket);
//   return basketP.length;
// };
// const getBasketItemsStorage = ():
//   | {
//       backgroundImg: string;
//       foregroundImg?: string;
//       tags?: { name: string; special?: boolean }[];
//       title: string;
//       price: string;
//       priceDiscount: { full: string; discount: string };
//       colors: string[];
//       sizes?: string[];
//       id: string;
//       quantity: number;
//     }[]
//   | undefined => {
//   const basket = localStorage.getItem("basket");
//   if (!basket) return undefined;
//   const basketP = JSON.parse(basket);
//   return basketP;
// };

// const increaseItemQuantity = (item: {
//   backgroundImg: string;
//   foregroundImg?: string | undefined;
//   tags?:
//     | {
//         name: string;
//         special?: boolean | undefined;
//       }[]
//     | undefined;
//   title: string;
//   price: string;
//   priceDiscount: { full: string; discount: string };
//   colors: string[];
//   sizes?: string[] | undefined;
//   id: string;
//   quantity: number;
// }): void => {
//   const basket = localStorage.getItem("basket");
//   const newItem = { ...item, quantity: 1 };
//   if (!basket) {
//     localStorage.setItem("basket", JSON.stringify([newItem]));
//   } else {
//     const basketP = JSON.parse(basket);
//     for (let i = 0; i < basketP.length; i++) {
//       if (basketP[i].id === item.id) {
//         basketP[i].quantity++;
//       }
//     }
//     localStorage.removeItem("basket");
//     localStorage.setItem("basket", JSON.stringify(basketP));
//   }
//   window.dispatchEvent(new Event("basket"));
// };

// const decreaseItemQuantity = (item: {
//   backgroundImg: string;
//   foregroundImg?: string | undefined;
//   tags?:
//     | {
//         name: string;
//         special?: boolean | undefined;
//       }[]
//     | undefined;
//   title: string;
//   price: string;
//   priceDiscount: { full: string; discount: string };
//   colors: string[];
//   sizes?: string[] | undefined;
//   id: string;
//   quantity: number;
// }) => {
//   const basket = localStorage.getItem("basket");
//   if (basket) {
//     const basketP = JSON.parse(basket);
//     for (let i = 0; i < basketP.length; i++) {
//       if (basketP[i].id === item.id && basketP[i].quantity > 1) {
//         basketP[i].quantity--;
//       }
//     }
//     localStorage.removeItem("basket");
//     localStorage.setItem("basket", JSON.stringify(basketP));
//     window.dispatchEvent(new Event("basket"));
//   }
// };

// const removeItemFromBasketStorage = (item: {
//   backgroundImg: string;
//   foregroundImg?: string | undefined;
//   tags?:
//     | {
//         name: string;
//         special?: boolean | undefined;
//       }[]
//     | undefined;
//   title: string;
//   price: string;
//   priceDiscount: { full: string; discount: string };
//   colors: string[];
//   sizes?: string[] | undefined;
//   id: string;
//   quantity: number;
// }): void => {
//   const basket = localStorage.getItem("basket");
//   if (basket) {
//     const basketP = JSON.parse(basket);

//     for (let i = 0; i < basketP.length; i++) {
//       if (basketP[i].id === item.id) {
//         basketP.splice(i, 1);
//       }
//     }
//     localStorage.removeItem("basket");
//     localStorage.setItem("basket", JSON.stringify(basketP));
//     window.dispatchEvent(new Event("basket"));
//   }
// };

// export {
//   addToBasketStorage,
//   getBasketLengthStorage,
//   getBasketItemsStorage,
//   decreaseItemQuantity,
//   increaseItemQuantity,
//   removeItemFromBasketStorage,
// };

const addToBasketStorage = (item: ProductType, duplicate: boolean): void => {
  var basket = localStorage.getItem(
    "basket"
  ) as unknown as ExtendedProductType[];
  if (duplicate) {
    basket.map((product) => {
      if (product.id !== item.id) return product;
      else {
        product.quantity++;
        return product;
      }
    });
  } else {
    basket = [...basket, { ...item, quantity: 1 }];
  }
};

const addToBasketStorageAndContext = (
  item: ProductType,
  basket: ExtendedProductType[],
  setBasket: React.Dispatch<React.SetStateAction<ExtendedProductType[]>>
): void => {
  const duplicate = (): boolean | undefined => {
    for (let i = 0; i < basket.length; i++) {
      if (basket[i].id === item.id) return true;
      else continue;
    }
  };
  var basket_clone = cloneDeep(basket);
  if (duplicate()) {
    basket_clone.map((product) => {
      if (product.id !== item.id) return product;
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
  basket: ExtendedProductType[],
  setBasket: React.Dispatch<React.SetStateAction<ExtendedProductType[]>>
): void => {
  var basket_clone = cloneDeep(basket);
  basket_clone = basket_clone.filter((product) => product.id !== id);
  setBasket(basket_clone);
  localStorage.setItem("basket", JSON.stringify(basket_clone));
};

const getTotalPriceBasket = (basket: ExtendedProductType[]): number => {
  var total = 0;
  basket.forEach((product) => (total += product.quantity * product.price));
  return total;
};

const isProductInBasket = (
  id: string,
  basket: ExtendedProductType[]
): boolean => {
  var isIn = false;
  basket.forEach((product) => (product.id === id ? (isIn = true) : undefined));
  return isIn;
};

const decrementProductStorage = (
  id: string,
  basket: ExtendedProductType[],
  setBasket: React.Dispatch<React.SetStateAction<ExtendedProductType[]>>
): void => {
  var basket_clone = cloneDeep(basket);
  basket_clone.filter((product) =>
    product.id === id && product.quantity > 1 ? product.quantity-- : product
  );
  setBasket(basket_clone);
  localStorage.setItem("basket", JSON.stringify(basket_clone));
};

export {
  addToBasketStorageAndContext,
  removeFromBasketStorageAndContext,
  getTotalPriceBasket,
  isProductInBasket,
  decrementProductStorage,
};
