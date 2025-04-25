import React, { useState } from 'react';
import { FiMail, FiSend } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.warn("Please enter your email address.");
      return;
    }
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Subscribing with email:", email);
      toast.success(`Thank you for subscribing, ${email}!`);
      setEmail('');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-green-600 to-teal-700 text-white relative overflow-hidden">
      {/* Background shapes/patterns (optional enhancement) */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full transform -translate-x-1/4 -translate-y-1/4 opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full transform translate-x-1/4 translate-y-1/4 opacity-50"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <FiMail className="mx-auto h-12 w-12 text-yellow-300 mb-4" />
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">
            Stay Updated with Fresh News
          </h2>
          <p className="text-lg text-green-100 max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter for the latest updates on new arrivals, special offers, and sustainable farming practices.
          </p>
          
          <form 
            onSubmit={handleSubmit}
            className="mt-8 max-w-xl mx-auto flex flex-col sm:flex-row gap-3"
          >
            <label htmlFor="email-address" className="sr-only">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none min-w-0 w-full bg-white/90 border border-transparent rounded-lg py-3 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white focus:border-white focus:placeholder-gray-400 disabled:opacity-70"
              placeholder="Enter your email address"
              disabled={isSubmitting}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto flex-shrink-0 rounded-lg bg-yellow-400 px-6 py-3 text-base font-semibold text-green-900 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-yellow-400 transition duration-300 shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                <span className="flex items-center">
                  Subscribe <FiSend className="ml-2 w-5 h-5"/>
                </span>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
