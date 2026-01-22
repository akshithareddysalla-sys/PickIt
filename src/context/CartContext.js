import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(product) {
    const found = cart.find(i => i.id === product.id);
    if (found) {
      setCart(cart.map(i =>
        i.id === product.id ? { ...i, qty: i.qty + 1 } : i
      ));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  }

  function increaseQty(id) {
    setCart(cart.map(i =>
      i.id === id ? { ...i, qty: i.qty + 1 } : i
    ));
  }

  function decreaseQty(id) {
    setCart(cart.map(i =>
      i.id === id && i.qty > 1 ? { ...i, qty: i.qty - 1 } : i
    ));
  }

  function removeFromCart(id) {
    setCart(cart.filter(i => i.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  function addToWishlist(product) {
    if (!wishlist.find(i => i.id === product.id)) {
      setWishlist([...wishlist, product]);
    }
  }

  function removeFromWishlist(id) {
    setWishlist(wishlist.filter(i => i.id !== id));
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, increaseQty, decreaseQty, clearCart, wishlist, addToWishlist, removeFromWishlist, searchQuery, setSearchQuery}}
    >
      {children}
    </CartContext.Provider>
  );
}
