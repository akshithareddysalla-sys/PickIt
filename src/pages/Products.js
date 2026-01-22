import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const { searchQuery } = useContext(CartContext);


  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => setProducts(data));

    fetch("https://fakestoreapi.com/products/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  // Filter by category
  let displayedProducts = [...products];
  if (selectedCategory) {
    displayedProducts = displayedProducts.filter(
      product => product.category === selectedCategory
    );
  }
  if (searchQuery) {
    displayedProducts = displayedProducts.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Sort by price
  if (sortOrder === "low-high") {
    displayedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "high-low") {
    displayedProducts.sort((a, b) => b.price - a.price);
  }

  {displayedProducts.length === 0 && (
    <p style={{ padding: "40px" }}>No products found</p>
  )}

  return (
    <>
      {/* CATEGORY BROWSING */}
      <div className="browse-bar">
        <button
          className={!selectedCategory ? "active" : ""}
          onClick={() => setSelectedCategory("")}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            className={selectedCategory === cat ? "active" : ""}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* SORT */}
      <div className="sort-bar">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort by price</option>
          <option value="low-high">Price: Low → High</option>
          <option value="high-low">Price: High → Low</option>
        </select>
      </div>

      {/* PRODUCT GRID */}
      <div className="products-grid">
        {displayedProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}
