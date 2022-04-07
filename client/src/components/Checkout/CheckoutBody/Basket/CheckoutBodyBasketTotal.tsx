import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { getVoucher } from "../../../../Apollo/Voucher";
import "../../../../styles/components/Checkout/CheckoutBody/Basket/CheckoutBodyBasketTotal.css";

function CheckoutBodyBasketTotal({
  basket,
  setAmount,
  payment,
}: {
  basket:
    | {
        backgroundImg: string;
        foregroundImg?: string | undefined;
        tags?:
          | {
              name: string;
              special?: boolean | undefined;
            }[]
          | undefined;
        title: string;
        price: string;
        priceDiscount: { full: string; discount: string };
        colors: string[];
        sizes?: string[] | undefined;
        quantity: number;
      }[]
    | undefined;
  setAmount?: React.Dispatch<React.SetStateAction<string>>;
  payment?: true;
}) {
  const getTotalAfterDiscount = (
    basket:
      | {
          backgroundImg: string;
          foregroundImg?: string | undefined;
          tags?:
            | {
                name: string;
                special?: boolean | undefined;
              }[]
            | undefined;
          title: string;
          price: string;
          priceDiscount: { full: string; discount: string };
          colors: string[];
          sizes?: string[] | undefined;
          quantity: number;
        }[]
      | undefined,
    discount?: boolean
  ) => {
    if (basket) {
      var total = 0;
      for (let i = 0; i < basket.length; i++) {
        if (basket[i].price) {
          total += basket[i].quantity * parseFloat(basket[i].price);
        } else {
          total +=
            basket[i].quantity * parseFloat(basket[i].priceDiscount.discount);
        }
      }
      var result = total.toFixed(2);
      if (isValidVoucher && discount) {
        result = ((total / 100) * (100 - data.getVoucher.value)).toFixed(2);
      }
      return result;
    } else {
      return "0.00";
    }
  };

  const [voucher, setVoucher] = useState<string>();

  const [getVoucherQuery, { data, error }] = useLazyQuery(getVoucher, {
    variables: {
      voucher: voucher,
    },
  });

  useEffect(() => {
    const voucher = localStorage.getItem("voucher");
    if (voucher) {
      setVoucher(voucher);
    }
  }, []);

  useEffect(() => {
    if (voucher) {
      getVoucherQuery();
    }
  }, [voucher]);
  useEffect(() => {
    if (data) {
      const isValid = data.getVoucher.endDate - new Date().getTime();
      if (isValid > 0) {
        setIsValidVoucher(true);
      } else {
        setIsValidVoucher(false);
      }
    }
  }, [data]);

  useEffect(() => {
    if (basket && setAmount) {
      setAmount(getTotalAfterDiscount(basket));
    }
  }, [basket, setAmount]);

  const [isValidVoucher, setIsValidVoucher] = useState<boolean>(false);

  return (
    <div className="checkoutBodyBasketTotal">
      <div className="checkoutBodyBasketTotal__upper">
        <h5>Shopping fees</h5>
        <h5>$ 0.00</h5>
      </div>
      <div className="checkoutBodyBasketTotal__lower">
        <h3>Total sum</h3>
        {isValidVoucher ? (
          <div>
            <h3>$ {getTotalAfterDiscount(basket)} </h3>
            <h3>$ {getTotalAfterDiscount(basket, true)}</h3>
          </div>
        ) : (
          <h3>$ {getTotalAfterDiscount(basket)} </h3>
        )}
      </div>
    </div>
  );
}

export default CheckoutBodyBasketTotal;
