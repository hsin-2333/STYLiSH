import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import './index.css'

import { CartProvider } from "./store/CartContext";
import Header from "./components/header/Header";
import Footer from "./components/Footer";
import ProductDetail from "./components/productDetail/ProductDetail";



// createRoot(document.getElementById("root")).render(

//   <CartProvider>
//     <Router>
//       <Header />
//       <ProductDetail />
//       <Footer />
//     </Router>
//   </CartProvider>
// );

function Product() {
  return (
    <CartProvider>
        <Header />
        <ProductDetail />
        <Footer />
    </CartProvider>
  );
}

export default Product;