import React, { createContext, useContext, useState, useEffect } from "react";

// Create Context
export const OrderContext = createContext();

// Custom Hook to use Orders
export const useOrders = () => useContext(OrderContext);

// Order Provider Component
export const OrderProvider = ({ children }) => {
  // Initialize orders from localStorage or empty array
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('orderHistory');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('orderHistory', JSON.stringify(orders));
  }, [orders]);

  // Add a new order
  const addOrder = (newOrderData) => {
    const order = {
      id: `ORD${Date.now().toString().slice(-5)}`, // Generate a simple unique ID
      date: new Date().toISOString().split('T')[0], // Current date
      status: 'Processing', // Default status for new orders
      ...newOrderData, // Include items, total, shipping, etc. passed from Cart
    };
    setOrders((prevOrders) => [order, ...prevOrders]); // Add new order to the beginning
  };

  // Update order status
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prevOrders) => 
      prevOrders.map((order) => 
        order.id === orderId 
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  return (
    <OrderContext.Provider 
      value={{
        orders,
        addOrder,
        updateOrderStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}; 