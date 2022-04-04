import React from "react";
import "../styles/Comp-Single/CartItem.css";

function CartItem({
  background,
  title,
  subtitle,
  price,
  quantity
}: {
  background: string;
  title: string;
  subtitle: string;
    price: string | { full: string; discount: string };
    quantity: number;
}) {
  return (
    <div className="cartItem">
      <img src={background} alt={background} />
      <div className="cartItem__text">
        <span>{title}</span>
        <span>{subtitle}</span>
        <span>Quantity: { quantity}</span>
      </div>
      <span>$ {typeof price === "string" ? price : price.discount}</span>
    </div>
  );
}

export default CartItem;
