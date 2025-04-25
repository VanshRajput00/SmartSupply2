import React from 'react';

const HeroBanner = () => {
  return (
    <section className="bg-cover bg-center h-96 flex items-center justify-center text-white text-center px-6"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=1500&q=60')" }}>
      <div className="bg-black bg-opacity-50 p-6 rounded-lg">
        <h2 className="text-3xl md:text-5xl font-bold">Fresh Organic Produce</h2>
        <p className="mt-2 text-lg">Get the best quality organic vegetables & fruits</p>
        <button className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-700 text-white font-semibold rounded">
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default HeroBanner;
