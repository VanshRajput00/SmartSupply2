import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiTruck, FiPackage, FiUsers, FiDollarSign, FiArrowRight } from 'react-icons/fi';

const SpecialOffers = () => {
  const [activeOffer, setActiveOffer] = useState(0);

  const bulkOffers = [
    {
      id: 1,
      title: "Organic Vegetables Bulk Order",
      description: "Direct from Ramesh's farm in Punjab. Minimum order: 100kg. Special rates for restaurants and grocery stores.",
      image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80",
      discount: "15% OFF",
      category: "Vegetables",
      farmer: "Ramesh Kumar",
      location: "Punjab",
      minOrder: "100kg",
      delivery: "Free delivery for orders above 500kg"
    },
    {
      id: 2,
      title: "Fresh Dairy Products Subscription",
      description: "Monthly subscription from Green Valley Dairy. Regular deliveries of fresh milk, curd, and paneer.",
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      discount: "20% OFF",
      category: "Dairy",
      farmer: "Green Valley Dairy",
      location: "Haryana",
      minOrder: "Monthly subscription",
      delivery: "Daily delivery available"
    },
    {
      id: 3,
      title: "Seasonal Fruits Wholesale",
      description: "Premium quality fruits from Sunrise Fruits. Perfect for juice bars and fruit vendors.",
      image: "https://images.unsplash.com/photo-1519996529931-28324d5a630e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      discount: "25% OFF",
      category: "Fruits",
      farmer: "Sunrise Fruits",
      location: "Himachal Pradesh",
      minOrder: "50kg",
      delivery: "Next day delivery"
    }
  ];

  const benefits = [
    {
      icon: <FiTruck className="w-6 h-6" />,
      title: "Direct from Farm",
      description: "Fresh produce delivered directly from verified farmers"
    },
    {
      icon: <FiPackage className="w-6 h-6" />,
      title: "Bulk Discounts",
      description: "Special pricing for bulk orders and subscriptions"
    },
    {
      icon: <FiUsers className="w-6 h-6" />,
      title: "Verified Farmers",
      description: "All our farmers are quality verified and trusted"
    },
    {
      icon: <FiDollarSign className="w-6 h-6" />,
      title: "Fair Pricing",
      description: "Competitive prices that benefit both farmers and buyers"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Bulk Ordering Opportunities
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Connect directly with farmers and get the best deals on bulk orders
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => (
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

        {/* Offers Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bulkOffers.map((offer) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="relative h-48">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-yellow-400 text-green-900 px-3 py-1 rounded-full font-semibold">
                    {offer.discount}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{offer.title}</h3>
                <p className="text-gray-600 mb-4">{offer.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Farmer</p>
                    <p className="font-medium">{offer.farmer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{offer.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Minimum Order</p>
                    <p className="font-medium">{offer.minOrder}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Delivery</p>
                    <p className="font-medium">{offer.delivery}</p>
                  </div>
                </div>

                <Link
                  to={`/bulk-orders/${offer.id}`}
                  className="mt-4 inline-flex items-center justify-center w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200"
                >
                  Place Bulk Order
                  <FiArrowRight className="ml-2" />
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
            View All Bulk Ordering Options
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
