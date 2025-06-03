import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Heart } from 'lucide-react';

interface RestaurantProps {
  restaurant: {
    id: string;
    name: string;
    image: string;
    rating: number;
    reviewCount: number;
    cuisine: string;
    deliveryTime: string;
    deliveryFee: string;
    promoted?: boolean;
  };
}

const RestaurantCard: React.FC<RestaurantProps> = ({ restaurant }) => {
  return (
    <Link 
      to={`/restaurants/${restaurant.id}`} 
      className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button className="absolute top-3 right-3 p-1.5 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
          <Heart className="h-5 w-5 text-neutral-400 hover:text-accent-500" />
        </button>
        {restaurant.promoted && (
          <div className="absolute top-3 left-3 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded">
            FEATURED
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-neutral-900">{restaurant.name}</h3>
        
        <div className="flex items-center mt-1 text-sm">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 font-medium">{restaurant.rating}</span>
            <span className="text-neutral-500 ml-1">({restaurant.reviewCount})</span>
          </div>
          <span className="mx-2 text-neutral-300">•</span>
          <span className="text-neutral-500">{restaurant.cuisine}</span>
        </div>
        
        <div className="flex justify-between items-center mt-3 text-sm">
          <div className="flex items-center text-neutral-500">
            <Clock className="h-4 w-4 mr-1" />
            {restaurant.deliveryTime}
          </div>
          <div className="text-neutral-500">
            {restaurant.deliveryFee}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;