import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

// Create Context
export const CartContext = createContext();

// Custom Hook to use Cart
export const useCart = () => useContext(CartContext);

// Cart Provider Component
export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage or empty array
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('shoppingCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
  }, [cart]);

  // Add to Cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      // For bulk orders, we don't want to merge them
      if (product.isBulkOrder) {
        const newCart = [...prevCart, product];
        toast.success(`Added ${product.quantity} ${product.name} to cart!`);
        return newCart;
      }

      // For regular products, handle quantity updates
      const existingItemIndex = prevCart.findIndex((item) => item.id === product.id);
      
      if (existingItemIndex !== -1) {
        // If item exists, update quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        toast.info(`Increased ${product.name} quantity in cart!`);
        return updatedCart;
      } else {
        // If item doesn't exist, add it with quantity 1
        const newCart = [...prevCart, { ...product, quantity: 1 }];
        toast.success(`${product.name} added to cart!`);
        return newCart;
      }
    });
  };

  // Remove from Cart
  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const itemToRemove = prevCart.find(item => item.id === id);
      const newCart = prevCart.filter((item) => item.id !== id);
      if (itemToRemove) {
        toast.error(`${itemToRemove.name} removed from cart`);
      }
      return newCart;
    });
  };

  // Update Quantity
  const updateQuantity = (id, amount) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + amount;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null; // Remove if quantity is 0 or less
        }
        return item;
      }).filter(Boolean); // Filter out null items (those removed)
    });
  };

  // Clear Cart
  const clearCart = () => {
    setCart([]);
    toast.info("Cart cleared!");
  };

  // Calculate total items
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider 
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
