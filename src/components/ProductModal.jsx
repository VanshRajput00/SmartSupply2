import React from "react";

const ProductModal = ({ product, closeModal, addToCart }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
        <img src={product.image} alt={product.name} className="w-full h-56 object-cover rounded-lg" />
        <h2 className="text-2xl font-bold mt-4">{product.name}</h2>
        <p className="text-gray-700 my-2">{product.description}</p>
        <div className="flex items-center">
          <span className="text-green-500 font-bold text-xl">₹{product.price}</span>
          <span className="line-through text-gray-400 ml-3">₹{product.originalPrice}</span>
        </div>
        <div className="flex mt-4 justify-between">
          <button onClick={closeModal} className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md">
            Close
          </button>
          <button onClick={() => addToCart(product)} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
