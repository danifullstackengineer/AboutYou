import React, { useState } from "react";
import InputForm from "../../Comp-Single/InputForm";
import InteractiveBtn from "../../Comp-Single/InteractiveBtn";
import "../../styles/components/Footer/ThirdFooter.css";

function ThirdFooter() {
  const [selectedOption, setSelectedOption] = useState<boolean[]>([
    true,
    false,
  ]);

  return (
    <div className="thirdFooter">
      <footer>
        <h1>Don't miss a thing!</h1>
        <h3>Sign up for the newsletter and receive exclusive offers</h3>
        <div className="thirdFooter__option">
          <div
            className={`thirdFooter__option-select ${
              selectedOption[0] ? "thirdFooter__option-select-selected" : ""
            }`}
            onClick={() => setSelectedOption([true, false])}
          >
            <div className="thirdFooter__option-select-btn">
              <div></div>
            </div>
            <div className="thirdFooter__option-select-text">For women</div>
          </div>
          <div
            className={`thirdFooter__option-select ${
              selectedOption[1] ? "thirdFooter__option-select-selected" : ""
            }`}
            onClick={() => setSelectedOption([false, true])}
          >
            <div className="thirdFooter__option-select-btn">
              <div></div>
            </div>
            <div className="thirdFooter__option-select-text">For men</div>
          </div>
        </div>
        <InputForm
          border={[10, 0, 30, 0]}
          width={700}
          height={40}
          placeholder={"Your email address"}
          type={"text"}
        />
        <InteractiveBtn text={"Sign up"} width={150} height={50} margin={[0,0,25,0]} />
        <span className="thirdFooter__sign-up-agree">
          I would like to receive email updates on current trends, offers and
          vouchers.
        </span>
        <span className="thirdFooter__sign-up-agree">
          Unsubscribe any time, free of charge.
        </span>
      </footer>
    </div>
  );
}

export default ThirdFooter;
