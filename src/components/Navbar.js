import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import "../styles/navbar.css";

export default function Navbar() {
  const { setSearchQuery } = useContext(CartContext); // counts not used (no badge)
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
    setShowSearch(false);
  }

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <h2 className="logo">
            Pick<span>It</span>
          </h2>
        </div>

        <div className="nav-center desktop-only">
          <input
            className="search"
            type="text"
            placeholder="Search products..."
            onChange={(e) => { setSearchQuery(e.target.value);
            navigate("/products");
            }}
          />
        </div>

        <div className="nav-right">
          <i
            className="fas fa-search nav-icon mobile-only"
            onClick={() => {
              setShowSearch(!showSearch);
              setMenuOpen(false);
            }}
          ></i>
          <i
            className="fas fa-bars nav-icon mobile-only"
            onClick={() => {
              setMenuOpen(!menuOpen);
              setShowSearch(false);
            }}
          ></i>

          <div className={`links ${menuOpen ? "open" : ""}`}>
            <NavLink to="/" className="nav-icon" onClick={closeMenu}>
              <i className="fas fa-home"></i>
            </NavLink>

            <NavLink to="/products" className="nav-icon" onClick={closeMenu}>
              <i className="fas fa-store"></i>
            </NavLink>

            <NavLink to="/wishlist" className="nav-icon" onClick={closeMenu}>
              <i className="fas fa-heart"></i>
            </NavLink>

            <NavLink to="/cart" className="nav-icon" onClick={closeMenu}>
              <i className="fas fa-shopping-cart"></i>
            </NavLink>

            {!user ? (
              <NavLink to="/login" className="nav-icon" onClick={closeMenu}>
                <i className="fas fa-user"></i>
              </NavLink>
            ) : (
              <button className="logout-btn" onClick={() => { logout(); closeMenu(); }}>
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      {showSearch && (
        <div className="mobile-search">
          <input placeholder="Search products..." 
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}
    </>
  );
}
