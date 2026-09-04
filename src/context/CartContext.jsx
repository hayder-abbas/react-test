import { createContext, useContext, useState } from "react";
import { getProductById } from "../data/products";

export const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Add to cart
  function addToCart(productID) {
    const existing = cartItems.find((item) => item.id === productID);

    if (existing) {
      const currentQuantity = existing.quantity;
      const updatedCartItem = cartItems.map((item) =>
        item.id === productID
          ? { id: productID, quantity: currentQuantity + 1 }
          : item,
      );

      setCartItems(updatedCartItem);
    } else {
      setCartItems([...cartItems, { id: productID, quantity: 1 }]);
    }
  }

  function getCartItemswithProducts() {
    return cartItems
      .map((item) => ({
        ...item,
        product: getProductById(item.id),
      }))
      .filter((item) => item.product);
  }

  function removeFromCart(productID) {
    setCartItems(cartItems.filter((item) => item.id !== productID));
  }

  function updateQuantity(productID, quantity) {
    if (quantity <= 0) {
      removeFromCart(productID);
      return;
    }

    setCartItems(
      cartItems.map((item) =>
        item.id === productID ? { ...item, quantity } : item,
      ),
    );
  }

  function getCartTotal() {
    return cartItems.reduce((total, item) => {
      const product = getProductById(item.id);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  }

  function clearCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        getCartItemswithProducts,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
