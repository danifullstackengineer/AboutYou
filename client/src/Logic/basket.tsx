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
    price:
      | string
      | {
          full: string;
          discount: string;
        };
    colors: string[];
    sizes?: string[] | undefined;
  }[]
): number => {
  var total = 0;
  for (let i = 0; i < basket.length; i++) {
    if (typeof basket[i].price === "string") {
      total += parseFloat(basket[i].price.toString());
    } else {
      total += parseFloat(
        (basket[i].price as { full: string; discount: string }).discount
      );
    }
  }
  return total;
};

export { getTotalBasketPrice };
