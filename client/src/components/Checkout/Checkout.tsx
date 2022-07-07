import React, { useContext, useEffect, useRef, useState } from "react";
import {
  calculateTotalCrypto,
  createCoinpaymentsPayment,
  createPaypalPayment,
  getClientSecret,
  saveCardPaymentDB,
} from "../../API/Payment";
import "../../styles/components/Checkout/Checkout.css";
import { useNavigate } from "react-router-dom";
import CheckoutBody from "./CheckoutBody";
import ContinueCheckout from "./ContinueCheckout";
import FooterCheckout from "./FooterCheckout";
import HeaderCheckout from "./HeaderCheckout";
import PaymentBody from "./PaymentBody/PaymentBody";
import ProgressCheckout from "./ProgressCheckout";
import { StripeCardElement } from "@stripe/stripe-js";
import { useStripe } from "@stripe/react-stripe-js";
import ProcessingPayment from "../../Comp-Single/ProcessingPayment";
import PaymentFailure from "./PaymentBody/PaymentFinished/PaymentFailure";
import PaymentSuccess from "./PaymentBody/PaymentFinished/PaymentSuccess";
import { ProductTypeBasket } from "../../types/Product";
import { AccessoryTypeBasket } from "../../types/Accessory";
import { useLazyQuery } from "@apollo/client";
import { create_paypal_payment } from "../../Apollo/Payment";
import { BasketContext } from "../../Context/Basket";
import { AuthContext } from "../../Context/Auth";

