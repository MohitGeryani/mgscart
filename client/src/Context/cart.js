import React, { useState, useContext, createContext, useEffect } from "react";
import { useAuth } from "./auth";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Use the user's ID for cart data storage
  const [auth] = useAuth();
  const userId = auth?.user?._id;

  // Load cart data from localStorage initially
  useEffect(() => {
    if (userId) {
      const data = localStorage.getItem(`cart_${userId}`);
      try {
        if (data) {
          const parsedData = JSON.parse(data);
          setCart(parsedData);
          console.log("Cart data loaded:", parsedData);
        } else {
          console.log("Cart data not found in localStorage.");
        }
      } catch (error) {
        console.error("Error parsing cart data:", error);
      }
    }
  }, [userId]);

  // Update localStorage whenever the cart changes
  useEffect(() => {
    if (userId) {
      localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
    }
  }, [cart, userId]);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
