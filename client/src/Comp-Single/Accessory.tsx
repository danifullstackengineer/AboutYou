import React, { useState } from 'react'
import '../styles/Comp-Single/Accessory.css';
import  { AccessoryType } from '../types/Accessory';


const Accessory = ({accessory}: {accessory: AccessoryType}) => {

  const [isHovering, setIsHovering] = useState<boolean>(false);

  return (
    <div className={`accessory`} onMouseOver={()=> setIsHovering(true)} onMouseLeave={()=> setIsHovering(false)}>
      <div className={`accessory__img`}>
        <img src={accessory.image} alt={""} loading={"lazy"}/>
      </div>
      <h3>{accessory.title}</h3>
      <h4>Only: ${accessory.price}</h4>
      <button>Customize!</button>
    </div>
  )
}

export default React.memo(Accessory);