import { useState } from "react";
import "../../../styles/components/UserInformation/TypeInformation/Help.css";
import HelpTopicSquare from "./Help/HelpTopicSquare";
import { AiOutlineSearch } from "react-icons/ai";
import HelpOption from "./Help/HelpOptions";
import { useWindowDimensions } from "../../../Hooks/Viewport";
import HelpFAQ from "./Help/HelpFAQ";

function Help() {
  const [browseInput, setBrowseInput] = useState<string>("");
  const { width } = useWindowDimensions();

  return (
    <div className="help">
      <div className="help__header">
        <h5>Help section</h5>
        <h2>How may we help you?</h2>
        <div className="help__header-input-container">
          <input
            type="text"
            placeholder="Browse help topics"
            value={browseInput}
            onChange={(e) => setBrowseInput(e.target.value)}
          />
          <span>
            <AiOutlineSearch />
          </span>
        </div>
        <div className="help__header-options">
          <HelpTopicSquare text={"How long is the shipping time?"} />
          <HelpTopicSquare text={"How can I track my order?"} />
          <HelpTopicSquare text={"How do I ship a return order?"} />
          <HelpTopicSquare text={"What do SEPA, IBAN and BIC stand for?"} />
          <HelpTopicSquare
            text={
              "How long does it usually take for the reimbursement to take place?"
            }
          />
        </div>
      </div>
      {width <= 768 ? (
        <>
          <h2>Frequently asked questions</h2>
          <div className="help__faq">
            <HelpFAQ
              title={"How long is the shipping time?"}
              link={"/help/delivery/query?question=1"}
            />
            <HelpFAQ
              title={"How can I track my order?"}
              link={"/help/delivery/query?question=2"}
            />
            <HelpFAQ
              title={"How do I ship a return order?"}
              link={"/help/return/query?question=1"}
            />
            <HelpFAQ
              title={"What do SEPA, IBAN and BIC stand for?"}
              link={"/help/payment/query?question=1"}
            />
            <HelpFAQ
              title={
                "How long does it usually take for the reimbursement to take place?"
              }
              link={"/help/return/query?question=2"}
            />
          </div>
        </>
      ) : (
        ""
      )}
      <h2>Immediate answers - sorted by topic</h2>
      <div className="help__options">
        <div>
          <HelpOption
            icon={"/assets/help/corona.svg"}
            title={"About Corona Information"}
            links={[
              {
                link: "/help/corona/query?question=1",
                info: "Which measures is ABOUT YOU taking generally?",
              },
              {
                link: "/help/corona/q=2",
                info: "What are the current delivery times?",
              },
              {
                link: "/help/corona/q=3",
                info: "Can my parcel be delivered at the door?",
              },
            ]}
            buttonLink={"/help/corona"}
          />
          <HelpOption
            icon={"/assets/help/account.svg"}
            title={"My Account"}
            links={[
              {
                link: "/help/account/query?question=1",
                info: "Can I alter my data by myself",
              },
              {
                link: "/help/account/query?question=2",
                info: "Does it cost money to register for an account?",
              },
              {
                link: "/help/account/query?question=3",
                info: "How can I delete my customer account?",
              },
            ]}
            buttonLink={"/help/account"}
          />
          <HelpOption
            icon={"/assets/help/basket.svg"}
            title={"Order"}
            links={[
              {
                link: "/help/order/query?question=1",
                info: "How can I place an order?",
              },
              {
                link: "/help/order/query?question=2",
                info: "How can I check my previous orders?",
              },
              {
                link: "/help/order/query?question=3",
                info: "Can I order from abroad?",
              },
            ]}
            buttonLink={"/help/order"}
          />
          <HelpOption
            icon={"/assets/help/payment.svg"}
            title={"Payment"}
            links={[
              {
                link: "/help/payment/query?question=1",
                info: "What do SEPA, IBAN and BIC stand for?",
              },
              {
                link: "/help/payment/query?question=2",
                info: "Where is the CVC on my credit card?",
              },
              {
                link: "/help/payment/query?question=3",
                info: "How is the VAT displayed?",
              },
            ]}
            buttonLink={"/help/payment"}
          />
          <HelpOption
            icon={"/assets/help/gift.svg"}
            title={"Vouchers & Gift Cards"}
            links={[
              {
                link: "/help/gift/query?question=1",
                info: "Where can I purchase gift cards?",
              },
              {
                link: "/help/gift/query?question=2",
                info: "How do I redeem my voucher?",
              },
            ]}
            buttonLink={"/help/gift"}
          />
          <HelpOption
            icon={"/assets/help/delivery.svg"}
            title={"Shipping & Delivery"}
            links={[
              {
                link: "/help/delivery/query?question=1",
                info: "How long is the shipping time?",
              },
              {
                link: "/help/delivery/query?question=2",
                info: "How can I track my order?",
              },
              {
                link: "help/delivery/query?question=3",
                info: "How can I check wheter I have placed my order correctly?",
              },
            ]}
            buttonLink={"/help/delivery"}
          />
          <HelpOption
            icon={"/assets/help/return.svg"}
            title={"Return & Refund"}
            links={[
              {
                link: "/help/return/query?question=1",
                info: "How do I ship a return order?",
              },
              {
                link: "/help/return/query?question=2",
                info: "How long does it usually take for the reimbursement to take place?",
              },
              {
                link: "/help/return/query?question=3",
                info: "Is a direct replacement of the return item possible?",
              },
            ]}
            buttonLink={"/help/return"}
          />
          <HelpOption
            icon={"/assets/help/other.svg"}
            title={"Other"}
            links={[
              {
                link: "/help/other/query?question=1",
                info: "How do I find the right size or fit?",
              },
              {
                link: "/help/other/query?question=2",
                info: "How can I activate cookies?",
              },
              {
                link: "/help/other/query?question=3",
                info: "How can I subscribe to the newsletter?",
              },
            ]}
            buttonLink={"/help/other"}
          />
        </div>
      </div>
    </div>
  );
}

export default Help;
