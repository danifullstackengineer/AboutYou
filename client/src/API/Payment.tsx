import $ from "jquery";
import {
  getFirstAddress,
  getSecondAddress,
} from "../Logic/localStorage/address";
import { getBasketItemsStorage } from "../Logic/localStorage/basket";
import { getIdStorage } from "../Logic/localStorage/user";
import cryptoType from "../types/crypto";

const createCryptoPayment = async (amount: number, type: cryptoType) => {
  await $.ajax({
    url: "/createCryptoPayment",
    type: "POST",
    data: { amount },
  })
    .then((res: any) => {})
    .catch((err: any) => {});
};

const createPaypalPayment = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  var result = {
    success: false,
    message:
      "Something went wrong while creating a pay request, please try again!",
  };
  await $.ajax({
    url: "/createPaypalPayment",
    type: "POST",
    data: {
      basket: getBasketItemsStorage(),
      address: {
        firstAddress: getFirstAddress(),
        secondAddress: getSecondAddress(),
      },
      id: getIdStorage(),
    },
  })
    .then((res: { success: boolean; message: string }) => {
      result = res;
    })
    .catch(() => {
      result = {
        success: false,
        message:
          "Something went wrong while creating a pay request, please try again!",
      };
    });
  return result;
};

const getClientSecret = async (): Promise<{
  success: boolean;
  message: string;
  secret?: string;
}> => {
  var result = {
    success: false,
    message:
      "Something went wrong while creating a pay request, please try again!",
  };
  await $.ajax({
    type: "POST",
    url: "/createStripeSecret",
    data: {
      id: getIdStorage(),
      basket: getBasketItemsStorage(),
    },
  })
    .then((res: { success: boolean; message: string; secret?: string }) => {
      result = res;
    })
    .catch((err: any) => {
      console.log(err);
    });
  return result;
};

const saveCardPaymentDB = async (
  paymentIntent: any
): Promise<{ success: boolean; message: string }> => {
  var result = {
    success: false,
    message: "Something went wrong while saving the order in the database.",
  };
  await $.ajax({
    url: "/createStripePayment",
    type: "POST",
    data: {
      id: getIdStorage(),
      basket: getBasketItemsStorage(),
      paymentIntent: paymentIntent,
    },
  }).then((res: { success: boolean; message: string }) => {
    result = res;
  });
  return result;
};

const calculateTotalCrypto = async (): Promise<{
  success: boolean;
  message: string;
  total?: string;
}> => {
  var result = {
    success: false,
    message: "Something went wrong, please try again.",
  };
  await $.ajax({
    url: "/getTotalCrypto",
    type: "POST",
    data: {
      basket: getBasketItemsStorage(),
    },
  }).then((res: { success: boolean; message: string; total?: string }) => {
    result = res;
  });

  return result;
};

const createCoinpaymentsPayment = async (coin: string): Promise<{
  success: boolean;
  message: string;
}> => {
  var result = {
    success: false,
    message: "Something went wrong, please try again.",
  };

  await $.ajax({
    url: "/createCoinpaymentsPayment",
    type: "POST",
    data: {
      basket: getBasketItemsStorage(),
      coin: coin
    },
  }).then((res: { success: boolean; message: string }) => (result = res));

  return result;
};

export {
  createCryptoPayment,
  createPaypalPayment,
  getClientSecret,
  saveCardPaymentDB,
  calculateTotalCrypto,
  createCoinpaymentsPayment
};
