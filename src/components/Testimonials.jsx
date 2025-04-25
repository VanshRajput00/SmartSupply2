import React from 'react';
import { FiStar } from 'react-icons/fi';
import { motion } from 'framer-motion';

const testimonialsData = [
  {
    name: "Priya Sharma",
    location: "Rural Village A",
    feedback: "The quality of vegetables is outstanding! So fresh and delivered right on time. SmartSupply has made a big difference.",
    rating: 5,
  },
  {
    name: "Rajesh Kumar",
    location: "Township B",
    feedback: "Finally, a reliable source for organic produce in our area. The app is easy to use, and the service is excellent.",
    rating: 4,
  },
  {
    name: "Anita Singh",
    location: "Remote Hamlet C",
    feedback: "Getting fresh dairy and bakery items was always a challenge. SmartSupply delivers consistently. Highly recommend!",
    rating: 5,
  },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-bold text-green-800 sm:text-4xl mb-4">
            Voices of Our Community
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear directly from customers who benefit from reliable access to fresh supplies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl shadow-lg p-8 flex flex-col items-center text-center border border-green-100"
            >
              <p className="text-gray-700 italic mb-5 flex-grow text-lg">
                 <span className="text-3xl text-green-300 font-serif leading-none mr-1">“</span>
                 {testimonial.feedback}
                 <span className="text-3xl text-green-300 font-serif leading-none ml-1">”</span>
              </p>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <FiStar 
                    key={i} 
                    className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <p className="font-semibold text-green-800 mt-2">{testimonial.name}</p>
              <p className="text-sm text-gray-500">{testimonial.location}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
