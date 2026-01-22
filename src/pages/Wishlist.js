import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/wishlist.scss";

export default function Wishlist() {
  const {
    wishlist,
    cart,
    addToCart,
    increaseQty,
    decreaseQty,
    removeFromWishlist
  } = useContext(CartContext);

  return (
    <div>
      <h2 style={{ padding: "30px" }}>Your Wishlist</h2>

      <div className="wishlist-grid">
        {wishlist.length === 0 && <p>No saved items yet.</p>}

        {wishlist.map(item => {
          const cartItem = cart.find(c => c.id === item.id);

          return (
            <div key={item.id} className="wishlist-card">
              <img src={item.image} alt={item.title} />
              <p className="wishlist-title">{item.title}</p>
              <p>₹ {item.price}</p>

              <div className="wishlist-actions">
                {!cartItem ? (
                  <button
                    className="wishlist-cart-btn"
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="qty-control">
                    <button onClick={() => decreaseQty(item.id)}>-</button>
                    <span>{cartItem.qty}</span>
                    <button onClick={() => increaseQty(item.id)}>+</button>
                  </div>
                )}

                <button
                  className="wishlist-remove-btn"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
