import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../styles/product.css";

export default function ProductCard({ product }) {
  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(CartContext);

  const navigate = useNavigate();

  const isWishlisted = wishlist.some(item => item.id === product.id);

  const toggleWishlist = (e) => {
    e.stopPropagation();
    isWishlisted
      ? removeFromWishlist(product.id)
      : addToWishlist(product);
  };

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/products/${product.id}`)}
      style={{ cursor: "pointer" }}
    >
      <button className="heart-btn" onClick={toggleWishlist}>
        <i className={`${isWishlisted ? "fas" : "far"} fa-heart`}></i>
      </button>

      <img src={product.image} alt={product.title} />
      <h4>{product.title}</h4>
      <p className="price">₹ {product.price}</p>
    </div>
  );
}
