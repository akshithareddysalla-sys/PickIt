import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/checkout.scss";

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [address, setAddress] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    phone: ""
  });

  // Load saved address
  useEffect(() => {
    const savedAddress = localStorage.getItem("pickit_address");
    if (savedAddress) {
      setAddress(JSON.parse(savedAddress));
    }
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  function handleChange(e) {
    setAddress({ ...address, [e.target.name]: e.target.value });
  }

  function saveOrder() {
    const previousOrders =
      JSON.parse(localStorage.getItem("pickit_orders")) || [];

    const newOrder = {
      id: Date.now(),
      items: cart,
      total,
      date: new Date().toLocaleString()
    };

    localStorage.setItem(
      "pickit_orders",
      JSON.stringify([newOrder, ...previousOrders])
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Save address
    localStorage.setItem("pickit_address", JSON.stringify(address));
    saveOrder();
    clearCart();

    setOrderPlaced(true);
  }

  if (orderPlaced) {
    return (
      <div className="checkout-success">
        <h2>🎉 Your PickIt order is confirmed!</h2>
        <p>Your address has been saved for future orders.</p>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      {localStorage.getItem("pickit_address") && (
        <button
          type="button"
          className="edit-address-btn"
          onClick={() =>
            setAddress({
              name: "",
              email: "",
              address: "",
              city: "",
              pincode: "",
              phone: ""
            })
          }
        >
          Edit Saved Address
        </button>
      )}

      <div className="checkout-box">

        {/* LEFT */}
        <div className="checkout-form card">
          <h2>Checkout</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <input name="name" placeholder="Full Name" value={address.name} onChange={handleChange} required />
              <input name="email" type="email" placeholder="Email" value={address.email} onChange={handleChange} required />
              <input name="address" placeholder="Address" value={address.address} onChange={handleChange} required />
              <input name="city" placeholder="City" value={address.city} onChange={handleChange} required />
              <input name="pincode" placeholder="Pincode" value={address.pincode} onChange={handleChange} required />
              <input name="phone" placeholder="Phone Number" value={address.phone} onChange={handleChange} required />
            </div>

            <h3>Payment Method</h3>

            <div className="payment">
              <label className={`payment-card ${paymentMethod === "card" ? "active" : ""}`}>
                <input type="radio" name="pay" onChange={() => setPaymentMethod("card")} />
                Credit / Debit Card
              </label>

              <label className={`payment-card ${paymentMethod === "upi" ? "active" : ""}`}>
                <input type="radio" name="pay" onChange={() => setPaymentMethod("upi")} />
                UPI / Google Pay
              </label>

              <label className={`payment-card ${paymentMethod === "cod" ? "active" : ""}`}>
                <input type="radio" name="pay" onChange={() => setPaymentMethod("cod")} />
                Cash on Delivery
              </label>
            </div>

            <button
              type="submit"
              className="primary-btn"
              disabled={!paymentMethod}
            >
              Place Order
            </button>

            {!paymentMethod && (
              <p className="hint-text">Please select a payment method</p>
            )}
          </form>
        </div>

        {/* RIGHT */}
        <div className="checkout-summary card">
          <h3>Order Summary</h3>

          {cart.map(item => (
            <div key={item.id} className="summary-item">
              <span>{item.title.slice(0, 28)} × {item.qty}</span>
              <span>${(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}

          <div className="summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
