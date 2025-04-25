import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiBox, FiShoppingBag, FiCoffee, FiCpu } from 'react-icons/fi'; // Example icons

// Sample categories for the preview
const previewCategories = [
  {
    name: 'Vegetables',
    icon: <FiShoppingBag className="w-12 h-12 text-green-600 mb-4" />,
    description: 'Farm-fresh and organic veggies.',
    link: '/categories?filter=Vegetables' // Link to filtered categories page
  },
  {
    name: 'Fruits',
    icon: <FiCoffee className="w-12 h-12 text-red-600 mb-4" />,
    description: 'Juicy and sweet seasonal fruits.',
    link: '/categories?filter=Fruits'
  },
  {
    name: 'Dairy',
    icon: <FiBox className="w-12 h-12 text-blue-600 mb-4" />,
    description: 'Fresh milk, cheese, and more.',
    link: '/categories?filter=Dairy'
  },
  {
    name: 'Snacks',
    icon: <FiCpu className="w-12 h-12 text-yellow-600 mb-4" />,
    description: 'Healthy and tasty snack options.',
    link: '/categories?filter=Snacks'
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5
    }
  })
};

const CategoryPreview = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-800 sm:text-4xl mb-4">
            Explore Our Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find everything you need, from fresh produce to pantry staples, all sourced responsibly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {previewCategories.map((category, index) => (
            <motion.div
              key={category.name}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-8 text-center flex flex-col items-center hover:shadow-xl transition-shadow duration-300"
            >
              {category.icon}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h3>
              <p className="text-gray-500 text-sm mb-6 flex-grow">{category.description}</p>
              <Link 
                to={category.link}
                className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-800 group"
              >
                Shop Now 
                <FiArrowRight className="ml-1 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/categories"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 transition duration-300"
          >
            View All Categories
            <FiArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryPreview; 