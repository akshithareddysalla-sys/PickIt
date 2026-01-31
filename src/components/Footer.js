import { useNavigate } from "react-router-dom"; 
import "../styles/footer.css"; 

export default function Footer() { 
  const navigate = useNavigate(); 
   
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
              <li onClick={() => navigate("/")}> Home </li> 
              <li onClick={() => navigate("/products")}> Products </li> 
              <li onClick={() => navigate("/wishlist")}> Wishlist </li> 
              <li onClick={() => navigate("/cart")}> Cart </li> 
            </ul> 
          </div> 

          {/* CATEGORIES */} 
          <div className="footer-section"> 
            <h4>Categories</h4> 
            <ul> 
              <li onClick={() => navigate("/products?category=electronics")}> Electronics </li> 
              <li onClick={() => navigate("/products?category=men's clothing")}> Men's Clothing </li> 
              <li onClick={() => navigate("/products?category=women's clothing")}> Women's Clothing </li> 
              <li onClick={() => navigate("/products?category=jewelery")}> Jewellery </li> 
            </ul> 
          </div> 

          {/* POLICIES */} 
          <div className="footer-section">
            <h4>Policies</h4>
            <ul>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Refund Policy</li>
              <li>Shipping Policy</li>
            </ul>
          </div>    

          {/* CONTACT */}
          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>📧 support@pickit.com</p>
            <p>📞 +91 98765 43210</p>
            <p>📍 India</p>
          </div>                              
        </div> 

        <div className="footer-bottom"> 
          © {new Date().getFullYear()} PickIt. All rights reserved. 
        </div> 
      </footer> 
    </> 
  ); 
}