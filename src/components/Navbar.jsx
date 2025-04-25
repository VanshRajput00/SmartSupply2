import React, { useState } from 'react';
import { FiMenu, FiX, FiShoppingCart, FiPackage, FiSearch } from 'react-icons/fi';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { AnimatePresence, motion } from 'framer-motion';
import Profile from './Profile';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();

  const navLinkStyle = ({ isActive }) => 
    isActive ? "text-yellow-400 font-semibold" : "hover:text-yellow-300 transition duration-200";

  return (
    <nav className="bg-gradient-to-r from-green-700 to-green-800 text-white px-4 sm:px-6 py-3 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tight">
          Smart<span className="text-yellow-400">Supply</span>
        </Link>

        {/* Links - Desktop */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <NavLink to="/" className={navLinkStyle}>Home</NavLink>
          <NavLink to="/categories" className={navLinkStyle}>Categories</NavLink>
          <NavLink to="/offers" className={navLinkStyle}>Offers</NavLink>
          <NavLink to="/dashboard" className={navLinkStyle}>Dashboard</NavLink>
          <NavLink to="/about" className={navLinkStyle}>About Us</NavLink>
          <NavLink to="/contact" className={navLinkStyle}>Contact</NavLink>
        </div>

        {/* Right Icons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <NavLink to="/orders" className={({isActive}) => `${navLinkStyle({isActive})} relative p-2 rounded-full hover:bg-green-700/50`} title="My Orders">
            <FiPackage size={20} />
          </NavLink>
          <NavLink to="/cart" className={({isActive}) => `${navLinkStyle({isActive})} relative p-2 rounded-full hover:bg-green-700/50`} title="Shopping Cart">
            <FiShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 block h-4 w-4 rounded-full ring-2 ring-green-800 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </NavLink>
          <Profile />
        </div>

        {/* Hamburger - Mobile */}
        <div className="md:hidden flex items-center space-x-3">
          <NavLink to="/cart" className="relative p-2 md:hidden" title="Shopping Cart">
            <FiShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 block h-4 w-4 rounded-full ring-2 ring-green-800 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </NavLink>
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2">
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden flex flex-col space-y-3 px-4 pt-4 pb-5 border-t border-green-600/50"
          >
            <NavLink to="/" className={navLinkStyle} onClick={() => setMenuOpen(false)}>Home</NavLink>
            <NavLink to="/categories" className={navLinkStyle} onClick={() => setMenuOpen(false)}>Categories</NavLink>
            <NavLink to="/offers" className={navLinkStyle} onClick={() => setMenuOpen(false)}>Offers</NavLink>
            <NavLink to="/dashboard" className={navLinkStyle} onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
            <NavLink to="/orders" className={navLinkStyle} onClick={() => setMenuOpen(false)}>My Orders</NavLink>
            <NavLink to="/about" className={navLinkStyle} onClick={() => setMenuOpen(false)}>About Us</NavLink>
            <NavLink to="/contact" className={navLinkStyle} onClick={() => setMenuOpen(false)}>Contact</NavLink>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
