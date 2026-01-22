import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";

export default function Profile() {
  const [address, setAddress] = useState(null);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedAddress =
      JSON.parse(localStorage.getItem("pickit_address"));
    const savedOrders =
      JSON.parse(localStorage.getItem("pickit_orders")) || [];

    setAddress(savedAddress);
    setOrders(savedOrders);
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h2>My Profile</h2>

      {/* ADDRESS */}
      <div style={cardStyle}>
        <h3>Saved Address</h3>

        {address ? (
          <>
            <p>{address.name}</p>
            <p>{address.address}, {address.city}</p>
            <p>{address.pincode}</p>
            <p>{address.phone}</p>

            <button className="profile-btn edit-btn" onClick={() => navigate("/checkout")}>
              Edit Address
            </button>

          </>
        ) : (
          <p>No address saved.</p>
        )}
      </div>

      {/* ORDERS */}
      <div style={cardStyle}>
        <h3>Recent Orders</h3>

        {orders.length === 0 && <p>No orders yet.</p>}

        {orders.slice(0, 3).map(order => (
          <div key={order.id}>
            <p>{order.date}</p>
            <p>Total: ${order.total.toFixed(2)}</p>
          </div>
        ))}

        {orders.length > 0 && (
          <button className="profile-btn orders-btn" onClick={() => navigate("/orders")}>
            View All Orders
          </button>

        )}
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  marginBottom: "20px"
};
