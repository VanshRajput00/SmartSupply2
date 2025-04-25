import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMinus, FiPlus, FiCalendar, FiTruck, FiPackage } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';

const BulkOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryFrequency, setDeliveryFrequency] = useState('one-time');
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Farmer details (same as in FarmerDetails component)
  const farmerDetails = {
    1: {
      name: "Ramesh Kumar",
      title: "Ramesh's Organic Farm",
      products: [
        {
          name: "Organic Vegetables Pack",
          minOrder: 100,
          price: 40,
          unit: "kg",
          description: "Mix of seasonal vegetables"
        },
        {
          name: "Premium Leafy Greens",
          minOrder: 50,
          price: 60,
          unit: "kg",
          description: "Spinach, Lettuce, Methi"
        }
      ]
    },
    2: {
      name: "Green Valley Dairy Team",
      title: "Green Valley Dairy",
      products: [
        {
          name: "Fresh Milk Subscription",
          minOrder: 50,
          price: 60,
          unit: "L",
          description: "Pure cow milk, delivered daily"
        },
        {
          name: "Premium Dairy Pack",
          minOrder: 25,
          price: 1200,
          unit: "pack",
          description: "Milk, curd, paneer, ghee"
        }
      ]
    },
    3: {
      name: "Singh Family",
      title: "Sunrise Fruits",
      products: [
        {
          name: "Premium Apple Box",
          minOrder: 100,
          price: 120,
          unit: "kg",
          description: "Royal Delicious Apples"
        },
        {
          name: "Seasonal Fruits Mix",
          minOrder: 200,
          price: 80,
          unit: "kg",
          description: "Selection of seasonal fruits"
        }
      ]
    }
  };

  const farmer = farmerDetails[id];

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setQuantity(product.minOrder);
  };

  const handleQuantityChange = (value) => {
    if (selectedProduct) {
      const newQuantity = Math.max(selectedProduct.minOrder, quantity + value);
      setQuantity(newQuantity);
    }
  };

  const calculateTotal = () => {
    if (!selectedProduct) return 0;
    return quantity * selectedProduct.price;
  };

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!selectedProduct || !deliveryDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    const bulkOrder = {
      id: Date.now(),
      farmerId: id,
      farmerName: farmer.name,
      farmerTitle: farmer.title,
      product: selectedProduct.name,
      quantity: quantity,
      unit: selectedProduct.unit,
      price: selectedProduct.price,
      total: calculateTotal(),
      deliveryDate,
      deliveryFrequency,
      specialInstructions,
      status: 'pending',
      type: 'bulk'
    };

    // Use the cart context to add the bulk order
    addToCart(bulkOrder);
    navigate('/cart');
  };

  if (!farmer) {
    return <div>Farmer not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Place Bulk Order</h1>
          
          {/* Farmer Info */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{farmer.title}</h2>
            <p className="text-gray-600">Select products and specify your bulk order details</p>
          </div>

          {/* Product Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Product</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {farmer.products.map((product, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-lg border-2 cursor-pointer ${
                    selectedProduct?.name === product.name
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200'
                  }`}
                  onClick={() => handleProductSelect(product)}
                >
                  <h4 className="font-semibold text-gray-900">{product.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                  <div className="flex justify-between text-sm">
                    <span>Min. Order: {product.minOrder} {product.unit}</span>
                    <span>₹{product.price}/{product.unit}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {selectedProduct && (
            <>
              {/* Quantity Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleQuantityChange(-selectedProduct.minOrder)}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    <FiMinus />
                  </button>
                  <span className="text-xl font-semibold">
                    {quantity} {selectedProduct.unit}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(selectedProduct.minOrder)}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    <FiPlus />
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Minimum order: {selectedProduct.minOrder} {selectedProduct.unit}
                </p>
              </div>

              {/* Delivery Details */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Date
                    </label>
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Frequency
                    </label>
                    <select
                      value={deliveryFrequency}
                      onChange={(e) => setDeliveryFrequency(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="one-time">One-time Delivery</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Special Instructions */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Special Instructions</h3>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Add any special instructions or requirements..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent h-32"
                />
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Product</span>
                    <span className="font-medium">{selectedProduct.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quantity</span>
                    <span className="font-medium">{quantity} {selectedProduct.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price per {selectedProduct.unit}</span>
                    <span className="font-medium">₹{selectedProduct.price}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="text-gray-900 font-semibold">Total Amount</span>
                      <span className="text-green-600 font-bold">₹{calculateTotal()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition duration-200"
              >
                Add to Cart
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BulkOrder; 