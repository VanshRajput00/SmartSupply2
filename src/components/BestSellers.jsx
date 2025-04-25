import React, { useState } from "react";
import { FiShoppingCart, FiHeart, FiShare2, FiStar, FiTruck, FiInfo } from "react-icons/fi";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";

const bestSellerProducts = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    image: "https://burst.shopifycdn.com/photos/fresh-tomatoes-with-drops-of-water.jpg?exif=0&iptc=0",
    description: "Organic farm-fresh tomatoes, rich in lycopene and vitamin C. Perfect for salads and cooking.",
    price: 48,
    originalPrice: 60,
    rating: 4.5,
    reviewCount: 128,
    weight: "500g",
    stock: "In Stock",
    category: "Vegetables",
    nutritionInfo: {
      calories: "18 kcal per 100g",
      protein: "0.9g",
      fiber: "1.2g",
      vitamins: ["C", "K", "A"]
    },
    origin: "Local Organic Farm",
    storageInfo: "Store at room temperature",
    bestBefore: "5-7 days",
    isOrganic: true,
    discount: 20,
    tags: ["Fresh", "Organic", "Local"]
  },
  {
    id: 2,
    name: "Green Apples",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHZ6JXGGM6nzpv5Iriq1SW0LuPoobGW6ARpA&s",
    description: "Crispy and sweet green apples, packed with fiber and antioxidants. Perfect for snacking.",
    price: 162,
    originalPrice: 180,
    rating: 4.8,
    reviewCount: 245,
    weight: "1kg",
    stock: "In Stock",
    category: "Fruits",
    nutritionInfo: {
      calories: "52 kcal per 100g",
      protein: "0.3g",
      fiber: "2.4g",
      vitamins: ["C", "Fiber", "Antioxidants"]
    },
    origin: "Himachal Pradesh",
    storageInfo: "Store in cool, dry place",
    bestBefore: "10-14 days",
    isOrganic: true,
    discount: 10,
    tags: ["Crispy", "Sweet", "Healthy"]
  },
  {
    id: 3,
    name: "Fresh Oranges",
    image: "https://www.allrecipes.com/thmb/y_uvjwXWAuD6T0RxaS19jFvZyFU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1205638014-2000-d0fbf9170f2d43eeb046f56eec65319c.jpg",
    description: "Juicy farm-fresh oranges, rich in vitamin C. Perfect for fresh juice and snacking.",
    price: 95,
    originalPrice: 120,
    rating: 4.6,
    reviewCount: 189,
    weight: "1kg",
    stock: "In Stock",
    category: "Fruits",
    nutritionInfo: {
      calories: "47 kcal per 100g",
      protein: "0.9g",
      fiber: "2.4g",
      vitamins: ["C", "Folate", "Potassium"]
    },
    origin: "Nagpur Region",
    storageInfo: "Store at room temperature",
    bestBefore: "7-10 days",
    isOrganic: true,
    discount: 21,
    tags: ["Juicy", "Vitamin C", "Fresh"]
  },
  {
    id: 4,
    name: 'Fresh Carrots',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIyMCZMaG0lrjs_rMzbaeQAMTImWF_f_VR9A&s',
    description: 'Sweet and crunchy carrots, rich in beta-carotene. Perfect for salads and cooking.',
    price: 35,
    originalPrice: 45,
    rating: 4.7,
    reviewCount: 156,
    weight: '500g',
    stock: 'In Stock',
    category: 'Vegetables',
    nutritionInfo: {
      calories: '41 kcal per 100g',
      protein: '0.9g',
      fiber: '2.8g',
      vitamins: ['A', 'K', 'C']
    },
    origin: 'Local Organic Farm',
    storageInfo: 'Store in cool, dry place',
    bestBefore: '7-10 days',
    isOrganic: true,
    discount: 22,
    tags: ['Sweet', 'Crunchy', 'Healthy']
  },
  {
    id: 5,
    name: 'Fresh Potatoes',
    image: 'https://static.toiimg.com/thumb/msid-117062364,width-1280,height-720,resizemode-4/117062364.jpg',
    description: 'Fresh and starchy potatoes, perfect for various cooking methods.',
    price: 25,
    originalPrice: 35,
    rating: 4.4,
    reviewCount: 98,
    weight: '1kg',
    stock: 'In Stock',
    category: 'Vegetables',
    nutritionInfo: {
      calories: '77 kcal per 100g',
      protein: '2g',
      fiber: '2.2g',
      vitamins: ['C', 'B6', 'Potassium']
    },
    origin: 'Local Farm',
    storageInfo: 'Store in cool, dark place',
    bestBefore: '14-21 days',
    isOrganic: true,
    discount: 29,
    tags: ['Fresh', 'Starchy', 'Versatile']
  },
  {
    id: 6,
    name: 'Fresh Onions',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzhedO1Fw_ZFossfuaEg0wC4ZPmmif8pqLUQ&s',
    description: 'Aromatic and flavorful onions, essential for cooking.',
    price: 30,
    originalPrice: 40,
    rating: 4.3,
    reviewCount: 87,
    weight: '1kg',
    stock: 'In Stock',
    category: 'Vegetables',
    nutritionInfo: {
      calories: '40 kcal per 100g',
      protein: '1.1g',
      fiber: '1.7g',
      vitamins: ['C', 'B6', 'Folate']
    },
    origin: 'Local Farm',
    storageInfo: 'Store in cool, dry place',
    bestBefore: '14-21 days',
    isOrganic: true,
    discount: 25,
    tags: ['Aromatic', 'Flavorful', 'Essential']
  }
];

