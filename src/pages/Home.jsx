import HeroBanner from "../components/HeroBanner";
import BestSellers from "../components/BestSellers";
import Categories from "../components/Categories";
import SpecialOffers from "../components/SpecialOffers";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";

export default function Home() {
  return (
    <main className="bg-gray-50 text-gray-800 overflow-x-hidden">

      {/* Hero Banner */}
      <HeroBanner />

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-6 py-20 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg shadow-lg">
        <h2 className="text-4xl font-extrabold mb-4 text-center text-gray-800">Explore Our Categories</h2>
        <p className="text-center text-lg text-gray-600 mb-10">Browse through our wide range of fresh organic products, carefully categorized for your convenience.</p>
        <Categories />
        {/* Wishlist / Filter Buttons (Future Functionalities) */}
        <div className="flex justify-center gap-6 mt-8">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md shadow hover:bg-blue-700">Sort by Price</button>
          <button className="bg-red-600 text-white px-6 py-3 rounded-md shadow hover:bg-red-700">Wishlist</button>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="max-w-7xl mx-auto px-6 py-20 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-4xl font-extrabold text-gray-800">Best Sellers</h2>
            <p className="text-gray-600 mt-2">Most loved products by our customers. Grab yours now!</p>
          </div>
          <button className="bg-green-600 text-white px-6 py-3 rounded-md shadow hover:bg-green-700">View All Products</button>
        </div>
        <BestSellers />
      </section>

      {/* Special Offers */}
      <section className="max-w-7xl mx-auto px-6 py-20 bg-gradient-to-br from-yellow-50 to-pink-50 rounded-lg shadow-lg">
        <h2 className="text-4xl font-extrabold mb-4 text-center text-gray-800">Special Offers 🎉</h2>
        <p className="text-center text-lg text-gray-600 mb-10">Don’t miss out on our exclusive deals and discounts!</p>
        <SpecialOffers />
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-6 py-20 bg-white rounded-lg shadow-lg">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-800">Why Choose Us?</h2>
        <p className="text-center text-lg text-gray-600 mb-10">Trusted by thousands, offering the best quality at unbeatable prices.</p>
        <WhyChooseUs />
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-6 py-20 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-800">What Our Clients Say ❤️</h2>
        <p className="text-center text-lg text-gray-600 mb-10">Real reviews from our valued customers.</p>
        <Testimonials />
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-6 py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg shadow-lg">
        <h2 className="text-4xl font-extrabold mb-6 text-center">Stay Updated with Our Latest Deals</h2>
        <p className="text-center text-lg mb-10">Subscribe to our newsletter and never miss out on amazing offers.</p>
        <Newsletter />
      </section>

      {/* Back to Top (Optional Complex Functionality) */}
      <div className="fixed bottom-8 right-8">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
        >
          ↑
        </button>
      </div>
    </main>
  );
}
