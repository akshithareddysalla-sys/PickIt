import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "../styles/product.css";
import "../styles/home.css";

const slides = [
  {
    image: require("../assets/sale1.png"),
    title: "Mega Fashion Sale",
    subtitle: "Up to 50% OFF on top brands"
  },
  {
    image: require("../assets/sale2.png"),
    title: "Electronics Bonanza",
    subtitle: "Best deals on gadgets"
  },
  {
    image: require("../assets/sale3.png"),
    title: "Daily Essentials",
    subtitle: "Save more on everyday needs"
  }
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef(0);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => setProducts(data.slice(0, 6)));
  }, []);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [paused]);

  function handleTouchStart(e) {
    startX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e) {
    const endX = e.changedTouches[0].clientX;
    const diff = startX.current - endX;

    if (diff > 50) {
      // swipe left
      setCurrent(prev => (prev + 1) % slides.length);
    } else if (diff < -50) {
      // swipe right
      setCurrent(prev =>
        prev === 0 ? slides.length - 1 : prev - 1
      );
    }
  }

  function nextSlide() {
    setCurrent(prev => (prev + 1) % slides.length);
  }
  
  function prevSlide() {
    setCurrent(prev =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  }
  
  return (
    <>
    <div
      className="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="overlay">
            <div className="slide-text">
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>
            </div>

            <button
              className="carousel-btn"
              onClick={() => navigate("/products")}
            >
              Shop Now
            </button>
          </div>
        </div>
      ))}

      <button className="nav-arrow left" onClick={prevSlide}>
        <i className="fas fa-chevron-left"></i>
      </button>

      <button className="nav-arrow right" onClick={nextSlide}>
        <i className="fas fa-chevron-right"></i>
      </button>

      {/* Dots Indicator */}
      <div className="dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === current ? "active" : ""}`}
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>
    </div>

    <section className="home-categories">
        <h2>Browse Categories</h2>

        <div className="category-grid">
          {categories.map(category => (
            <div
              key={category}
              className="category-card"
              onClick={() => navigate(`/products?category=${category}`)}
            >
              {category}
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "40px 0" }}>
        <h2 style={{ padding: "0 40px 20px" }}>
          Featured Products
        </h2>

        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* VIEW ALL */}
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <button
            onClick={() => navigate("/products")}
            style={{
              padding: "12px 26px",
              borderRadius: "10px",
              border: "none",
              background: "#0d6efd",
              color: "#fff",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            View All Products
          </button>
        </div>
      </section>
    </>
    
  );
}
