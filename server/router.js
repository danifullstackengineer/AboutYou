import express from "express";
import {
  register,
  login,
  verifyJWT,
  isAuth,
} from "./controllers/Credential.js";
import {
  createPaypalPaymentPage,
  handlePaypalSuccessPayment,
  createStripeSecret,
  createStripePayment,
  getTotalCrypto,
  createCoinpaymentsPayment,
} from "./controllers/Payment.js";
import { createProducts } from "./controllers/SingleUse.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/isUserAuth", verifyJWT, isAuth);

//PAYPAL
router.post("/createPaypalPayment", verifyJWT, createPaypalPaymentPage);
router.get("/executePaypalPayment", verifyJWT, handlePaypalSuccessPayment);

//Stripe
router.post("/createStripeSecret", verifyJWT, createStripeSecret);
router.post("/createStripePayment", verifyJWT, createStripePayment);

//Crypto
router.post("/getTotalCrypto", verifyJWT, getTotalCrypto);

//Coinpayments
router.post("/createCoinpaymentsPayment", verifyJWT, createCoinpaymentsPayment);

//Dev only
if (process.env.NODE_ENV !== "production") {
  // router.get("/singleUse/createProducts", createProducts);
}

export default router;
