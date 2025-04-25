import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiPlus, FiMinus, FiArrowLeft, FiShoppingCart, FiLock, FiCreditCard, FiLoader, FiTag, FiTruck, FiEdit2, FiCheckCircle, FiXCircle, FiPackage } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

// Predefined coupon codes for simulation
const validCoupons = {
  FRESH10: { type: 'percentage', value: 10 }, // 10% off
  FLAT50: { type: 'fixed', value: 50 },       // Flat ₹50 off
  FREESHIP: { type: 'shipping', value: 0 }     // Free Shipping
};

const Cart = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    totalItems, 
    totalPrice 
  } = useCart();

  const { addOrder } = useOrders();

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null); // Store the applied coupon details
  const [couponStatus, setCouponStatus] = useState({ message: '', type: '' }); // For feedback
  const [shippingOption, setShippingOption] = useState('standard'); // 'standard' or 'express'
  const [orderNotes, setOrderNotes] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');

  const navigate = useNavigate();

  // Calculate Shipping Cost based on selection
  const shippingCost = useMemo(() => {
    if (appliedCoupon?.type === 'shipping') return 0;
    if (totalPrice === 0) return 0;
    if (shippingOption === 'express') return 80;
    return totalPrice > 500 ? 0 : 40; // Standard shipping
  }, [shippingOption, totalPrice, appliedCoupon]);

  // Calculate Discount Amount
  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.type === 'percentage') {
      return (totalPrice * appliedCoupon.value) / 100;
    }
    if (appliedCoupon.type === 'fixed') {
      return appliedCoupon.value;
    }
    return 0;
  }, [appliedCoupon, totalPrice]);

  // Calculate Final Total
  const finalTotal = useMemo(() => {
    const totalBeforeDiscount = totalPrice + shippingCost;
    const totalAfterDiscount = totalBeforeDiscount - discountAmount;
    return Math.max(0, totalAfterDiscount); // Ensure total doesn't go below zero
  }, [totalPrice, shippingCost, discountAmount]);

  const handleApplyCoupon = () => {
    const codeUpper = couponCode.toUpperCase();
    if (validCoupons[codeUpper]) {
      setAppliedCoupon({ code: codeUpper, ...validCoupons[codeUpper] });
      setCouponStatus({ message: `Coupon '${codeUpper}' applied successfully!`, type: 'success' });
      toast.success(`Coupon '${codeUpper}' applied!`);
    } else {
      setAppliedCoupon(null);
      setCouponStatus({ message: 'Invalid coupon code.', type: 'error' });
      toast.error("Invalid coupon code");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponStatus({ message: 'Coupon removed.', type: 'info' });
    toast.info("Coupon removed.");
  };

  const handleCheckout = async () => {
    setIsProcessingPayment(true);
    setCouponStatus({ message: '', type: '' }); // Clear coupon status on checkout attempt
    // Simulate API call / payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2500)); 

    // --- Create order data --- 
    const orderData = {
      items: cart.map(item => ({ // Store relevant item details
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image // Optional: store image for order page
      })),
      total: finalTotal,
      subtotal: totalPrice,
      shippingCost: shippingCost,
      discountApplied: discountAmount > 0 ? { code: appliedCoupon.code, amount: discountAmount } : null,
      shippingMethod: shippingOption,
      paymentMethod: selectedPaymentMethod,
      orderNotes: orderNotes,
      shippingAddress: { // Placeholder address
        name: 'SmartSupply User',
        address: '123 Default Lane, Checkout City',
        pincode: '110011',
        phone: '9999988888'
      },
    };

    // --- Add order to context --- 
    addOrder(orderData);

    // --- Clear cart and reset state --- 
    clearCart();
    setIsProcessingPayment(false);
    toast.success("Payment Successful! Your order is confirmed.");
    setAppliedCoupon(null);
    setCouponCode('');
    setOrderNotes('');
    // Optionally navigate
    // setTimeout(() => navigate('/orders'), 1500); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 pb-4 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-green-800 mb-4 sm:mb-0">Your Shopping Cart</h1>
          <Link to="/categories" className="flex items-center text-green-600 hover:text-green-800 font-medium">
            <FiArrowLeft className="mr-2" />
              Continue Shopping
            </Link>
          </div>

        {cart.length === 0 && !isProcessingPayment ? (
          // Empty Cart View
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-12 text-center flex flex-col items-center"
          >
            <FiShoppingCart className="text-6xl text-green-300 mb-6" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Looks like you haven't added anything yet. Explore our categories to find fresh products!
            </p>
            <Link
              to="/categories"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 transition duration-300"
            >
              Start Shopping
            </Link>
          </motion.div>
        ) : (
          // Cart with Items View
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left Column: Cart Items & Notes */}
            <div className="lg:col-span-2 space-y-6">
              {/* Cart Items List */}
              <div className="space-y-4">
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50, transition: { duration: 0.3 } }}
                      className="bg-white rounded-xl shadow-md overflow-hidden flex items-start p-4"
                    >
                      {item.type === 'bulk' ? (
                        // Bulk Order Item Display
                        <>
                          <div className="w-24 h-24 bg-blue-50 rounded-lg flex-shrink-0 border border-blue-100 flex items-center justify-center">
                            <FiPackage className="text-3xl text-blue-500" />
                          </div>
                          <div className="ml-4 flex-grow">
                            <h3 className="text-lg font-semibold text-gray-800 mb-1">
                              {item.product} (Bulk Order)
                            </h3>
                            <p className="text-sm text-gray-500 mb-1">
                              Farmer: {item.farmerName}
                            </p>
                            <p className="text-sm text-gray-500 mb-1">
                              Quantity: {item.quantity} {item.unit}
                            </p>
                            <p className="text-sm text-gray-500 mb-1">
                              Delivery: {new Date(item.deliveryDate).toLocaleDateString()}
                            </p>
                            {item.specialInstructions && (
                              <p className="text-sm text-gray-500 mb-1">
                                Instructions: {item.specialInstructions}
                              </p>
                            )}
                          </div>
                        </>
                      ) : (
                        // Regular Product Item Display
                        <>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-lg flex-shrink-0 border border-gray-100"
                          />
                          <div className="ml-4 flex-grow">
                            <Link to={`/product/${item.id}`} className="hover:underline">
                              <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.name}</h3>
                            </Link>
                            <p className="text-sm text-gray-500 mb-2">Unit Price: ₹{item.price}</p>
                            <div className="flex items-center">
                              <motion.button 
                                whileTap={{ scale: 0.9 }} 
                                onClick={() => updateQuantity(item.id, -1)}
                                className="p-1.5 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                                disabled={item.quantity <= 1 || isProcessingPayment}
                                aria-label="Decrease quantity"
                              >
                                <FiMinus size={14} />
                              </motion.button>
                              <span className="mx-3 font-medium w-8 text-center tabular-nums">{item.quantity}</span>
                              <motion.button 
                                whileTap={{ scale: 0.9 }} 
                                onClick={() => updateQuantity(item.id, 1)}
                                className="p-1.5 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
                                disabled={isProcessingPayment}
                                aria-label="Increase quantity"
                              >
                                <FiPlus size={14} />
                              </motion.button>
                            </div>
                          </div>
                        </>
                      )}
                      <div className="text-right ml-4 flex flex-col items-end justify-between h-full">
                        <span className="text-lg font-semibold text-green-700">
                          ₹{item.type === 'bulk' ? item.total : (item.price * item.quantity).toFixed(2)}
                        </span>
                        <motion.button 
                          whileTap={{ scale: 0.9 }} 
                  onClick={() => removeFromCart(item.id)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                          disabled={isProcessingPayment}
                          aria-label="Remove item"
                        >
                          <FiTrash2 size={18} />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              {/* Clear Cart Button */}
              {cart.length > 0 && (
                <div className="text-right">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearCart}
                    disabled={isProcessingPayment}
                    className="text-sm text-red-600 hover:text-red-800 font-medium flex items-center justify-end gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiTrash2 size={14}/> Clear Cart
                  </motion.button>
                </div>
              )}
              {/* Order Notes */}              
              {cart.length > 0 && (
                 <div className="bg-white rounded-xl shadow-md p-6">
                   <label htmlFor="orderNotes" className="flex items-center text-md font-semibold text-gray-700 mb-3">
                     <FiEdit2 className="mr-2"/> Order Notes (Optional)
                   </label>
                   <textarea 
                     id="orderNotes"
                     rows="3"
                     value={orderNotes}
                     onChange={(e) => setOrderNotes(e.target.value)}
                     placeholder="Add any special instructions for your order..."
                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500 focus:border-green-500 text-sm"
                     disabled={isProcessingPayment}
                   />
                 </div>
              )}
            </div>

            {/* Right Column: Summary & Payment */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24 space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 pb-4 border-b border-gray-200">Order Summary</h3>
                
                {/* Coupon Code Section */}
                <div>
                  <label htmlFor="couponCode" className="block text-sm font-medium text-gray-700 mb-1">Coupon Code</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      id="couponCode"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="e.g., FRESH10"
                      className={`flex-grow px-3 py-2 border rounded-l-md focus:outline-none focus:ring-1 text-sm ${couponStatus.type === 'error' ? 'border-red-500 ring-red-500' : couponStatus.type === 'success' ? 'border-green-500 ring-green-500' : 'border-gray-300 focus:border-green-500 focus:ring-green-500'}`}
                      disabled={isProcessingPayment || !!appliedCoupon}
                    />
                    {!appliedCoupon ? (
                      <button
                        onClick={handleApplyCoupon}
                        className="px-4 py-2 bg-gray-700 text-white text-sm font-medium rounded-r-md hover:bg-gray-800 disabled:opacity-50"
                        disabled={!couponCode || isProcessingPayment}
                      >
                        Apply
                      </button>
                    ) : (
                      <button
                        onClick={handleRemoveCoupon}
                        className="p-2 bg-red-100 text-red-600 rounded-r-md hover:bg-red-200"
                        disabled={isProcessingPayment}
                        aria-label="Remove Coupon"
                      >
                        <FiXCircle />
                      </button>
                    )}
          </div>
                  {couponStatus.message && (
                    <p className={`mt-1 text-xs ${couponStatus.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                      {couponStatus.message}
                    </p>
                  )}
                </div>

                {/* Shipping Options */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Shipping Options</h4>
                  <div className="space-y-2">
                    <label className={`flex items-center p-3 border rounded-lg cursor-pointer text-sm ${shippingOption === 'standard' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <input 
                        type="radio" 
                        name="shipping" 
                        value="standard" 
                        checked={shippingOption === 'standard'}
                        onChange={(e) => setShippingOption(e.target.value)}
                        className="text-green-600 focus:ring-green-500 mr-3"
                        disabled={isProcessingPayment || appliedCoupon?.type === 'shipping'}
                      />
                      <span className="flex-grow">Standard (3-5 days)</span>
                      <span className="font-medium">{totalPrice > 500 || appliedCoupon?.type === 'shipping' ? 'Free' : `₹40.00`}</span>
                    </label>
                    <label className={`flex items-center p-3 border rounded-lg cursor-pointer text-sm ${shippingOption === 'express' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <input 
                        type="radio" 
                        name="shipping" 
                        value="express" 
                        checked={shippingOption === 'express'}
                        onChange={(e) => setShippingOption(e.target.value)}
                        className="text-green-600 focus:ring-green-500 mr-3"
                        disabled={isProcessingPayment || appliedCoupon?.type === 'shipping'}
                      />
                      <span className="flex-grow">Express (1-2 days)</span>
                      <span className="font-medium">{appliedCoupon?.type === 'shipping' ? 'Free' : '₹80.00'}</span>
                    </label>
                  </div>
                </div>

                {/* Summary Breakdown */}
                <div className="space-y-2 border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span><FiShoppingCart className="inline mr-1"/> Subtotal ({totalItems} items)</span>
                    <span className="font-medium">₹{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span><FiTruck className="inline mr-1"/> Shipping</span>
                    <span className="font-medium">
                      {shippingCost === 0 ? "Free" : `₹${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  {discountAmount > 0 && (
                     <div className="flex justify-between text-sm text-green-600">
                      <span><FiTag className="inline mr-1"/> Discount ({appliedCoupon.code})</span>
                      <span className="font-medium">- ₹{discountAmount.toFixed(2)}</span>
          </div>
        )}
      </div>

                {/* Total */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between font-bold text-lg text-gray-900">
                    <span>Total</span>
                    <span>₹{finalTotal.toFixed(2)}</span>
          </div>
        </div>

                {/* Payment Methods */}
                <div className="border-t border-gray-200 pt-4">
                   <h4 className="text-md font-semibold text-gray-700 mb-3">Payment Method</h4>
                   <div className="space-y-2">
                     {/* Card Option */}
                     <label className={`flex items-center p-3 border rounded-lg cursor-pointer text-sm ${selectedPaymentMethod === 'card' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}>
                       <input 
                         type="radio" 
                         name="paymentMethod" 
                         value="card"
                         checked={selectedPaymentMethod === 'card'}
                         onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                         className="text-green-600 focus:ring-green-500 mr-3"
                         disabled={isProcessingPayment}
                       />
                       <FiCreditCard className="mr-2 text-gray-600"/>
                       <span className="flex-grow">Credit / Debit Card</span>
                       {/* Add card icons maybe */}
            </label>
                     {/* UPI Option */}
                     <label className={`flex items-center p-3 border rounded-lg cursor-pointer text-sm ${selectedPaymentMethod === 'upi' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}>
                       <input 
                         type="radio" 
                         name="paymentMethod" 
                         value="upi"
                         checked={selectedPaymentMethod === 'upi'}
                         onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                         className="text-green-600 focus:ring-green-500 mr-3"
                         disabled={isProcessingPayment}
                       />
                       <img src="/upi-icon.png" alt="UPI" className="w-4 h-4 mr-2"/> {/* Placeholder UPI icon */}
                       <span className="flex-grow">UPI</span>
            </label>
                     {/* COD Option */}                     
                     <label className={`flex items-center p-3 border rounded-lg cursor-pointer text-sm ${selectedPaymentMethod === 'cod' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}>
                       <input 
                         type="radio" 
                         name="paymentMethod" 
                         value="cod"
                         checked={selectedPaymentMethod === 'cod'}
                         onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                         className="text-green-600 focus:ring-green-500 mr-3"
                         disabled={isProcessingPayment || finalTotal > 1000} // Example: Disable COD for large orders
                       />
                       <FiTruck className="mr-2 text-gray-600"/>
                       <span className="flex-grow">Cash on Delivery</span>
                       {finalTotal > 1000 && <span className="text-xs text-red-500">(Not available)</span>}
            </label>
          </div>
                 </div>

                {/* Checkout Button */}
                <motion.button 
                  whileHover={!isProcessingPayment ? { scale: 1.03 } : {}}
                  whileTap={!isProcessingPayment ? { scale: 0.97 } : {}}
                  onClick={handleCheckout}
                  disabled={isProcessingPayment || cart.length === 0}
                  className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300 shadow-md text-lg flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isProcessingPayment ? (
                    <>
                      <FiLoader className="animate-spin mr-2" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <FiLock className="mr-2"/> Secure Checkout
                    </>
                  )}
                </motion.button>

                <p className="mt-4 text-xs text-gray-500 text-center">
                  Secured Payment | 100% Freshness Guarantee
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
