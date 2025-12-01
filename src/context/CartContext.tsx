import React, { useContext, useEffect } from "react";

import type { CartItemData, Product, CartContextType} from "../types";


const CartContext = React.createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = React.useState<CartItemData[]>(() => {
    const saved = localStorage.getItem('cartProducts')
    return saved ? JSON.parse(saved): []
  });

  useEffect(()=>{
    localStorage.setItem('cartProducts', JSON.stringify(cartItems))
  }, [cartItems])


  const addToCart = (product: Product) => {
    setCartItems( (prev) => {
      const exiting = prev.find(item => item.product.id === product.id);
      if (exiting) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const reduceFromCart = (productId: number) => {
    setCartItems( prev =>
      prev
        .map((item) =>
            item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };
  const removeFromCart = (productId: number) => {
    setCartItems( (prev) => prev.filter((item) => item.product.id !== productId )
    );
  };
  const allPrice = cartItems.reduce(
  (sum, item) => sum + item.product.price * item.quantity,  0)
 
  const clearCart = () => setCartItems([]);

  const value: CartContextType = {
    cartItems, addToCart, reduceFromCart, removeFromCart, clearCart, allPrice
  }

  return (
    <CartContext.Provider
      value={value}
    >
      {children}
    </CartContext.Provider>
  );
};


// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used with in a CartProvider");
  return context;
};
