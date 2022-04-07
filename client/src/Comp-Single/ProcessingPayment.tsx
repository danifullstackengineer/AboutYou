import "../styles/Comp-Single/ProcessingPayment.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function ProcessingPayment({
  type,
  visible,
  finished,
}: {
  type: string;
  visible: boolean;
  finished: boolean;
}) {
  return (
    <div
      className="processingPayment"
      style={{
        opacity: visible ? 1 : 0,
        visibility: visible ? "visible" : "hidden",
      }}
    >
      <span>{type}</span>
      {!finished ? (
        <div>
          <AiOutlineLoading3Quarters />
        </div>
      ) : type ? (
        <div className="processingPayment__finished">
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default ProcessingPayment;
