const getTotalBasketPrice = (
  basket: {
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
  }[]
): string => {
  var total = 0;
  for (let i = 0; i < basket.length; i++) {
    if (basket[i].price) {
      total += basket[i].quantity * parseFloat(basket[i].price);
    }
    else {
      total += basket[i].quantity * parseFloat(basket[i].priceDiscount.discount);
    }
  }
  return total.toFixed(2);
};

export { getTotalBasketPrice };
