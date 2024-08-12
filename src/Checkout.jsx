
import './index.css'

import { CartProvider } from "./store/CartContext";
import Header from "./components/header/Header";
import Footer from "./components/Footer";
import CheckoutContent from "./components/checkoutContent/CheckOutContent";



// createRoot(document.getElementById("root")).render(

function Checkout() {
  return(
    <CartProvider>
        <Header />
        <CheckoutContent />
        <Footer />
    </CartProvider>
  )
}
// );


export default Checkout;