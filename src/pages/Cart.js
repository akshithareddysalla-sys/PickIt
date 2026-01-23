import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import "../styles/cart.scss";

export default function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useContext(CartContext);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div style={{ padding: "40px" }}>
      <h2>Your Cart</h2>

      {cart.length === 0 && <p>Your cart is empty</p>}
      {cart.map(item => (
        <div key={item.id} className="cart-item">
    
          <img src={item.image} alt="product" style={{ width: "70px" }} />

          <div style={{ flex: 1 }}>
            <h4>{item.title}</h4>
            <p>${item.price}</p>
          </div>

          <div className="qty-controls">
            <button className="qty-btn" onClick={() => decreaseQty(item.id)}>-</button>
            <strong>{item.qty}</strong>
            <button className="qty-btn" onClick={() => increaseQty(item.id)}>+</button>
          </div>
    <p>${(item.price * item.qty).toFixed(2)}</p>

    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
      Remove
    </button>

  </div>
))}


      {cart.length > 0 && (
        <>
          <h3>Total: ${total.toFixed(2)}</h3>
          <Link to="/checkout">
            <button className="primary-btn">Proceed to Checkout</button>
          </Link>
        </>
      )}
    </div>
  );
}

