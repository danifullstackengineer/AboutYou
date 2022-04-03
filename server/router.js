import express from "express";
import {
  register,
  login,
  verifyJWT,
  isAuth,
} from "./controllers/Credential.js";
import { createCryptoPayment, createPaypalPaymentPage, handlePaypalFailurePayment, handlePaypalSuccessPayment,createStripeSecret, createStripePayment, getTotalCrypto} from "./controllers/Payment.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/isUserAuth", verifyJWT, isAuth);
router.post("/createCryptoPayment", createCryptoPayment);

//PAYPAL
router.post('/createPaypalPayment', createPaypalPaymentPage)
router.get('/payment/paypal/success', handlePaypalSuccessPayment);
router.get('/payment/paypal/failure', handlePaypalFailurePayment)


//Stripe
router.post('/createStripeSecret', createStripeSecret)
router.post('/createStripePayment', createStripePayment);

//Crypto
router.post('/getTotalCrypto', getTotalCrypto)



export default router;
