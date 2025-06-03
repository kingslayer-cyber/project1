import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Facebook, Twitter, Instagram, MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-800 text-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Utensils className="h-8 w-8 text-primary-500" />
              <span className="font-bold text-xl text-white">FoodHub</span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Delicious food delivered to your doorstep. Browse through our selection of restaurants and cuisines to find your perfect meal.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-neutral-400 hover:text-primary-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary-500 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-400 hover:text-primary-500 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/restaurants" className="text-neutral-400 hover:text-primary-500 transition-colors text-sm">
                  All Restaurants
                </Link>
              </li>
              <li>
                <Link to="/user/orders" className="text-neutral-400 hover:text-primary-500 transition-colors text-sm">
                  Order History
                </Link>
              </li>
              <li>
                <Link to="/user/profile" className="text-neutral-400 hover:text-primary-500 transition-colors text-sm">
                  My Account
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Support */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Customer Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-neutral-400 hover:text-primary-500 transition-colors text-sm">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-primary-500 transition-colors text-sm">
                  Delivery Information
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-primary-500 transition-colors text-sm">
                  Refund Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-primary-500 transition-colors text-sm">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-primary-500 transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-neutral-400 text-sm">
                  123 Delivery Street, Food City, FC 12345
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-primary-500 mr-2 flex-shrink-0" />
                <span className="text-neutral-400 text-sm">
                  +1 (555) 123-4567
                </span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-primary-500 mr-2 flex-shrink-0" />
                <span className="text-neutral-400 text-sm">
                  support@foodhub.com
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 mt-12 pt-8">
          <p className="text-sm text-neutral-400 text-center">
            &copy; {new Date().getFullYear()} FoodHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;