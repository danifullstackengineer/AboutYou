import express from "express";
import { loginAdmin } from "./controllers/Admin.js";
import rateLimit from "express-rate-limit";
import {
  register,
  login,
  verifyJWT,
  isAuth,
  verify_email
} from "./controllers/Credential.js";
// import {
//   createPaypalPaymentPage,
//   handlePaypalSuccessPayment,
//   createStripeSecret,
//   createStripePayment,
//   getTotalCrypto,
//   createCoinpaymentsPayment,
// } from "./controllers/Payment.js";
import { createProducts } from "./controllers/SingleUse.js";

const apiLimited = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const router = express.Router();

router.post("/register", apiLimited, register);
router.post("/login", apiLimited, login);
router.get("/isUserAuth", apiLimited, verifyJWT, isAuth);

//PAYPAL
// router.post(
//   "/createPaypalPayment",
//   apiLimited,
//   verifyJWT,
//   createPaypalPaymentPage
// );
// router.get(
//   "/executePaypalPayment",
//   apiLimited,
//   verifyJWT,
//   handlePaypalSuccessPayment
// );

//Stripe
// router.post("/createStripeSecret", apiLimited, verifyJWT, createStripeSecret);
// router.post("/createStripePayment", apiLimited, verifyJWT, createStripePayment);

//Crypto
// router.post("/getTotalCrypto", apiLimited, verifyJWT, getTotalCrypto);

//Coinpayments
// router.post(
//   "/createCoinpaymentsPayment",
//   apiLimited,
//   verifyJWT,
//   createCoinpaymentsPayment
// );

//Dev only
if (process.env.NODE_ENV !== "production") {
  // router.get("/singleUse/createProducts", createProducts);
}

//Verify email
router.get("/verify_email/query", verify_email);

// Admin only
router.post("/admin/api/login", apiLimited, loginAdmin);

export default router;
