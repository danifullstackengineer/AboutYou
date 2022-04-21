import paypal from "paypal-rest-sdk";
import { stripe } from "../server.js";
import dotenv from "dotenv";
import fetch from "node-fetch";
import Web3 from "web3";
import User from "../models/User.js";
import Order from "../models/Orders.js";
import { coinpaymentsClient } from "../server.js";
import {
  decideTotal,
  createJSONItemArray,
  createJSONAddress,
} from "../logic/payment.js";
dotenv.config();

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

const createPaypalPaymentPage = async (req, res) => {
  try {
    const body = req.body;
    const id = body.id;
    const total = await decideTotal(body.basket, body.discount);
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
            ? "/payment/success"
            : "http://localhost:3000/payment/success",
        cancel_url:
          process.env.NODE_ENV === "production"
            ? "/payment/failure"
            : "http://localhost:3000/payment/failure",
      },
      transactions: [
        {
          item_list: {
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
    console.log(err)
    return res.send({
      success: false,
      message: "There was a problem while processing payment.",
    });
  }
};
const returnExecutePaymentJSON = async (payerId) => {
  return {
    payer_id: payerId,
    transactions: await Order.find({ payId: payerId }).orderInformation,
  };
};

const handlePaypalSuccessPayment = async (req, res) => {
  try {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    const paymentJSON = await returnExecutePaymentJSON(payerId);

    const alreadyPaid = await Order.find({ payId: payerId }).paid;

    if (!alreadyPaid) {
      paypal.payment.execute(paymentId, paymentJSON, async (error, payment) => {
        if (error) {
          console.log(error);
          return res.send({
            success: false,
            message: "There was a problem while processing your payment.",
          });
        } else {
          await Order.findOneAndUpdate({ payId: payment.id }, { paid: true });
          return res.send({
            success: true,
            message: "Payment succesfully made.",
          });
        }
      });
    }
  } catch (err) {
    return res.send({
      success: false,
      message: "There was a problem while processing payment.",
    });
  }
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
    const total = await decideTotal(body.basket, body.discount);
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
    const total = await decideTotal(req.body.basket, req.body.discount);
    if (total && total > 0) {
      const ethPrice = await fetch(
        "https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=ETH"
      );
      const data = await ethPrice.json();
      const dataMultipled = data.ETH * total;
      const dataWEI = Web3.utils.toWei(dataMultipled.toString(), "ether");
      return res.send({
        success: true,
        message: "Total calculated succesfully",
        total: "0x" + BigInt(dataWEI).toString(16),
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

const createCoinpaymentsPayment = async (req, res) => {
  try {
    const body = req.body;
    await coinpaymentsClient
      .createTransaction({
        currency1: "USD",
        currency2: body.coin,
        amount: await decideTotal(body.basket, body.discount),
        buyer_email: "danifullstack@gmail.com",
        success_url:
          process.env.NODE_ENV === "production"
            ? "/payment/success"
            : "http://localhost:3000/payment/success",
        cancel_url:
          process.env.NODE_ENV === "production"
            ? "/payment/failure"
            : "http://localhost:3000/payment/failure",
      })
      .then((resTransaction) => {
        if (resTransaction) {
          return res.send({
            success: true,
            message: resTransaction.checkout_url,
          });
        }
      });
  } catch (err) {
    return res.send({
      success: false,
      message: "Something went wrong while creating the payment.",
    });
  }
};

export {
  createPaypalPaymentPage,
  handlePaypalSuccessPayment,
  createStripePayment,
  createStripeSecret,
  getTotalCrypto,
  createCoinpaymentsPayment,
};
