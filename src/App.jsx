// import './App.css'
// import Header from "./components/header/Header";
// import Footer from "./components/Footer";
// import ProductDetail from "./components/productDetail/ProductDetail";
// import { CartProvider } from "./store/CartContext";
import { Routes, Route } from "react-router-dom";
import Checkout from "./Checkout.jsx";
import Product from "./Product.jsx";

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<App />} /> */}
      <Route path="/product" element={<Product />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}

export default App;
