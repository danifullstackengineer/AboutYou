import paypal from "paypal-rest-sdk";
import dotenv from "dotenv";
import Products from "../models/Products.js";
import Accessories from "../models/Accessories.js";
dotenv.config();
const config_paypal = () => {
  paypal.configure({
    mode: process.env.NODE_ENV === "production" ? "live" : "sandbox",
    client_id:
      process.env.NODE_ENV === "production"
        ? process.env.PAYPAL_CLIENT_ID_LIVE
        : process.env.PAYPAL_CLIENT_ID,
    client_secret:
      process.env.NODE_ENV === "production"
        ? process.env.PAYPAL_SECRET_LIVE
        : process.env.PAYPAL_SECRET,
  });
};

const decideTotal = async (basket) => {
  var price = 0;
  for (let i = 0; i < basket.length; i++) {
    const item = basket[i];
    const prod = await Products.findById(item._id);
    if (!prod) {
      const acc = await Accessories.findById(item._id);
      if (acc) {
        price += acc.price * item.quantity;
      }
    } else {
      price += prod.price * item.quantity;
      if (prod.accessoryId) {
        const extra_acc = await Accessories.findById(item._id);
        if (extra_acc) {
          price += extra_acc.price;
        }
      }
    }
  }
  return price.toFixed(2);
};

const create_address_json = (addressOne, addressTwo, country_code) => {
  if (addressTwo) {
    return {
      line1: addressTwo.addressOne,
      line2: addressTwo.addressTwo,
      city: addressTwo.city,
      postal_code: addressTwo.p_code,
      state: addressTwo.state,
      country_code: country_code,
    };
  } else {
    return {
      line1: addressOne.addressOne,
      line2: addressOne.addressTwo,
      city: addressOne.city,
      postal_code: addressOne.p_code,
      state: addressOne.state,
      country_code: country_code,
    };
  }
};

const create_payment_json = (address, total) => {
  return {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url:
        process.env.NODE_ENV === "production"
          ? "/"
          : "http://localhost:3000/",
      cancel_url:
        process.env.NODE_ENV === "production" ? "/" : "http://localhost:3000/",
    },
    transactions: [
      {
        item_list: {
          shipping_address: address,
        },
        description: "Thank you for purchasing items through us.",
        payment_options: {
          allowed_payment_method: "IMMEDIATE_PAY",
        },
        amount: {
          currency: "USD",
          total: total,
        },
      },
    ],
  };
};

// const createJSONItemArray = async (basket, discount) => {
//   var jsonArray = [];
//   var discountVar = 0;
//   await Voucher.findOne({ vouhcer: discount }).then((res) => {
//     const isValid = res.endDate.getTime() - new Date().getTime();
//     if (isValid > 0) {
//       discountVar = res.value;
//     }
//   });
//   for (let i = 0; i < basket.length; i++) {
//     const item = await SliderTwoProduct.findById(basket[i].id);
//     jsonArray.push({
//       name: item.title,
//       price: item.price
//         ? parseFloat(((item.price / 100) * (100 - discountVar)).toFixed(2))
//         : parseFloat(item.priceDiscount.discount.toFixed(2)),
//       currency: "USD",
//       quantity: basket[i].quantity,
//     });
//   }
//   return jsonArray;
// };

export { config_paypal, decideTotal, create_payment_json, create_address_json };
