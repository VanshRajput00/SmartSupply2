import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { FiShoppingCart, FiHeart, FiShare2, FiInfo, FiStar, FiTruck, FiPackage } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const allProducts = [
  // Vegetables
  {
    id: 1,
    name: 'Fresh Tomatoes',
    image: 'https://burst.shopifycdn.com/photos/fresh-tomatoes-with-drops-of-water.jpg?exif=0&iptc=0',
    description: 'Organic farm-fresh tomatoes, rich in lycopene and vitamin C. Perfect for salads and cooking.',
    price: 48,
    originalPrice: 60,
    rating: 4.5,
    reviewCount: 128,
    weight: '500g',
    stock: 'In Stock',
    category: 'Vegetables',
    nutritionInfo: {
      calories: '18 kcal per 100g',
      protein: '0.9g',
      fiber: '1.2g',
      vitamins: ['C', 'K', 'A']
    },
    origin: 'Local Organic Farm',
    storageInfo: 'Store at room temperature',
    bestBefore: '5-7 days',
    isOrganic: true,
    discount: 20,
    tags: ['Fresh', 'Organic', 'Local']
  },
  {
    id: 2,
    name: 'Green Apples',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHZ6JXGGM6nzpv5Iriq1SW0LuPoobGW6ARpA&s',
    description: 'Crispy and sweet green apples, packed with fiber and antioxidants. Perfect for snacking.',
    price: 162,
    originalPrice: 180,
    rating: 4.8,
    reviewCount: 245,
    weight: '1kg',
    stock: 'In Stock',
    category: 'Fruits',
    nutritionInfo: {
      calories: '52 kcal per 100g',
      protein: '0.3g',
      fiber: '2.4g',
      vitamins: ['C', 'Fiber', 'Antioxidants']
    },
    origin: 'Himachal Pradesh',
    storageInfo: 'Store in cool, dry place',
    bestBefore: '10-14 days',
    isOrganic: true,
    discount: 10,
    tags: ['Crispy', 'Sweet', 'Healthy']
  },
  {
    id: 3,
    name: 'Fresh Oranges',
    image: 'https://www.allrecipes.com/thmb/y_uvjwXWAuD6T0RxaS19jFvZyFU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1205638014-2000-d0fbf9170f2d43eeb046f56eec65319c.jpg',
    description: 'Juicy farm-fresh oranges, rich in vitamin C. Perfect for fresh juice and snacking.',
    price: 95,
    originalPrice: 120,
    rating: 4.6,
    reviewCount: 189,
    weight: '1kg',
    stock: 'In Stock',
    category: 'Fruits',
    nutritionInfo: {
      calories: '47 kcal per 100g',
      protein: '0.9g',
      fiber: '2.4g',
      vitamins: ['C', 'Folate', 'Potassium']
    },
    origin: 'Nagpur Region',
    storageInfo: 'Store at room temperature',
    bestBefore: '7-10 days',
    isOrganic: true,
    discount: 21,
    tags: ['Juicy', 'Vitamin C', 'Fresh']
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
  },
  {
    id: 7,
    name: 'Fresh Garlic',
    image: 'https://5.imimg.com/data5/SELLER/Default/2020/11/LF/FT/WK/114902263/fresh-garlic.jpeg',
    description: 'Fresh and pungent garlic, perfect for flavoring dishes.',
    price: 40,
    originalPrice: 50,
    rating: 4.6,
    reviewCount: 112,
    weight: '250g',
    stock: 'In Stock',
    category: 'Vegetables',
    nutritionInfo: {
      calories: '149 kcal per 100g',
      protein: '6.4g',
      fiber: '2.1g',
      vitamins: ['C', 'B6', 'Manganese']
    },
    origin: 'Local Farm',
    storageInfo: 'Store in cool, dry place',
    bestBefore: '14-21 days',
    isOrganic: true,
    discount: 20,
    tags: ['Pungent', 'Flavorful', 'Healthy']
  },
  {
    id: 8,
    name: 'Fresh Ginger',
    image: 'https://assets.epicurious.com/photos/58d3fed8e2c8295cfbf4a52f/16:9/w_2560%2Cc_limit/ginger_root_pile_23032017.jpg',
    description: 'Fresh and aromatic ginger, perfect for cooking and health benefits.',
    price: 45,
    originalPrice: 60,
    rating: 4.7,
    reviewCount: 134,
    weight: '250g',
    stock: 'In Stock',
    category: 'Vegetables',
    nutritionInfo: {
      calories: '80 kcal per 100g',
      protein: '1.8g',
      fiber: '2g',
      vitamins: ['B6', 'Magnesium', 'Manganese']
    },
    origin: 'Local Farm',
    storageInfo: 'Store in cool, dry place',
    bestBefore: '14-21 days',
    isOrganic: true,
    discount: 25,
    tags: ['Aromatic', 'Healthy', 'Versatile']
  },
  {
    id: 9,
    name: 'Fresh Cucumbers',
    image: 'https://5.imimg.com/data5/SELLER/Default/2021/5/OH/JZ/GU/44009489/fresh-cucumbers.jpg',
    description: 'Fresh and crunchy cucumbers, perfect for salads and snacks.',
    price: 35,
    originalPrice: 45,
    rating: 4.5,
    reviewCount: 98,
    weight: '500g',
    stock: 'In Stock',
    category: 'Vegetables',
    nutritionInfo: {
      calories: '16 kcal per 100g',
      protein: '0.7g',
      fiber: '0.5g',
      vitamins: ['K', 'C', 'Potassium']
    },
    origin: 'Local Farm',
    storageInfo: 'Store in refrigerator',
    bestBefore: '5-7 days',
    isOrganic: true,
    discount: 22,
    tags: ['Fresh', 'Crunchy', 'Hydrating']
  },
  {
    id: 10,
    name: 'Fresh Bell Peppers',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwYkA_NSYCnXTVGM2go_fMLLynXthxckoGiQ&s',
    description: 'Colorful and crunchy bell peppers, rich in vitamins.',
    price: 60,
    originalPrice: 75,
    rating: 4.6,
    reviewCount: 145,
    weight: '500g',
    stock: 'In Stock',
    category: 'Vegetables',
    nutritionInfo: {
      calories: '31 kcal per 100g',
      protein: '1g',
      fiber: '2.1g',
      vitamins: ['C', 'A', 'B6']
    },
    origin: 'Local Farm',
    storageInfo: 'Store in refrigerator',
    bestBefore: '7-10 days',
    isOrganic: true,
    discount: 20,
    tags: ['Colorful', 'Crunchy', 'Nutritious']
  },
  {
    id: 11,
    name: 'Fresh Spinach',
    image: 'https://images.moneycontrol.com/static-mcnews/2023/07/Health-benefits-of-spinach-770x433.jpg?impolicy=website&width=770&height=431',
    description: 'Fresh and nutritious spinach, rich in iron and vitamins.',
    price: 40,
    originalPrice: 50,
    rating: 4.7,
    reviewCount: 167,
    weight: '250g',
    stock: 'In Stock',
    category: 'Vegetables',
    nutritionInfo: {
      calories: '23 kcal per 100g',
      protein: '2.9g',
      fiber: '2.2g',
      vitamins: ['K', 'A', 'C']
    },
    origin: 'Local Farm',
    storageInfo: 'Store in refrigerator',
    bestBefore: '3-5 days',
    isOrganic: true,
    discount: 20,
    tags: ['Nutritious', 'Fresh', 'Healthy']
  },
  {
    id: 12,
    name: 'Fresh Broccoli',
    image: 'https://www.allrecipes.com/thmb/01OsKBnYA8USlkV4Mqm6543C9fo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-691088799-2000-16d197c7cb4e4c48bb518e3931f52a98.jpg',
    description: 'Fresh and nutritious broccoli, rich in vitamins and fiber.',
    price: 55,
    originalPrice: 70,
    rating: 4.6,
    reviewCount: 123,
    weight: '500g',
    stock: 'In Stock',
    category: 'Vegetables',
    nutritionInfo: {
      calories: '34 kcal per 100g',
      protein: '2.8g',
      fiber: '2.6g',
      vitamins: ['C', 'K', 'A']
    },
    origin: 'Local Farm',
    storageInfo: 'Store in refrigerator',
    bestBefore: '5-7 days',
    isOrganic: true,
    discount: 21,
    tags: ['Nutritious', 'Fresh', 'Healthy']
  },
  {
    id: 13,
    name: 'Fresh Cauliflower',
    image: 'https://tiimg.tistatic.com/fp/1/007/796/natural-and-pure-raw-whole-fresh-cauliflower--700.jpg',
    description: 'Fresh and versatile cauliflower, perfect for various dishes.',
    price: 50,
    originalPrice: 65,
    rating: 4.5,
    reviewCount: 98,
    weight: '500g',
    stock: 'In Stock',
    category: 'Vegetables',
    nutritionInfo: {
      calories: '25 kcal per 100g',
      protein: '1.9g',
      fiber: '2g',
      vitamins: ['C', 'K', 'B6']
    },
    origin: 'Local Farm',
    storageInfo: 'Store in refrigerator',
    bestBefore: '5-7 days',
    isOrganic: true,
    discount: 23,
    tags: ['Versatile', 'Fresh', 'Healthy']
  },
  {
    id: 14,
    name: 'Fresh Green Beans',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8tqc1lJUVuDi6eVphhpId3MMGh3xIuMN8tw&s',
    description: 'Fresh and crunchy green beans, rich in fiber and vitamins.',
    price: 45,
    originalPrice: 60,
    rating: 4.4,
    reviewCount: 87,
    weight: '500g',
    stock: 'In Stock',
    category: 'Vegetables',
    nutritionInfo: {
      calories: '31 kcal per 100g',
      protein: '1.8g',
      fiber: '3.4g',
      vitamins: ['C', 'K', 'A']
    },
    origin: 'Local Farm',
    storageInfo: 'Store in refrigerator',
    bestBefore: '5-7 days',
    isOrganic: true,
    discount: 25,
    tags: ['Crunchy', 'Fresh', 'Healthy']
  },

  // Dairy Products
  {
    id: 15,
    name: 'Cheese Slices',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbz3B64eEV42B1c5WCOLG-ULqMoMrFT0-NoQ&s',
    description: 'Premium quality cheese slices, perfect for sandwiches and burgers.',
    price: 199,
    originalPrice: 249,
    rating: 4.7,
    reviewCount: 156,
    weight: '200g',
    stock: 'In Stock',
    category: 'Dairy',
    nutritionInfo: {
      calories: '350 kcal per 100g',
      protein: '25g',
      fat: '28g',
      calcium: '700mg'
    },
    origin: 'Local Dairy',
    storageInfo: 'Store in refrigerator',
    bestBefore: '30 days',
    isOrganic: false,
    discount: 20,
    tags: ['Cheese', 'Slices', 'Dairy']
  },
  {
    id: 16,
    name: 'Paneer',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmJm1z9OzYFrWAbhhFK6ZiVqPgHKgZDsiLwg&s',
    description: 'Fresh homemade paneer, perfect for curries and snacks.',
    price: 180,
    originalPrice: 200,
    rating: 4.8,
    reviewCount: 234,
    weight: '500g',
    stock: 'In Stock',
    category: 'Dairy',
    nutritionInfo: {
      calories: '265 kcal per 100g',
      protein: '18g',
      fat: '20g',
      calcium: '500mg'
    },
    origin: 'Local Dairy',
    storageInfo: 'Store in refrigerator',
    bestBefore: '3 days',
    isOrganic: true,
    discount: 10,
    tags: ['Paneer', 'Fresh', 'Dairy']
  },
  {
    id: 17,
    name: 'Whipped Cream',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVatVW7ru57KHshf-gqkuc5Ppkmam0RFvfrQ&s',
    description: 'Rich and creamy whipped cream for desserts and beverages.',
    price: 120,
    originalPrice: 150,
    rating: 4.6,
    reviewCount: 189,
    weight: '250ml',
    stock: 'In Stock',
    category: 'Dairy',
    nutritionInfo: {
      calories: '340 kcal per 100g',
      protein: '2.8g',
      fat: '35g',
      calcium: '100mg'
    },
    origin: 'Local Dairy',
    storageInfo: 'Store in refrigerator',
    bestBefore: '7 days',
    isOrganic: false,
    discount: 20,
    tags: ['Cream', 'Dessert', 'Dairy']
  },

  // Bakery Items
  {
    id: 18,
    name: 'Brown Bread',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjJAfppdNTp8GOYMmMA_HZypacPm5hGuz0XA&s',
    description: 'Freshly baked whole wheat brown bread, rich in fiber.',
    price: 45,
    originalPrice: 50,
    rating: 4.5,
    reviewCount: 145,
    weight: '400g',
    stock: 'In Stock',
    category: 'Bakery',
    nutritionInfo: {
      calories: '265 kcal per 100g',
      protein: '9g',
      fiber: '7g',
      carbohydrates: '49g'
    },
    origin: 'Local Bakery',
    storageInfo: 'Store in cool, dry place',
    bestBefore: '3 days',
    isOrganic: true,
    discount: 10,
    tags: ['Bread', 'Whole Wheat', 'Bakery']
  },
  {
    id: 19,
    name: 'Cookies',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrZ0ItwfU67-mfYuPLoUazVh4kesywJrGM3A&s',
    description: 'Delicious butter cookies with a perfect crunch.',
    price: 120,
    originalPrice: 150,
    rating: 4.7,
    reviewCount: 234,
    weight: '200g',
    stock: 'In Stock',
    category: 'Bakery',
    nutritionInfo: {
      calories: '500 kcal per 100g',
      protein: '5g',
      fat: '25g',
      carbohydrates: '65g'
    },
    origin: 'Local Bakery',
    storageInfo: 'Store in airtight container',
    bestBefore: '15 days',
    isOrganic: false,
    discount: 20,
    tags: ['Cookies', 'Snacks', 'Bakery']
  },
  {
    id: 20,
    name: 'Croissants',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbsItYVjUZsUhzzvIHyAQWSK2vZ81BUhOsow&s',
    description: 'Buttery and flaky French croissants, perfect for breakfast.',
    price: 60,
    originalPrice: 75,
    rating: 4.8,
    reviewCount: 189,
    weight: '100g',
    stock: 'In Stock',
    category: 'Bakery',
    nutritionInfo: {
      calories: '406 kcal per 100g',
      protein: '8g',
      fat: '21g',
      carbohydrates: '45g'
    },
    origin: 'Local Bakery',
    storageInfo: 'Store in cool, dry place',
    bestBefore: '2 days',
    isOrganic: false,
    discount: 20,
    tags: ['Croissant', 'Breakfast', 'Bakery']
  },

  // Snacks
  {
    id: 21,
    name: 'Organic Almonds',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkPrzWhJujGuPqFlI-AC6a9_zAaetUG_ffSw&s',
    price: 450,
    originalPrice: 500,
    rating: 4.9,
    reviewCount: 345,
    weight: '250g',
    stock: 'In Stock',
    category: 'Snacks',
    nutritionInfo: {
      calories: '576 kcal per 100g',
      protein: '21g',
      fat: '49g',
      fiber: '12g'
    },
    origin: 'California',
    storageInfo: 'Store in airtight container',
    bestBefore: '6 months',
    isOrganic: true,
    discount: 10,
    tags: ['Almonds', 'Organic', 'Snacks']
  },
  {
    id: 22,
    name: 'Mixed Nuts',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT-fbB1a0tp7BS5kNU9IxGVpEQSOHqc60QAw&s',
    price: 550,
    originalPrice: 600,
    rating: 4.8,
    reviewCount: 278,
    weight: '500g',
    stock: 'In Stock',
    category: 'Snacks',
    nutritionInfo: {
      calories: '607 kcal per 100g',
      protein: '20g',
      fat: '54g',
      fiber: '7g'
    },
    origin: 'Imported',
    storageInfo: 'Store in airtight container',
    bestBefore: '6 months',
    isOrganic: false,
    discount: 8,
    tags: ['Nuts', 'Healthy', 'Snacks']
  },
  {
    id: 23,
    name: 'Potato Chips',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvhIzX2-b7BZ-Wt1VjpDgF0iG3fYixkB2cMg&s',
    price: 30,
    originalPrice: 35,
    rating: 4.6,
    reviewCount: 456,
    weight: '50g',
    stock: 'In Stock',
    category: 'Snacks',
    nutritionInfo: {
      calories: '536 kcal per 100g',
      protein: '7g',
      fat: '35g',
      carbohydrates: '53g'
    },
    origin: 'Local',
    storageInfo: 'Store in cool, dry place',
    bestBefore: '3 months',
    isOrganic: false,
    discount: 14,
    tags: ['Chips', 'Snacks', 'Crispy']
  }
];

