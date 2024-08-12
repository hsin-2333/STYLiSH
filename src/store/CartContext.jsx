import React, { createContext, useEffect, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {

    const [cartTotal, setCartTotal] = useState(0);

    useEffect(()=>{
        const savedCartDetails = localStorage.getItem("chosenProductDetails");
        const cartItems = savedCartDetails ? JSON.parse(savedCartDetails) : [];
        const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
        setCartTotal(totalQuantity);
    }, [])

    const updateCartTotal = () => {
        const savedCartDetails = localStorage.getItem("chosenProductDetails");
        const cartItems = savedCartDetails ? JSON.parse(savedCartDetails) : [];
        const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
        setCartTotal(totalQuantity);
    };

  return (
    <CartContext.Provider value={{cartTotal, updateCartTotal}}>
      {children}
    </CartContext.Provider>
  );
};
export { CartContext, CartProvider };
