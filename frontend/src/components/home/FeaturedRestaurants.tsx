import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, ChevronRight, Heart } from 'lucide-react';
import RestaurantCard from '../restaurant/RestaurantCard';

// This would typically come from an API
const featuredRestaurants = [
  {
    id: '1',
    name: 'Burger Palace',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.8,
    reviewCount: 240,
    cuisine: 'American',
    deliveryTime: '15-25 min',
    deliveryFee: '$1.99',
    promoted: true
  },
  {
    id: '2',
    name: 'Pizza Heaven',
    image: 'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.5,
    reviewCount: 180,
    cuisine: 'Italian',
    deliveryTime: '20-30 min',
    deliveryFee: '$2.49',
    promoted: false
  },
  {
    id: '3',
    name: 'Sushi World',
    image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.9,
    reviewCount: 320,
    cuisine: 'Japanese',
    deliveryTime: '25-35 min',
    deliveryFee: '$3.99',
    promoted: true
  },
  {
    id: '4',
    name: 'Taco Express',
    image: 'https://images.pexels.com/photos/6605654/pexels-photo-6605654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.3,
    reviewCount: 156,
    cuisine: 'Mexican',
    deliveryTime: '15-25 min',
    deliveryFee: '$1.49',
    promoted: false
  }
];

const FeaturedRestaurants: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">Featured Restaurants</h2>
            <p className="mt-2 text-neutral-600">The best places to satisfy your cravings</p>
          </div>
          <Link to="/restaurants" className="text-primary-500 font-medium hidden sm:flex items-center hover:text-primary-600 transition-colors">
            View all <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredRestaurants.map(restaurant => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
        
        <div className="mt-8 text-center sm:hidden">
          <Link 
            to="/restaurants"
            className="inline-flex items-center px-4 py-2 border border-primary-500 text-primary-500 rounded-md hover:bg-primary-50 transition-colors"
          >
            View all restaurants <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRestaurants;