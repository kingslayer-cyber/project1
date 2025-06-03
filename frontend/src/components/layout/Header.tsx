import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, Utensils, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location]);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Utensils className="h-8 w-8 text-primary-500" />
            <span className="font-bold text-xl text-neutral-900">FoodHub</span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-neutral-700 hover:text-primary-500 px-3 py-2 text-sm font-medium">
              Home
            </Link>
            <Link to="/restaurants" className="text-neutral-700 hover:text-primary-500 px-3 py-2 text-sm font-medium">
              Restaurants
            </Link>
          </nav>
          
          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/cart" 
              className="text-neutral-700 hover:text-primary-500 relative"
            >
              <ShoppingBag className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-1 text-sm font-medium text-neutral-700 hover:text-primary-500"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary-500" />
                  </div>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                    <div className="px-4 py-2 text-sm text-neutral-700">
                      {user?.name}
                    </div>
                    <Link
                      to="/user/profile"
                      className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                    >
                      Your Profile
                    </Link>
                    <Link
                      to="/user/orders"
                      className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                    >
                      Order History
                    </Link>
                    {user?.role === 'restaurant' && (
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                      >
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-600"
              >
                Sign In
              </Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Link 
              to="/cart" 
              className="text-neutral-700 hover:text-primary-500 relative mr-4"
            >
              <ShoppingBag className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-neutral-700 hover:text-primary-500"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-base font-medium text-neutral-700 hover:text-primary-500 hover:bg-neutral-50 rounded-md"
            >
              Home
            </Link>
            <Link
              to="/restaurants"
              className="block px-3 py-2 text-base font-medium text-neutral-700 hover:text-primary-500 hover:bg-neutral-50 rounded-md"
            >
              Restaurants
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link
                  to="/user/profile"
                  className="block px-3 py-2 text-base font-medium text-neutral-700 hover:text-primary-500 hover:bg-neutral-50 rounded-md"
                >
                  Your Profile
                </Link>
                <Link
                  to="/user/orders"
                  className="block px-3 py-2 text-base font-medium text-neutral-700 hover:text-primary-500 hover:bg-neutral-50 rounded-md"
                >
                  Order History
                </Link>
                {user?.role === 'restaurant' && (
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 text-base font-medium text-neutral-700 hover:text-primary-500 hover:bg-neutral-50 rounded-md"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center px-3 py-2 text-base font-medium text-neutral-700 hover:text-primary-500 hover:bg-neutral-50 rounded-md"
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Sign out
                </button>
              </>
            ) : (
              <Link
                to="/auth/login"
                className="block px-3 py-2 text-base font-medium text-primary-500 hover:text-primary-600 hover:bg-neutral-50 rounded-md"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;