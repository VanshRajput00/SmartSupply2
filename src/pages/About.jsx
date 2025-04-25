import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiTruck, FiMapPin, FiTrendingUp, FiAward, FiShield, FiTarget, FiGlobe, FiBarChart2 } from 'react-icons/fi';

export default function About() {
  const stats = [
    { icon: <FiUsers className="text-4xl" />, label: "Happy Customers", value: "10,000+" },
    { icon: <FiTruck className="text-4xl" />, label: "Deliveries Made", value: "50,000+" },
    { icon: <FiMapPin className="text-4xl" />, label: "Cities Covered", value: "100+" },
    { icon: <FiTrendingUp className="text-4xl" />, label: "Growth Rate", value: "200%" },
  ];

  const features = [
    {
      icon: <FiTarget className="text-4xl" />,
      title: "AI-Powered Forecasting",
      description: "Advanced algorithms predict demand patterns and optimize inventory levels."
    },
    {
      icon: <FiGlobe className="text-4xl" />,
      title: "Rural Reach",
      description: "Connecting remote villages with essential goods through our extensive network."
    },
    {
      icon: <FiBarChart2 className="text-4xl" />,
      title: "Data Analytics",
      description: "Real-time insights to drive better decision-making and operational efficiency."
    }
  ];

  const values = [
    {
      icon: <FiAward className="text-4xl" />,
      title: "Excellence",
      description: "We strive for excellence in every aspect of our service."
    },
    {
      icon: <FiShield className="text-4xl" />,
      title: "Integrity",
      description: "We maintain the highest standards of integrity and transparency."
    },
    {
      icon: <FiUsers className="text-4xl" />,
      title: "Community",
      description: "We believe in building strong, sustainable communities."
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-r from-green-600 to-green-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1500&q=80')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-6xl font-bold mb-6">About SmartSupply</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Revolutionizing FMCG distribution in rural India through AI-powered solutions and sustainable practices.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 -mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-xl shadow-xl text-center transform transition-all duration-300 hover:shadow-2xl"
              >
                <div className="text-green-600 mb-4">{stat.icon}</div>
                <h3 className="text-4xl font-bold text-gray-800 mb-2">{stat.value}</h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Key Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover how we're transforming rural distribution with cutting-edge technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="bg-gray-50 p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-2xl"
              >
                <div className="text-green-600 mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6 bg-white p-8 rounded-xl shadow-lg"
            >
              <h2 className="text-3xl font-bold text-gray-800">Our Vision</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                We envision building a seamless supply chain network where artificial intelligence and real-time analytics empower local retailers,
                bridge the urban-rural gap, and create sustainable distribution channels that boost rural economies.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6 bg-white p-8 rounded-xl shadow-lg"
            >
              <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                To revolutionize rural FMCG distribution by leveraging cutting-edge technology, data-driven insights,
                and sustainable practices to ensure timely delivery of essential goods to every corner of rural India.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide our decisions and actions every day
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gray-50 p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-2xl"
              >
                <div className="text-green-600 mb-6">{value.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1500&q=80')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold">Join Us in Our Mission</h2>
            <p className="text-xl max-w-2xl mx-auto">
              Be part of the revolution in rural FMCG distribution. Together, we can make a difference.
            </p>
            <button className="bg-white text-green-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition transform hover:scale-105">
              Get Started
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
  