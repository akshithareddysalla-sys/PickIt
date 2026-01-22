# 🛍️ PickIt – React E-Commerce Application

PickIt is a modern, responsive **React-based e-commerce web application** that allows users to browse products, manage cart and wishlist, place orders, and view profile details.  
This project is built as a **frontend-only application** using React, Context API, and localStorage.

---

## 🚀 Features

### 🛒 Shopping
- Browse products from FakeStore API
- Category-based browsing
- Product details page
- Add to cart with quantity controls
- Wishlist functionality

### 🔍 Search & Navigation
- Global product search
- Responsive navbar (desktop & mobile)
- Mobile hamburger menu

### 💳 Checkout
- Address form with saved profile data
- Payment method selection
- Place order functionality
- Cart clears after successful order

### 👤 Authentication (Mock)
- Login & Register pages
- Password + confirm password
- Password strength indicator
- Authentication handled using Context API

### 📦 Orders & Profile
- Order history page
- Cancel order option
- Profile page with:
  - Saved address
  - Recent orders
  - Edit address option

### 🎨 UI / UX
- Fully responsive design
- Clean, modern layout
- Styled using CSS / SCSS
- Card-based UI for products and checkout

---

## 🛠️ Tech Stack

- **React JS**
- **React Router DOM**
- **Context API**
- **JavaScript (ES6+)**
- **CSS / SCSS**
- **FakeStore API**
- **localStorage**

---

## 📁 Project Structure

public/
|──index.html

src/
│── assets/
│ ├── sale1.png
│ ├── sale2.png
│ ├── sale3.png
│
│── components/
│ ├── Navbar.js
│ ├── Loader.js
│ ├── Footer.js
│ ├── ProductCard.js
│
│── pages/
│ ├── Home.js
│ ├── Products.js
│ ├── ProductDetails.js
│ ├── Cart.js
│ ├── Wishlist.js
│ ├── Checkout.js
│ ├── Profile.js
│ ├── Login.js
│ ├── Register.js
│
│── context/
│ ├── CartContext.js
│ ├── AuthContext.js
│
│── styles/
│ ├── _mixins.scss
│ ├── _variables.scss
│ ├── auth.scss
│ ├── cart.scss
│ ├── checkout.scss
│ ├── footer.scss
│ ├── global.scss
│ ├── navbar.scss
│ ├── product.scss
│ ├── productdetails.scss
│ ├── profile.scss
│ ├── wishlist.scss
│ ├── home.scss
│
│── App.js
│── index.js

---

## How to Run the Project

### Install dependencies

```bash
npm install

npm start

http://localhost:3000
