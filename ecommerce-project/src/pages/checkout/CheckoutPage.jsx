import axios from 'axios'
import { useState, useEffect } from 'react'
import { OrderSummary } from './OrderSummary'
import { PaymentSummary } from './PaymentSummary'
import './checkout-header.css'
import './CheckoutPage.css'
import { CheckoutHeader } from './CheckoutHeader'


export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);

  useEffect(() => {
    const fetchCheckoutData  = async () => {
      let response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
        setDeliveryOptions(response.data);
    };
    fetchCheckoutData();
  }, []);

  return (
    <>
      <title>Checkout</title>

      <CheckoutHeader cart={cart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart} />
          <PaymentSummary loadCart={loadCart} cart={cart} />
        </div>
      </div>
    </>
  )
}