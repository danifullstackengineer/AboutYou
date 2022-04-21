import { useEffect, useState } from "react";
import "../../../../styles/components/Checkout/PaymentBody/PaymentBodyInfo/PaymentBodyInfoVoucher.css";
import { useLazyQuery } from "@apollo/client";
import { getVoucher } from "../../../../Apollo/Voucher";

function PaymentBodyInfoVoucher() {
  const [input, setInput] = useState<string>("");
  const [validLength, setValidLength] = useState<boolean>(false);
  const [calledQuery, setCalledQuery] = useState<boolean>(false);

  const [getVoucherQuery, { data, loading, error }] = useLazyQuery(getVoucher, {
    variables: {
      voucher: input,
    },
  });

  const [message, setMessage] = useState<string>();

  useEffect(() => {
    if (input.length >= 4) {
      setValidLength(true);
    } else {
      setValidLength(false);
    }
  }, [input]);

  const handleCodeSubmit = (): void => {
    if (validLength) {
      getVoucherQuery();
      setCalledQuery(true);
    }
    window.dispatchEvent(new Event("voucher"))
  };

  useEffect(() => {
    if (error) {
      setMessage("Something went wrong, please try again.");
    }
  }, [error]);
  useEffect(() => {
    if (data) {
      if (data.getVoucher) {
        const valid = data.getVoucher.endDate - new Date().getTime();
        if (valid > 0) {
          localStorage.setItem("voucher", input);
          setMessage(
            `Voucher succesfully applied. You now benefit from a ${data.getVoucher.value}% discount.`
          );
        }
      } else {
        setMessage(
          "This voucher does not exist or has been deactivated. Please verify your voucher code."
        );
      }
    } else if (calledQuery) {
      setMessage(
        "This voucher does not exist or has been deactivated. Please verify your voucher code."
      );
    }
  }, [data]);

  return (
    <>
      <div
        className={`paymentBodyInfoVoucher ${
          loading || data || error ? "paymentBodyInfoVoucher-loading" : ""
        }`}
      >
        <div className="paymentBodyInfoVoucher__info">
          Would you like to redeem a voucher?
        </div>
        <div>
          <div>
            <input
              type="text"
              placeholder="Voucher code"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <button
            className={validLength ? "paymentBodyInfoVoucher__valid-btn" : ""}
            type="button"
            onClick={handleCodeSubmit}
          >
            Redeem
          </button>
        </div>
      </div>
      <div
        className={`paymentBodyInfoVoucher-message ${
          calledQuery ? "paymentBodyInfoVoucher-message-show" : ""
        }`}
      >
        {message}
      </div>
    </>
  );
}

export default PaymentBodyInfoVoucher;
