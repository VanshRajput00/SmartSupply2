import React from 'react';
import { FiThumbsUp, FiTruck, FiBarChart2 } from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <FaLeaf className="w-8 h-8 text-green-600 group-hover:text-white transition-colors duration-300" />,
    title: "Guaranteed Freshness",
    description: "Sourced directly from local farms daily, ensuring peak freshness and flavor for your table."
  },
  {
    icon: <FiThumbsUp className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />,
    title: "Quality You Can Trust",
    description: "Rigorous quality checks at every step guarantee that only the best products reach you."
  },
  {
    icon: <FiTruck className="w-8 h-8 text-orange-600 group-hover:text-white transition-colors duration-300" />,
    title: "Reliable Rural Delivery",
    description: "Our dedicated logistics network ensures consistent and timely delivery, connecting every corner."
  },
  {
    icon: <FiBarChart2 className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors duration-300" />,
    title: "AI-Powered Efficiency",
    description: "Smart demand forecasting and route optimization minimize waste and enhance service speed."
  }
];

const featureVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut"
    }
  })
};

const WhyChooseUs = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
       {/* Subtle background pattern - Example using SVG */}
       <div className="absolute inset-0 opacity-[0.03]" style={{
           backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
       }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-bold text-green-800 sm:text-4xl mb-4">
            Why Choose SmartSupply?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We are committed to bridging the gap between quality produce and rural communities through technology and trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={featureVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="group bg-white rounded-xl shadow-lg border border-gray-100 p-8 text-center transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 hover:border-green-300"
            >
              {/* Updated Icon Presentation */}
              <div className="mb-6 inline-flex items-center justify-center p-4 bg-green-100 rounded-full group-hover:bg-green-600 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-green-700 transition-colors duration-300">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
