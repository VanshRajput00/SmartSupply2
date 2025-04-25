import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiTruck, FiPackage, FiUsers, FiDollarSign } from 'react-icons/fi';

const Offers = () => {
  const farmerStories = [
    {
      id: 1,
      title: "Ramesh's Organic Farm",
      description: "From struggling to sell his produce to becoming a top supplier on SmartSupply. Ramesh now sells 500kg of organic vegetables weekly.",
      image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80",
      location: "Punjab",
      products: "Organic Vegetables",
      success: "500kg weekly sales",
      discount: "Bulk orders: 15% off"
    },
    {
      id: 2,
      title: "Green Valley Dairy",
      description: "A small dairy farm that expanded its reach through SmartSupply. Now supplying fresh dairy products to 50+ businesses.",
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      location: "Haryana",
      products: "Fresh Dairy Products",
      success: "50+ business clients",
      discount: "Monthly subscription: 20% off"
    },
    {
      id: 3,
      title: "Sunrise Fruits",
      description: "A family-owned orchard that found new markets through our platform. Specializing in seasonal fruits with guaranteed freshness.",
      image: "https://images.unsplash.com/photo-1519996529931-28324d5a630e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      location: "Himachal Pradesh",
      products: "Seasonal Fruits",
      success: "300+ orders monthly",
      discount: "First order: 25% off"
    }
  ];

  const bulkOrderingBenefits = [
    {
      icon: <FiTruck className="w-6 h-6" />,
      title: "Direct from Farm",
      description: "Get fresh produce directly from verified farmers, cutting out middlemen"
    },
    {
      icon: <FiPackage className="w-6 h-6" />,
      title: "Bulk Discounts",
      description: "Special pricing for bulk orders, helping you save on your purchases"
    },
    {
      icon: <FiUsers className="w-6 h-6" />,
      title: "Verified Suppliers",
      description: "All our farmers and suppliers are thoroughly verified for quality"
    },
    {
      icon: <FiDollarSign className="w-6 h-6" />,
      title: "Fair Pricing",
      description: "Transparent pricing that benefits both farmers and buyers"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Farmer Success Stories & Bulk Ordering
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover how SmartSupply is transforming the lives of farmers and enabling bulk ordering for businesses
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {bulkOrderingBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="text-yellow-400 mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Farmer Stories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {farmerStories.map((story) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="relative h-48">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-xl font-bold text-white">{story.title}</h3>
                  <p className="text-yellow-400">{story.location}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{story.description}</p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Products</p>
                    <p className="font-medium">{story.products}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Success</p>
                    <p className="font-medium">{story.success}</p>
                  </div>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <p className="text-yellow-600 font-semibold">{story.discount}</p>
                </div>
                <Link
                  to={`/farmers/${story.id}`}
                  className="mt-4 inline-block w-full text-center bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Link
            to="/bulk-orders"
            className="inline-block bg-yellow-400 text-gray-900 py-3 px-8 rounded-lg font-semibold hover:bg-yellow-500 transition duration-200"
          >
            Start Bulk Ordering
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Offers;
