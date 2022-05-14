import { ExtendedAccessoryType, ExtendedProductType } from "../Context/Basket";

const getTotalBasketPrice = (
  basket: ExtendedProductType[] | ExtendedAccessoryType[]
): string => {
  var total = 0;
  for (let i = 0; i < basket.length; i++) {
      total += basket[i].quantity * basket[i].price;
  }
  return total.toFixed(2);
};

export { getTotalBasketPrice };
