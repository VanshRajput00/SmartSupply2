import React from 'react';

const Card = ({ product }) => {
  if (!product) return null; // Prevent crashing if product is undefined

  const discountedPrice = product.price - (product.price * product.discount) / 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-all duration-300 w-72">
      <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{product.title}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">{product.description}</p>

        <div className="flex items-center mt-2">
          {[...Array(product.rating)].map((_, i) => (
            <span key={i} className="text-yellow-400">★</span>
          ))}
          {[...Array(5 - product.rating)].map((_, i) => (
            <span key={i} className="text-gray-400">★</span>
          ))}
        </div>

        <div className="mt-2">
          <span className="text-green-600 font-bold">₹{discountedPrice.toLocaleString()}</span>
          <span className="line-through text-gray-500 ml-2">₹{product.price.toLocaleString()}</span>
          <span className="ml-2 text-red-500">-{product.discount}%</span>
        </div>

        <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">Add to Cart</button>
      </div>
    </div>
  );
};

export default Card;
