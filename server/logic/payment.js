import SliderTwoProduct from "../models/SliderTwo.js";
import Voucher from "../models/Voucher.js";

const decideTotal = async (basket, discount) => {
  var discountVar = 0;
  var total = 0;
  if (discount) {
    await Voucher.findOne({ voucher: discount }).then((res) => {
      const isValid = res.endDate.getTime() - new Date().getTime();
      if (isValid > 0) {
        discountVar = res.value;
      }
    });
  }

  for (let i = 0; i < basket.length; i++) {
    var item = await SliderTwoProduct.findById(basket[i].id);
    if (!item.price) {
      total += parseFloat(
        (basket[i].quantity * item.priceDiscount.discount).toFixed(2)
      );
    } else {
      total += parseFloat(
        (
          ((basket[i].quantity * item.price) / 100) *
          (100 - discountVar)
        ).toFixed(2)
      );
    }
  }
  return total.toFixed(2);
};

const createJSONItemArray = async (basket, discount) => {
  var jsonArray = [];
  var discountVar = 0;
  await Voucher.findOne({ vouhcer: discount }).then((res) => {
    const isValid = res.endDate.getTime() - new Date().getTime();
    if (isValid > 0) {
      discountVar = res.value;
    }
  });
  for (let i = 0; i < basket.length; i++) {
    const item = await SliderTwoProduct.findById(basket[i].id);
    jsonArray.push({
      name: item.title,
      price: item.price
        ? parseFloat(((item.price / 100) * (100 - discountVar)).toFixed(2))
        : parseFloat(item.priceDiscount.discount.toFixed(2)),
      currency: "USD",
      quantity: basket[i].quantity,
    });
  }
  return jsonArray;
};

const createJSONAddress = async (address) => {
  var addressJSON;
  if (address.secondAddress !== "false") {
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
