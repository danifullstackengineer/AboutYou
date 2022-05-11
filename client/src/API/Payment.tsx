import $ from "jquery";
import {
  getFirstAddress,
  getSecondAddress,
} from "../Logic/localStorage/address";
import { getIdStorage } from "../Logic/localStorage/user";

const createPaypalPayment = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  var result = {
    success: false,
    message:
      "Something went wrong while creating a pay request, please try again.",
  };
  await $.ajax({
    url: "/createPaypalPayment",
    type: "POST",
    data: {
      // basket: getBasketItemsStorage(),
      address: {
        firstAddress: getFirstAddress(),
        secondAddress: getSecondAddress(),
      },
      id: getIdStorage(),
      // discount: getVoucherStorage()
    },
  })
    .then((res: { success: boolean; message: string }) => {
      result = res;
    })
    .catch(() => {
      result = {
        success: false,
        message:
          "Something went wrong while creating a pay request, please try again.",
      };
    });
  return result;
};

const executePaypalPayment = async (
  pathname: string
): Promise<{ success: boolean; message: string }> => {
  var result = {
    success: false,
    message:
      "Something went wrong while processing the payment, please try again.",
  };
  await $.ajax({
    url: `/executePaypalPayment/${pathname}`,
    type: "GET",
  })
    .then((res: { success: boolean; message: string }) => {
      result = res;
    })
    .catch((err: { success: boolean; message: string }) => {
      result = err;
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
      // basket: getBasketItemsStorage(),
      // discount: getVoucherStorage()
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
      // basket: getBasketItemsStorage(),
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
      // basket: getBasketItemsStorage(),
      // discount: getVoucherStorage()
    },
  }).then((res: { success: boolean; message: string; total?: string }) => {
    result = res;
  });

  return result;
};

const createCoinpaymentsPayment = async (
  coin: string
): Promise<{
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
      // basket: getBasketItemsStorage(),
      coin: coin,
      // discount: getVoucherStorage()
    },
  }).then((res: { success: boolean; message: string }) => (result = res));

  return result;
};
export {
  createPaypalPayment,
  executePaypalPayment,
  getClientSecret,
  saveCardPaymentDB,
  calculateTotalCrypto,
  createCoinpaymentsPayment,
};
