import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, ArrowRight, Star, Clock, Tag } from 'lucide-react';
import FeaturedRestaurants from '../components/home/FeaturedRestaurants';
import CategorySection from '../components/home/CategorySection';
import HowItWorks from '../components/home/HowItWorks';
import AppDownload from '../components/home/AppDownload';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <img
            src="https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Delicious food"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-xl">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
              Delicious Food Delivered to Your Doorstep
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Order from your favorite local restaurants with easy, contactless delivery.
            </p>
            
            {/* Search Bar */}
            <div className="bg-white p-2 rounded-full shadow-xl flex items-center">
              <div className="flex items-center flex-grow pl-3 pr-2">
                <MapPin className="h-5 w-5 text-neutral-400" />
                <input 
                  type="text" 
                  placeholder="Enter your delivery address" 
                  className="ml-2 flex-1 py-2 px-1 text-neutral-800 text-base focus:outline-none"
                />
              </div>
              <Link to="/restaurants" className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-full flex items-center transition-colors">
                <Search className="h-5 w-5 mr-1" />
                <span>Find Food</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories */}
      <CategorySection />
      
      {/* Featured Restaurants */}
      <FeaturedRestaurants />

      {/* How It Works */}
      <HowItWorks />
      
      {/* Special Offers */}
      <section className="py-12 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900">Special Offers</h2>
            <p className="mt-2 text-lg text-neutral-600">Exclusive deals you don't want to miss</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Offer 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1">
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg" 
                  alt="Special offer" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-accent-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  20% OFF
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-neutral-900">First Order Discount</h3>
                <p className="mt-2 text-neutral-600">Get 20% off on your first order with code: WELCOME20</p>
                <div className="mt-4">
                  <Link to="/restaurants" className="text-primary-500 font-medium inline-flex items-center">
                    Order now <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Offer 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1">
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/6941032/pexels-photo-6941032.jpeg" 
                  alt="Special offer" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-secondary-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  FREE
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-neutral-900">Free Delivery Weekend</h3>
                <p className="mt-2 text-neutral-600">Enjoy free delivery all weekend on orders over $15</p>
                <div className="mt-4">
                  <Link to="/restaurants" className="text-primary-500 font-medium inline-flex items-center">
                    Order now <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Offer 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1">
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/5908232/pexels-photo-5908232.jpeg" 
                  alt="Special offer" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-accent-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  BOGO
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-neutral-900">Buy 1 Get 1 Free</h3>
                <p className="mt-2 text-neutral-600">Special BOGO offer on select restaurants this week</p>
                <div className="mt-4">
                  <Link to="/restaurants" className="text-primary-500 font-medium inline-flex items-center">
                    Order now <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* App Download CTA */}
      <AppDownload />
      
      {/* Testimonials */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900">What Our Customers Say</h2>
            <p className="mt-2 text-lg text-neutral-600">Real experiences from satisfied food lovers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-neutral-50 p-6 rounded-lg shadow-sm border border-neutral-200">
              <div className="flex items-center mb-4">
                <div className="text-primary-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="inline-block h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-neutral-700 mb-6 italic">
                "FoodHub has become my go-to for ordering food. The variety of restaurants and cuisines available is impressive, and the delivery is always prompt!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                  JS
                </div>
                <div className="ml-3">
                  <h4 className="font-medium text-neutral-900">Jessica Smith</h4>
                  <p className="text-sm text-neutral-500">New York, NY</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-neutral-50 p-6 rounded-lg shadow-sm border border-neutral-200">
              <div className="flex items-center mb-4">
                <div className="text-primary-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="inline-block h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-neutral-700 mb-6 italic">
                "The real-time order tracking is amazing! I can see exactly when my food will arrive. The app is intuitive and ordering is a breeze."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                  MJ
                </div>
                <div className="ml-3">
                  <h4 className="font-medium text-neutral-900">Michael Johnson</h4>
                  <p className="text-sm text-neutral-500">Chicago, IL</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-neutral-50 p-6 rounded-lg shadow-sm border border-neutral-200">
              <div className="flex items-center mb-4">
                <div className="text-primary-500">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="inline-block h-5 w-5 fill-current" />
                  ))}
                  <Star className="inline-block h-5 w-5 text-neutral-300" />
                </div>
              </div>
              <p className="text-neutral-700 mb-6 italic">
                "I love the special offers and discounts available on FoodHub. It makes ordering food more affordable, and the quality of the restaurants is consistently high."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                  SL
                </div>
                <div className="ml-3">
                  <h4 className="font-medium text-neutral-900">Sarah Lee</h4>
                  <p className="text-sm text-neutral-500">Los Angeles, CA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;