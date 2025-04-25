import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FiShoppingCart, FiTruck, FiPackage } from "react-icons/fi";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch product details based on ID
    // For now using mock data
    setProduct({
      id,
      name: "Fresh Organic Tomatoes",
      price: 25.99,
      description: "Fresh, locally sourced organic tomatoes.",
      image: "/images/products/tomatoes.jpg",
      stock: 50,
      farmerId: "farmer123"
    });
  }, [id]);

  const handleAddToCart = () => {
    // Add to cart logic here
    toast.success("Added to cart successfully!");
  };

  const handleBulkOrder = () => {
    navigate(`/bulk-orders/${id}`);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[400px] object-cover rounded-lg shadow-lg"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-2xl text-green-600 font-semibold">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-600">{product.description}</p>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-1 border rounded-md"
            >
              -
            </button>
            <span className="text-xl">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-1 border rounded-md"
            >
              +
            </button>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300"
            >
              <FiShoppingCart className="mr-2" />
              Add to Cart
            </button>

            <button
              onClick={handleBulkOrder}
              className="flex items-center justify-center w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              <FiPackage className="mr-2" />
              Place Bulk Order
            </button>
          </div>

          <div className="border-t pt-4 mt-6">
            <div className="flex items-center space-x-2 text-gray-600">
              <FiTruck />
              <span>Free delivery on orders above $100</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetails;
