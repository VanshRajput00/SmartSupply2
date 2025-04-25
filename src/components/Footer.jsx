import React from 'react';
import { Link } from 'react-router-dom';
// Use Fi icons for consistency
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'; 

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    // Slightly lighter background, more padding
    <footer className="bg-gradient-to-t from-green-800 to-green-900 text-green-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

          {/* Company Overview */}
          <div className="md:col-span-2 lg:col-span-1">
             {/* Updated Logo Style */}
             <h3 className="text-2xl font-bold mb-4 tracking-tight text-white">
               Smart<span className="text-yellow-400">Supply</span>
             </h3>
             <p className="text-sm leading-relaxed text-green-200">
               AI-driven FMCG distribution platform empowering rural India through optimized supply chains and improved product accessibility.
             </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-yellow-400 transition duration-200">Home</Link></li>
              <li><Link to="/categories" className="hover:text-yellow-400 transition duration-200">Categories</Link></li>
              <li><Link to="/offers" className="hover:text-yellow-400 transition duration-200">Offers</Link></li>
              <li><Link to="/about" className="hover:text-yellow-400 transition duration-200">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-yellow-400 transition duration-200">Contact Us</Link></li>
              <li><Link to="/dashboard" className="hover:text-yellow-400 transition duration-200">Dashboard</Link></li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-white uppercase tracking-wider">Information</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/privacy-policy" className="hover:text-yellow-400 transition duration-200">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-yellow-400 transition duration-200">Terms & Conditions</Link></li>
              <li><Link to="/shipping" className="hover:text-yellow-400 transition duration-200">Shipping Policy</Link></li>
              <li><Link to="/returns" className="hover:text-yellow-400 transition duration-200">Return Policy</Link></li>
              <li><Link to="/faq" className="hover:text-yellow-400 transition duration-200">FAQ</Link></li>
              <li><Link to="/orders" className="hover:text-yellow-400 transition duration-200">My Orders</Link></li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-white uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                   <FiMail className="w-4 h-4 mr-2 mt-1 shrink-0 text-yellow-400" />
                   <a href="mailto:support@smartsupply.com" className="hover:text-yellow-400 transition duration-200">support@smartsupply.com</a>
                </li>
                <li className="flex items-start">
                   <FiPhone className="w-4 h-4 mr-2 mt-1 shrink-0 text-yellow-400" />
                   <a href="tel:+919876543210" className="hover:text-yellow-400 transition duration-200">+91 98765 43210</a>
                </li>
                <li className="flex items-start">
                   <FiMapPin className="w-4 h-4 mr-2 mt-1 shrink-0 text-yellow-400" />
                   <span>Chitkara University, Baddi, Himachal Pradesh, India</span>
                </li>
            </ul>
            {/* Social Media Links */}
            <div className="flex space-x-4 mt-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-green-200 hover:text-yellow-400 transition duration-200">
                <FiFacebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-green-200 hover:text-yellow-400 transition duration-200">
                <FiTwitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-green-200 hover:text-yellow-400 transition duration-200">
                <FiInstagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-green-200 hover:text-yellow-400 transition duration-200">
                <FiLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-green-700/50 pt-8 mt-8 text-center text-sm text-green-200">
          <p>&copy; {currentYear} <span className="font-semibold text-white">SmartSupply</span>. All rights reserved. Designed with care for rural empowerment.</p>
          {/* Optional: Keep secondary links here or remove if covered above 
          <div className="mt-4 flex justify-center space-x-6">
            <Link to="/privacy-policy" className="hover:text-yellow-400">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-yellow-400">Terms & Conditions</Link>
            <Link to="/support" className="hover:text-yellow-400">Support</Link>
          </div> 
          */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
