import React, { useState } from 'react'
import '../styles/Comp-Single/ProductCustom.css';
import { ProductType } from '../types/Product';

const ProductCustom = ({product, dark}: {product: ProductType, dark?:boolean}) => {

  const [isHovering, setIsHovering] = useState<boolean>(false);

  return (
    <div className={`productCustom ${dark ? "productCustom-dark" : "productCustom-light"}`} onMouseOver={()=> setIsHovering(true)} onMouseLeave={()=> setIsHovering(false)}>
      <div className={`productCustom__img`}>
        <img src={!dark ? product.backgroundImg + "1.jpg" : product.backgroundImg} alt={""} loading={"lazy"}/>
        <img src={!dark ? product.foregroundImg + "10.jpg" : product.foregroundImg} alt={""} loading={"lazy"}/>
      </div>
      <h3>{product.title}</h3>
      <h4>Only: ${product.price}</h4>
      <button>Customize!</button>
    </div>
  )
}

export default React.memo(ProductCustom);