import React from "react";
import "../styles/Comp-Single/CartItem.css";

function CartItem({
  background,
  title,
  subtitle,
  price,
}: {
  background: string;
  title: string;
  subtitle: string;
  price: string | { full: string; discount: string };
}) {
  return (
    <div className="cartItem">
      <img src={background} alt={background} />
      <div className="cartItem__text">
        <span>{title}</span>
        <span>{subtitle}</span>
      </div>
      <span>$ {typeof price === "string" ? price : price.discount}</span>
    </div>
  );
}

export default CartItem;