const categories = ['All', 'Vegetables', 'Fruits', 'Dairy', 'Bakery', 'Snacks'];
const sortingOptions = ['Default', 'Price Low to High', 'Price High to Low', 'Rating', 'Most Popular'];

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('Default');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [bulkQuantities, setBulkQuantities] = useState({});
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [selectedBulkProduct, setSelectedBulkProduct] = useState(null);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleBulkOrder = (product) => {
    setSelectedBulkProduct(product);
    setShowBulkModal(true);
  };

  const handleBulkQuantityChange = (productId, value) => {
    setBulkQuantities(prev => ({
      ...prev,
      [productId]: value
    }));
  };

  const handleBulkAddToCart = () => {
    if (selectedBulkProduct && bulkQuantities[selectedBulkProduct.id]) {
      const quantity = parseInt(bulkQuantities[selectedBulkProduct.id]);
      if (quantity > 0) {
        const bulkOrder = {
          ...selectedBulkProduct,
          quantity,
          isBulkOrder: true,
          totalPrice: selectedBulkProduct.price * quantity
        };
        addToCart(bulkOrder);
        setShowBulkModal(false);
        setBulkQuantities(prev => ({
          ...prev,
          [selectedBulkProduct.id]: ''
        }));
      } else {
        toast.error('Please enter a valid quantity');
      }
    }
  };

  const filteredProducts = selectedCategory === 'All'
    ? allProducts
    : allProducts.filter((product) => product.category === selectedCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'Price Low to High') return a.price - b.price;
    if (sortOption === 'Price High to Low') return b.price - a.price;
    if (sortOption === 'Rating') return b.rating - a.rating;
    if (sortOption === 'Most Popular') return b.reviewCount - a.reviewCount;
    return 0;
  });

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
          Explore All Categories
        </h1>

        {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((category) => (
            <motion.button
            key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full border-2 transition-all duration-300 ${
                selectedCategory === category 
                ? 'bg-green-600 text-white border-green-600' 
                : 'bg-white text-green-600 border-green-600 hover:bg-green-50'
              }`}
          >
            {category}
            </motion.button>
        ))}
      </div>

        {/* Sorting and Filters */}
        <div className="flex flex-wrap items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
              className="px-4 py-2 border-2 border-green-600 rounded-lg text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {sortingOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sortedProducts.map((product) => {
            const discount = Math.round(
              ((product.originalPrice - product.price) / product.originalPrice) * 100
            );

            return (
              <motion.div
            key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                onHoverStart={() => setHoveredProduct(product.id)}
                onHoverEnd={() => setHoveredProduct(null)}
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
                      {product.originalPrice && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
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
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBulkOrder(product);
                      }}
                      className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                    >
                      <FiPackage className="mr-2" />
                      Bulk Order
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
                      {selectedProduct.originalPrice && (
                        <span className="ml-2 text-gray-500 line-through">
                          ₹{selectedProduct.originalPrice}
                        </span>
                      )}
                    </div>
                    <span className="text-gray-600">{selectedProduct.weight}</span>
                  </div>

                  {/* Modal Buttons */}
                  <div className="flex gap-4 mt-8">
            <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(selectedProduct);
                setSelectedProduct(null);
              }}
                      className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
            >
                      <FiShoppingCart className="mr-2" /> Add to Cart
            </button>
            <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(null);
                      }}
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

      {/* Bulk Order Modal */}
      {showBulkModal && selectedBulkProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-8 w-11/12 max-w-md"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Bulk Order - {selectedBulkProduct.name}</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  value={bulkQuantities[selectedBulkProduct.id] || ''}
                  onChange={(e) => handleBulkQuantityChange(selectedBulkProduct.id, e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter quantity"
                />
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Unit Price:</span>
                    <span className="font-medium">₹{selectedBulkProduct.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quantity:</span>
                    <span className="font-medium">{bulkQuantities[selectedBulkProduct.id] || 0}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2">
                    <div className="flex justify-between">
                      <span className="text-gray-800 font-semibold">Total Price:</span>
                      <span className="text-green-600 font-bold">
                        ₹{(selectedBulkProduct.price * (bulkQuantities[selectedBulkProduct.id] || 0)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleBulkAddToCart}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Add to Cart
              </button>
              <button
                onClick={() => setShowBulkModal(false)}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
      </div>
    </section>
  );
};

export default Categories;
