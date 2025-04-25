import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroBanner from "./components/HeroBanner";
import BestSellers from "./components/BestSellers";
import CategoryPreview from "./components/CategoryPreview";
import SpecialOffers from "./components/SpecialOffers";
import Testimonials from "./components/Testimonials";
import WhyChooseUs from "./components/WhyChooseUs";
import Newsletter from "./components/Newsletter";
import Offers from "./components/Offers";
import FarmerDetails from './components/FarmerDetails';
import BulkOrder from './components/BulkOrder';

import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";

import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Categories from "./components/Categories";

function App() {
  return (
    <>
      <Navbar />
      <ToastContainer />
      <main className="pt-0">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/farmers/:id" element={<FarmerDetails />} />
          <Route path="/bulk-orders/:id" element={<BulkOrder />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

// Animation variants for sections
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

// Home Page Layout
function HomePage() {
  return (
    <div className="flex flex-col space-y-16 md:space-y-24 overflow-x-hidden">
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <HeroBanner />
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <BestSellers />
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <CategoryPreview />
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <SpecialOffers />
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Testimonials />
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <WhyChooseUs />
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="pb-16 md:pb-24"
      >
        <Newsletter />
      </motion.section>
    </div>
  );
}

export default App;
