import { formatMoney } from "../../utils/money";
import { useState } from "react";
import axios from "axios";

export function CartItemDetails({ cartItem, loadCart }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  return (
    <>
      <img className="product-image"
        src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">
          {cartItem.product.name}
        </div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:
            {isUpdating ? (
              <input type="number" className="quantity-input" 
              value={quantity} 
              onChange={(e) => {setQuantity(e.target.value)}}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {(async () => {
                  await axios.put(`/api/cart-items/${cartItem.productId}`, { quantity: Number(quantity) });
                  await loadCart();
                  setIsUpdating(false);
                })() } else if (e.key === 'Escape') {
                  setIsUpdating(false);
                  setQuantity(cartItem.quantity);
                }
              }} />
            ) : (
              <span className="quantity-label">
                {cartItem.quantity}
              </span>
            )}
          </span>
          <span className="update-quantity-link link-primary" onClick={
            isUpdating ?
              async () => {
                await axios.put(`/api/cart-items/${cartItem.productId}`, { quantity: Number(quantity) });
                await loadCart();
                setIsUpdating(false);
              } : () => setIsUpdating(true)}>
            Update
          </span>
          <span className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  )
}