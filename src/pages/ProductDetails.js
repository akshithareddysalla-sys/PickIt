import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../styles/productdetails.css";

export default function ProductDetails() {
  const { id } = useParams();

  const {
    cart,
    addToCart,
    increaseQty,
    decreaseQty,
    wishlist,
    addToWishlist,
    removeFromWishlist
  } = useContext(CartContext);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  // ⛔ Wait until product is loaded
  if (!product) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  // ✅ SAFE to use product now
  const cartItem = cart.find(item => item.id === product.id);
  const isWishlisted = wishlist.some(item => item.id === product.id);

  return (
    <div className="product-details">
      <div className="details-image">
        <img src={product.image} alt={product.title} />
      </div>

      <div className="details-info">
        <h2>{product.title}</h2>
        <h3>₹ {product.price}</h3>
        <p>{product.description}</p>
        <p><strong>Category:</strong> {product.category}</p>

        <div className="details-actions">
          {!cartItem ? (
            <button className="add-cart-btn" onClick={() => addToCart(product)}>
              <i className="fas fa-shopping-cart"></i>
              Add to Cart
            </button>
          ) : (
            <div className="qty-control">
              <button onClick={() => decreaseQty(product.id)}>-</button>
              <span>{cartItem.qty}</span>
              <button onClick={() => increaseQty(product.id)}>+</button>
            </div>
          )}

          <button
            className={`wishlist-detail-btn ${isWishlisted ? "active" : ""}`}
            onClick={() =>
              isWishlisted
                ? removeFromWishlist(product.id)
                : addToWishlist(product)
            }
          >
            <i className="fas fa-heart"></i>
            {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
          </button>
        </div>
      </div>
    </div>
  );
}
