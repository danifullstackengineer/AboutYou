import { useState } from "react";
import InteractiveBtn from "../../../Comp-Single/InteractiveBtn";
import "../../../styles/components/UserInformation/TypeInformation/Orders.css";

function Orders() {
  const [orders, setOrders] = useState();

  return (
    <div className="orders">
      <h2>Orders</h2>
      {orders ? (
        <div className="orders__content"></div>
      ) : (
        <div className="orders__no-orders">
          <img
            src="/assets/png/empty-cart.png"
            alt="/assets/png/empty-cart.png"
          />
          <div className="orders__no-orders-info">
            <h4>You do not have any orders yet</h4>
            <h5>Discover our entire range and place your delivery</h5>
          </div>
        </div>
      )}
      <InteractiveBtn
        width={420}
        height={50}
        text={"Discover our range and shop away"}
        type="button"
      />
    </div>
  );
}

export default Orders;
