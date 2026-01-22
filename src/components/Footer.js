import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/footer.css";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleSubscribe = () => {
    // Simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    // Success
    setError("");
    setEmail("");
    setShowToast(true);

    // Auto hide toast
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <>
      <footer className="footer">
        <div className="footer-container">

          {/* BRAND */}
          <div className="footer-section">
            <h3 className="footer-logo">Pick<span>It</span></h3>
            <p>Find it. Pick it. Love it.</p>

            <div className="social-icons">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-linkedin-in"></i>
            </div>
          </div>

          {/* LINKS */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li onClick={() => navigate("/")}>
              Home
              </li>
              <li onClick={() => navigate("/products")}>
              Products
              </li>
              <li onClick={() => navigate("/wishlist")}>
              Wishlist
              </li>
              <li onClick={() => navigate("/cart")}>
              Cart
              </li>
            </ul>
          </div>

          {/* CATEGORIES */}
          <div className="footer-section">
          <h4>Categories</h4>
          <ul>
              <li onClick={() => navigate("/products?category=electronics")}>
              Electronics
              </li>
              <li onClick={() => navigate("/products?category=men's clothing")}>
              Men's Clothing
              </li>
              <li onClick={() => navigate("/products?category=women's clothing")}>
              Women's Clothing
              </li>
              <li onClick={() => navigate("/products?category=jewelery")}>
              Jewellery
              </li>
          </ul>
          </div>


          {/* NEWSLETTER */}
          <div className="footer-section">
            <h4>Newsletter</h4>
            <p>Subscribe to get latest offers</p>

            <div className="newsletter">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button onClick={handleSubscribe}>
                Subscribe
              </button>
            </div>

            {error && <p className="error-text">{error}</p>}
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} PickIt. All rights reserved.
        </div>
      </footer>

      {/* TOAST */}
      {showToast && (
        <div className="toast">
          ✅ Subscribed successfully!
        </div>
      )}
    </>
  );
}
