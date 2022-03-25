import React from "react";
import '../styles/Comp-Single/ItemCount.css';

function ItemCount({ number }: { number: number }) {
    return <div className="itemCount">
      {number}
  </div>;
}

export default ItemCount;
