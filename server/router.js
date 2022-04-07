import express from "express";
import {
  register,
  login,
  verifyJWT,
  isAuth,
} from "./controllers/Credential.js";
import {createPaypalPaymentPage, handlePaypalSuccessPayment,createStripeSecret, createStripePayment, getTotalCrypto, createCoinpaymentsPayment} from "./controllers/Payment.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/isUserAuth", verifyJWT, isAuth);

//PAYPAL
router.post('/createPaypalPayment', createPaypalPaymentPage)
router.get('/executePaypalPayment', handlePaypalSuccessPayment);


//Stripe
router.post('/createStripeSecret', createStripeSecret)
router.post('/createStripePayment', createStripePayment);

//Crypto
router.post('/getTotalCrypto', getTotalCrypto)

//Coinpayments
router.post('/createCoinpaymentsPayment', createCoinpaymentsPayment)


export default router;