const BestSellers = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-green-700 mb-4">
        Best Sellers of the Week
      </h2>
        <p className="text-gray-600 text-lg">
          Discover our most popular products loved by customers
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {bestSellerProducts.map((product) => {
          const discount = Math.round(
            ((product.originalPrice - product.price) / product.originalPrice) * 100
          );

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                  className="w-full h-64 object-cover"
                  onClick={() => setSelectedProduct(product)}
                />
                {product.discount > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    -{discount}%
                  </div>
                )}
                {product.isOrganic && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Organic
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                  <div className="flex items-center">
                    <FiStar className="text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{product.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Price and Weight */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-green-600">₹{product.price}</span>
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      ₹{product.originalPrice}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">{product.weight}</span>
                </div>

                {/* Additional Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <FiTruck className="mr-2" />
                    <span>{product.stock}</span>
                  </div>
                  {product.bestBefore && (
                    <div className="flex items-center text-sm text-gray-600">
                      <FiInfo className="mr-2" />
                      <span>Best Before: {product.bestBefore}</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
                  >
                    <FiShoppingCart className="mr-2" />
                    Add to Cart
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50"
                  >
                    <FiHeart />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50"
                  >
                    <FiShare2 />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-8 w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{selectedProduct.name}</h2>
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    <FiStar className="text-yellow-400 mr-1" />
                    <span className="font-medium">{selectedProduct.rating}</span>
                    <span className="text-gray-500 ml-1">({selectedProduct.reviewCount} reviews)</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">{selectedProduct.description}</p>

                {/* Nutrition Info */}
                {selectedProduct.nutritionInfo && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Nutrition Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Calories: {selectedProduct.nutritionInfo.calories}</p>
                        <p className="text-sm text-gray-600">Protein: {selectedProduct.nutritionInfo.protein}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Fiber: {selectedProduct.nutritionInfo.fiber}</p>
                        <p className="text-sm text-gray-600">
                          Vitamins: {selectedProduct.nutritionInfo.vitamins.join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Storage Info */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Storage Information</h3>
                  <p className="text-sm text-gray-600">{selectedProduct.storageInfo}</p>
                  <p className="text-sm text-gray-600">Best Before: {selectedProduct.bestBefore}</p>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-3xl font-bold text-green-600">₹{selectedProduct.price}</span>
                    <span className="ml-2 text-gray-500 line-through">
                      ₹{selectedProduct.originalPrice}
                    </span>
                  </div>
                  <span className="text-gray-600">{selectedProduct.weight}</span>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="px-6 py-3 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
      </div>
      )}
    </div>
  );
};

export default BestSellers;
