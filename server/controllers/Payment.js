// import { createPaypalPaymentIntent } from "../Payment/paypal.js";
import paypal from "paypal-rest-sdk";
import { stripe } from "../server.js";
import dotenv from "dotenv";
import fetch from "node-fetch";
import SliderTwoProduct from "../models/SliderTwo.js";
import Web3 from 'web3';
import BN from 'bn.js';
import User from "../models/User.js";
import Order from "../models/Orders.js";
import {
  decideTotal,
  createJSONItemArray,
  createJSONAddress,
} from "../logic/payment.js";
dotenv.config();

paypal.configure({
  mode: process.env.NODE_ENV === "production" ? "live" : "sandbox",
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_SECRET,
});

const createCryptoPayment = async (req, res) => {
  try {
  } catch (err) {}
};

const createPaypalPaymentPage = async (req, res) => {
  try {
    const body = req.body;
    const id = body.id;
    const total = await decideTotal(body.basket);
    const itemArray = await createJSONItemArray(body.basket);
    const address = await createJSONAddress(body.address);
    const user = await User.findById(id);
    if (!user) {
      return res.send({ success: false, message: "No user is logged in." });
    }
    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url:
          process.env.NODE_ENV === "production"
            ? "/payment/paypal/success"
            : "http://localhost:5000/payment/paypal/success",
        cancel_url:
          process.env.NODE_ENV === "production"
            ? "/payment/paypal/failure"
            : "http://localhost:5000/payment/paypal/failure",
      },
      transactions: [
        {
          item_list: {
            items: itemArray,
            shipping_address: address,
          },
          description: "Thank you for purchasing items thorugh us.",
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
    paypal.payment.create(create_payment_json, (error, payment) => {
      if (error) {
        throw error;
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === "approval_url") {
            const newOrder = new Order({
              madeBy: id,
              orderInformation: payment.transactions,
              payId: payment.id,
              method: "PayPal",
            });
            newOrder.save();
            return res.send({ success: true, message: payment.links[i].href });
          }
        }
      }
    });
  } catch (err) {
    return res.send({
      success: false,
      message: "There was a problem while processing payment.",
    });
  }
};
const createPaypalPayment = async (req, res) => {
  try {
  } catch (err) {}
};
const returnExecutePaymentJSON = async (payerId) => {
  return {
    payer_id: payerId,
    transactions: await Order.find({ payId: payerId }).orderInformation,
  };
};

const handlePaypalSuccessPayment = async (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
  const paymentJSON = await returnExecutePaymentJSON(payerId);

  paypal.payment.execute(paymentId, paymentJSON, async (error, payment) => {
    if (error) {
      return res.send({
        success: false,
        message: "There was a problem while processing your payment.",
      });
    } else {
      await Order.findOneAndUpdate({ payId: payment.id }, { paid: true });
      return res.send(
        "<html>Payment was successful! You can now close the window</html>"
      );
    }
  });
};
const handlePaypalFailurePayment = async (req, res) => {
  res.send(
    "<html>Payment was unsuccessful! Close this window and try again. If the problem persists please contact us.</html>"
  );
};

const createStripePayment = async (req, res) => {
  try {
    const body = req.body;
    const id = body.id;
    const user = await User.findById(id);
    if (!user) {
      return res.send({ success: false, message: "No user is logged in." });
    }
    const newOrder = new Order({
      madeBy: id,
      orderInformation: body.paymentIntent,
      method: "Credit Card",
      paid: true,
    });
    newOrder.save();
    return res.send({
      success: true,
      message: "Succesfully added order to database.",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: "There was a problem while processing payment.",
    });
  }
};
const createStripeSecret = async (req, res) => {
  try {
    const body = req.body;
    const total = await decideTotal(body.basket);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.floor(total * 100),
      currency: "usd",
    });
    return res.send({
      success: true,
      message: "Client secret succesfully created.",
      secret: paymentIntent.client_secret,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: "There was a problem while creating payment order.",
    });
  }
};

const getTotalCrypto = async (req, res) => {
  try {
    const total = await decideTotal(req.body.basket);
    if (total && total > 0) {
      const ethPrice = await fetch(
        "https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=ETH"
      )
      const data = await ethPrice.json()
      const dataMultipled = data.ETH * total;
      const dataWEI = Web3.utils.toWei(dataMultipled.toString(), 'ether')
      return res.send({
        success: true,
        message: "Total calculated succesfully",
        total: "0x" + BigInt(dataWEI).toString(16)
      });
    } else {
      return res.send({
        success: false,
        message: "Total can't be less or equal to 0.",
      });
    }
  } catch (err) {
    return res.send({
      success: false,
      message: "There was a problem while calculating the total price.",
    });
  }
};

export {
  createCryptoPayment,
  createPaypalPaymentPage,
  createPaypalPayment,
  handlePaypalFailurePayment,
  handlePaypalSuccessPayment,
  createStripePayment,
  createStripeSecret,
  getTotalCrypto,
};
