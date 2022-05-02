import React, { useState } from 'react'
import '../styles/Comp-Single/ProductCustom.css';
import { ProductType } from '../types/Product';

const ProductCustom = ({product}: {product: ProductType}) => {

  const [isHovering, setIsHovering] = useState<boolean>(false);

  return (
    <div className="productCustom" onMouseOver={()=> setIsHovering(true)} onMouseLeave={()=> setIsHovering(false)}>
      <div className={`productCustom__img`}>
        <img src={product.backgroundImg + "1.jpg"} alt={""} loading={"lazy"}/>
        <img src={product.foregroundImg + "10.jpg"} alt={""} loading={"lazy"}/>
      </div>
      <h3>{product.title}</h3>
      <h4>Only: ${product.price}</h4>
      <button>Customize!</button>
    </div>
  )
}

export default ProductCustom