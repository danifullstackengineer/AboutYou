import SliderTwoProduct from "../models/SliderTwo.js";

const decideTotal = async (basket) => {
  var total = 0;

  for (let i = 0; i < basket.length; i++) {
    var item = await SliderTwoProduct.findById(basket[i].id);
    if (!item.price) {
      total += basket[i].quantity * item.priceDiscount.discount;
    } else {
      total += basket[i].quantity * item.price;
    }
  }
  return total.toFixed(2);
};

const createJSONItemArray = async (basket) => {
  var jsonArray = [];
  for (let i = 0; i < basket.length; i++) {
    const item = await SliderTwoProduct.findById(basket[i].id);
    jsonArray.push({
      name: item.title,
      price: item.price
        ? parseFloat(item.price).toFixed(2)
        : parseFloat(item.priceDiscount.discount).toFixed(2),
      currency: "USD",
      quantity: basket[i].quantity,
    });
  }
  return jsonArray;
};

const createJSONAddress = async (address) => {
  var addressJSON;
  if (address.secondAddress!== 'false') {
    addressJSON = {
      line1: address.secondAddress.addressOne,
      line2: address.secondAddress.addressTwo,
      city: address.secondAddress.city,
      postal_code: address.secondAddress.p_code,
      state: address.secondAddress.state,
      country_code: "RO",
    };
  } else {
    addressJSON = {
      line1: address.firstAddress.addressOne,
      line2: address.firstAddress.addressTwo,
      city: address.firstAddress.city,
      postal_code: address.firstAddress.p_code,
      state: address.firstAddress.state,
      country_code: "RO",
    };
  }
  return addressJSON;
};

export { decideTotal, createJSONItemArray, createJSONAddress };
