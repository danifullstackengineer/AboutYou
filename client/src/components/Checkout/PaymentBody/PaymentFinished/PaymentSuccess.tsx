import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { executePaypalPayment } from "../../../../API/Payment";
import ProcessingPayment from "../../../../Comp-Single/ProcessingPayment";

function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);
    
    const [type, setType] = useState<string>('Awaiting payment confirmation...Do not close window.');
    const [finished, setFinished] = useState<boolean>(false);

  useEffect(() => {
    const query = window.location.search;
    executePaypalPayment(query).then(
      (res: { success: boolean; message: string }) => {
            if (res.success) {
                setType("Payment received. Window will close in 3 seconds...")
                setFinished(true);
                localStorage.removeItem("basket");
            }
            else {
                setType(res.message + ". Window will close in 3 seconds...")
                setFinished(true);
            }
            setTimeout(() => {
                window.close();
            }, 3000)
      }
    );
  }, []);

    return <ProcessingPayment type={type} visible={true} finished={finished}/>
}

export default PaymentSuccess;
