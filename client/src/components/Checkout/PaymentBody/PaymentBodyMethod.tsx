import React, { useEffect, useState } from "react";
import PaymentMethod from "../../../Comp-Single/PaymentMethod";
import "../../../styles/components/Checkout/PaymentBody/PaymentBodyMethod.css";

function PaymentBodyMethod({
  currentMethod,
  setCurrentMethod,
  setActiveDropdown,
  activeDropdown,
  setCurrentCoin,
}: {
  currentMethod: boolean[];
  setCurrentMethod: React.Dispatch<React.SetStateAction<boolean[]>>;
  setActiveDropdown: React.Dispatch<React.SetStateAction<boolean[]>>;
  activeDropdown: boolean[];
  setCurrentCoin: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [currency, setCurrency] = useState<
    { name: string; icon: string; active: boolean }[]
  >([
    { name: "BTC", icon: "/assets/svg/bitcoin.svg", active: false },
    { name: "ETH", icon: "/assets/svg/ethereum.svg", active: false },
    { name: "LTC", icon: "/assets/svg/ltc.svg", active: false },
    { name: "DOGE", icon: "/assets/svg/doge.svg", active: false },
    { name: "USDC", icon: "/assets/svg/usdc.svg", active: false },
    { name: "DAI", icon: "/assets/svg/dai.svg", active: false },
    { name: "SOL", icon: "/assets/svg/sol.svg", active: false },
    { name: "BNB", icon: "/assets/svg/bnb.svg", active: false },
    { name: "DASH", icon: "/assets/svg/dash.svg", active: false },
    { name: "ZEC", icon: "/assets/svg/zcash.svg", active: false },
  ]);

  const handleCoinChoose = (i: number): void => {
    const newCur = [];
    setCurrentCoin(currency[i].name);
    for (let index = 0; index < currency.length; index++) {
      if (index === i) {
        newCur.push({
          name: currency[index].name,
          icon: currency[index].icon,
          active: true,
        });
      } else {
        newCur.push({
          name: currency[index].name,
          icon: currency[index].icon,
          active: false,
        });
      }
    }
    setCurrency(newCur);
  };

  return (
    <div className="paymentBodyMethod">
      <PaymentMethod
        type={"paypal"}
        active={currentMethod[0]}
        icon="/assets/svg/paypal.svg"
        info={{
          infoTitle: "The benefits of PayPal",
          infoDescription:
            "You do not need to have an existing PayPal account. You can simply create a new one that you will be redirected to after confirmation of your order",
        }}
        setCurrentMethod={setCurrentMethod}
      />
      <PaymentMethod
        type="card"
        active={currentMethod[1]}
        icon={"/assets/svg/card.svg"}
        info={{
          infoTitle: "Benefits of paying by debit or credit card",
          infoDescription:
            "Make safe and convenient payments on our website with VISA or MasterCard. After confirmation of your order, you will be asked to enter your debit or credit card information. Your card will only be charged once the items have left our warehouse.",
        }}
        setCurrentMethod={setCurrentMethod}
      />
      <PaymentMethod
        type="third-party"
        active={currentMethod[2]}
        icon={"/assets/svg/binance.svg"}
        info={{
          infoTitle: "Benefits of paying through Binance",
          infoDescription:
            "Some description about paying with binance service.",
        }}
        setCurrentMethod={setCurrentMethod}
      />
      <PaymentMethod
        type="wallet"
        active={currentMethod[3]}
        icon={"/assets/svg/metamask.svg"}
        info={{
          infoTitle: "Benefits of paying through your wallet extension",
          infoDescription:
            "Some description about paying with your wallet extension.",
        }}
        setCurrentMethod={setCurrentMethod}
      />
      <PaymentMethod
        type="manual"
        active={currentMethod[4]}
        info={{
          infoTitle: "Benefits of paying by manual crypto transfer",
          infoDescription:
            "You have complete access through the transaction, and don't need to rely on a third-party.",
        }}
        setCurrentMethod={setCurrentMethod}
      />
      <div
        className={`paymentBodyMethod__manual-dropdown ${
          currentMethod[4] ? "paymentBodyMethod__manual-dropdown-show" : ""
        }`}
      >
        <div>
          {currency.map((cur, i) => {
            return (
              <div
                className={
                  cur.active ? "paymentBodyMethod__manual-dropdown-active" : ""
                }
                key={i}
                onClick={() => handleCoinChoose(i)}
              >
                <img src={cur.icon} alt={cur.icon} />
                <span>{cur.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PaymentBodyMethod;
