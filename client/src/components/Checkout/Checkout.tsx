import React from 'react'
import '../../styles/components/Checkout/Checkout.css';
import CheckoutBody from './CheckoutBody'
import FooterCheckout from './FooterCheckout'
import HeaderCheckout from './HeaderCheckout'
import ProgressCheckout from './ProgressCheckout'

function Checkout() {
  return (
      <div className="checkout">
          <HeaderCheckout />
          <ProgressCheckout />
          <CheckoutBody />
          <FooterCheckout/>
    </div>
  )
}

export default Checkout