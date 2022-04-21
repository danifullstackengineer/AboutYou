import React, { useEffect, useRef, useState } from "react";
import "../styles/Comp-Single/Product360.css";

function Product360({
  image,
  mode,
    setCurrentImage,
  mouse
}: {
  image: string;
  mode: boolean | undefined;
        setCurrentImage: React.Dispatch<React.SetStateAction<string>>;
  mouse:any
    }) {
    

  return (
    <div className="product360">
      <img src={image} alt={""}/>
    </div>
  );
}

export default Product360;