function Checkout({
  setAmount,
  payment,
  checkout,
  paid,
  setDisplay,
  setClickedLogin,
  setChosenAction,
  setBasket,
}: {
  setAmount?: React.Dispatch<React.SetStateAction<string>>;
  amount?: string;
  payment?: boolean;
  checkout?: boolean;
  setDisableClosing: React.Dispatch<React.SetStateAction<boolean>>;
  paid?: boolean;
  setDisplay: React.Dispatch<React.SetStateAction<string>>;
  setChosenAction: React.Dispatch<React.SetStateAction<boolean[]>>;
  setClickedLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setBasket?: React.Dispatch<
    React.SetStateAction<ProductTypeBasket[] | AccessoryTypeBasket[]>
  >;
}) {
  useEffect(() => {
    setDisplay("none");
    return () => {
      setDisplay("flex");
    };
  }, []);

  const bContext = useContext(BasketContext);
  const aContext = useContext(AuthContext);

  // Payment Apollo
  const [create_paypal_payment_query] = useLazyQuery(create_paypal_payment, {
    fetchPolicy: "no-cache",
  });

  const continueRef = useRef<HTMLDivElement>(null);

  const [clickedContinue, setClickedContinue] = useState<boolean>(false);

  const [isGoodInputPhoneNumber, setIsGoodInputPhoneNumber] =
    useState<boolean>(false);

  const [redirectToPaymentProvider, setRedirectToPaymentProvider] =
    useState<boolean>(false);

  const navigate = useNavigate();
  const [cardElement, setCardElement] = useState<
    StripeCardElement | null | undefined
  >();
  // const stripe = useStripe();
  const [clientSecret, setClientSecret] = useState<string>("");

  const [changedClientSecret, setChangedClientSecret] = useState<number>(0);

  useEffect(() => {
    getClientSecretFunction();
    window.addEventListener("basket", () => {
      setChangedClientSecret(changedClientSecret + 1);
      getClientSecretFunction();
    });
    return () => {
      window.removeEventListener("basket", () => {});
    };
  }, [changedClientSecret]);

  const getClientSecretFunction = async () => {
    await getClientSecret().then((res) => {
      if (res.success) {
        setClientSecret(res.secret ? res.secret : "");
      }
    });
  };

  const [currentMethod, setCurrentMethod] = useState<boolean[]>([
    true,
    false,
    false,
    false,
    false,
  ]);

  const [currentCoin, setCurrentCoin] = useState<string>("");

  useEffect(() => {
    if (redirectToPaymentProvider) {
      setRedirectToPaymentProvider(false);
      if (currentMethod[0]) {
        setVisibleProcessing(true);
        setTitleProcessing(
          "Processing payment through Paypal. A new window will open..."
        );
        var basket: {
          _id: string;
          accessoryId?: string;
          selectedSize?: string | number;
          selectedColor?: string;
          quantity: number;
          customStyle?: File;
        }[] = [];
        bContext.product.forEach((item) => {
          basket.push({
            _id: item._id,
            accessoryId: item.selectedAccessory?._id,
            selectedSize: item.selectedSize,
            selectedColor: item.selectedColor,
            quantity: item.quantity,
            customStyle: item.customStyle,
          });
        });
        var addressOne = localStorage.getItem("addressOne");
        if (addressOne) {
          addressOne = JSON.parse(addressOne);
        }
        var addressTwo = localStorage.getItem("addressTwo");
        if (addressTwo) {
          addressTwo = JSON.parse(addressTwo);
        }
        fetch("https://ipapi.co/json/")
          .then((res) => res.json())
          .then((res) => {
            create_paypal_payment_query({
              variables: {
                basket,
                addressOne: addressOne,
                addressTwo: addressTwo,
                _id: aContext.userId,
                country_code: res.country_code,
              },
            })
              .then((res) => {
                console.log("paypal payment res is: ", res);
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {});
      }
    }
  }, [redirectToPaymentProvider, currentMethod]);

  // useEffect(() => {
  //   if (redirectToPaymentProvider) {
  //     if (currentMethod[0]) {
  //       setVisibleProcessing(true);
  //       setTitleProcessing(
  //         "Processing payment through Paypal. A new window will soon open..."
  //       );
  //       createPaypalPayment().then((res) => {
  //         if (res.success) {
  //           window.open(res.message);
  //           navigate("/orders");
  //         }
  //       });
  //     } else if (currentMethod[1]) {
  //       if (cardElement) {
  //         setVisibleProcessing(true);
  //         setTitleProcessing(
  //           "Processing card payment. Do not close this window."
  //         );
  //         stripe
  //           ?.confirmCardPayment(clientSecret, {
  //             payment_method: {
  //               card: cardElement,
  //             },
  //           })
  //           .then(({ paymentIntent }) => {
  //             if (paymentIntent?.status === "succeeded") {
  //               saveCardPaymentDB(paymentIntent).then(() => {
  //                 setFinished(true);
  //                 setTimeout(() => {
  //                   setVisibleProcessing(false);
  //                   navigate("/orders");
  //                   localStorage.removeItem("basket");
  //                 }, 3000);
  //               });
  //             }
  //           });
  //       }
  //     } else if (currentMethod[2]) {
  //     } else if (currentMethod[3]) {
  //       //Browser wallet crypto payment
  //       //Handle ethereum
  //       setVisibleProcessing(true);
  //       setTitleProcessing(
  //         "Processing payment with Ethereum through Meta Mask wallet."
  //       );
  //       calculateTotalCrypto().then(async (res) => {
  //         if (res.success) {
  //           const transactionParam = {
  //             nonce: "0x00",
  //             to: "0x8d60488fF61B46DC4Ef8e9e9D0e0328b61c6A971",
  //             from: (window as any).ethereum.selectedAddress,
  //             value: res.total,
  //             chainId: "0x3",
  //           };
  //           (window as any).ethereum.request({
  //             method: "eth_requestAccounts",
  //           });
  //           await (window as any).ethereum
  //             .request({
  //               method: "eth_sendTransaction",
  //               params: [transactionParam],
  //             })
  //             .then((res: any) => {
  //               setTitleProcessing(
  //                 "Payment was successful. This window will close in 3 seconds."
  //               );
  //               setTimeout(() => {
  //                 setVisibleProcessing(false);
  //                 localStorage.removeItem("basket");
  //               }, 3000);
  //             })
  //             .catch((error: any) => {
  //               if (error.code === 4001) {
  //                 setTitleProcessing(
  //                   "You have closed Meta Mask without paying, this window will close in 3 seconds."
  //                 );
  //                 setTimeout(() => {
  //                   setVisibleProcessing(false);
  //                 }, 3000);
  //               } else {
  //                 setTitleProcessing(
  //                   "Something went wrong while trying to process your payment, this window will close in 3 seconds."
  //                 );
  //                 setTimeout(() => {
  //                   setVisibleProcessing(false);
  //                 }, 3000);
  //               }
  //             });
  //         }
  //       });
  //     } else if (currentMethod[4]) {
  //       createCoinpaymentsPayment(currentCoin).then((res) => {
  //         if (res.success) {
  //           window.open(res.message);
  //           navigate("/orders");
  //           localStorage.removeItem("basket");
  //         }
  //       });
  //     }
  //   }
  //   return () => window.removeEventListener("paymentSuccess", () => {});
  // }, [
  //   redirectToPaymentProvider,
  //   cardElement,
  //   clientSecret,
  //   currentMethod,
  //   navigate,
  //   stripe,
  // ]);

  const [activeDropdown, setActiveDropdown] = useState<boolean[]>([
    false,
    false,
  ]);
  const [visibleProcessing, setVisibleProcessing] = useState<boolean>(false);
  const [titleProcesing, setTitleProcessing] = useState<string>("");
  const [finished, setFinished] = useState<boolean>(false);

  const phoneNumberRef = useRef<HTMLDivElement>(null);

  return (
    <div className="checkout">
      <ProcessingPayment
        visible={visibleProcessing}
        type={titleProcesing}
        finished={finished}
      />
      {paid === undefined ? (
        <HeaderCheckout
          setChosenAction={setChosenAction}
          setClickedLogin={setClickedLogin}
        />
      ) : (
        ""
      )}
      {checkout ? (
        <ProgressCheckout progress="checkout" />
      ) : payment ? (
        <ProgressCheckout progress="payment" />
      ) : (
        ""
      )}
      {!payment && setAmount && paid === undefined ? (
        <CheckoutBody
          setAmount={setAmount}
          clickedContinue={clickedContinue}
          setClickedContinue={setClickedContinue}
          setBasket={setBasket}
        />
      ) : paid === undefined ? (
        <PaymentBody
          isGoodInputPhoneNumber={isGoodInputPhoneNumber}
          setIsGoodInputPhoneNumber={setIsGoodInputPhoneNumber}
          setCurrentCoin={setCurrentCoin}
          currentMethod={currentMethod}
          setCurrentMethod={setCurrentMethod}
          setCardElement={setCardElement}
          setActiveDropdown={setActiveDropdown}
          activeDropdown={activeDropdown}
          setAmount={setAmount}
          phoneNumberRef={phoneNumberRef}
        />
      ) : paid === true ? (
        <PaymentSuccess />
      ) : (
        <PaymentFailure />
      )}
      {paid === undefined ? (
        checkout ? (
          <ContinueCheckout
            refProp={continueRef}
            setClickedContinue={setClickedContinue}
            continueText={"Continue to payment method"}
            setRedirectToPaymentProvider={setRedirectToPaymentProvider}
          />
        ) : (
          <ContinueCheckout
            refProp={continueRef}
            setClickedContinue={setClickedContinue}
            continueText={"Order and pay now"}
            redirectToPaymentProvider={true}
            setRedirectToPaymentProvider={setRedirectToPaymentProvider}
            isGoodInputPhoneNumber={isGoodInputPhoneNumber}
            phoneNumberRef={phoneNumberRef}
          />
        )
      ) : (
        ""
      )}
      {paid === undefined ? <FooterCheckout /> : ""}
    </div>
  );
}

export default Checkout;
