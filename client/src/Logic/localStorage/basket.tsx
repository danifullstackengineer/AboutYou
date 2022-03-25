const addToBasketStorage = (item:any) => {
    const basket = localStorage.getItem('basket');
    if (!basket) {
        localStorage.setItem("basket", JSON.stringify([item]));
      } else {
        const basketP = JSON.parse(basket);
        const newBasket = [...basketP, item];
        localStorage.removeItem("basket");
        localStorage.setItem("basket", JSON.stringify(newBasket));
    }
    window.dispatchEvent(new Event('storage'))
}

const getBasketLengthStorage = (): (number | undefined) => {
    const basket = localStorage.getItem('basket')
    if (!basket) return undefined;
    const basketP = JSON.parse(basket);
    return basketP.length;
}
const getBasketItemsStorage = (): {
    backgroundImg: string;
    foregroundImg?: string;
    tags?: { name: string; special?: boolean }[];
    title: string;
    price: string | { full: string; discount: string };
    colors: string[];
    sizes?: string[];
  }[] | undefined => {
    const basket = localStorage.getItem('basket');
    if (!basket) return undefined;
    const basketP = JSON.parse(basket);
    return basketP;
}

export {addToBasketStorage,getBasketLengthStorage, getBasketItemsStorage}