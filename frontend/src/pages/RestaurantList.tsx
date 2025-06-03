import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronDown, Search, FilterX, SlidersHorizontal, Star, MapPin } from 'lucide-react';
import RestaurantCard from '../components/restaurant/RestaurantCard';

// This would come from an API in a real app
const allRestaurants = [
  {
    id: '1',
    name: 'Burger Palace',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.8,
    reviewCount: 240,
    cuisine: 'American',
    category: 'burgers',
    deliveryTime: '15-25 min',
    deliveryFee: '$1.99',
    distance: '1.2 miles',
    promoted: true
  },
  {
    id: '2',
    name: 'Pizza Heaven',
    image: 'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.5,
    reviewCount: 180,
    cuisine: 'Italian',
    category: 'pizza',
    deliveryTime: '20-30 min',
    deliveryFee: '$2.49',
    distance: '1.8 miles',
    promoted: false
  },
  {
    id: '3',
    name: 'Sushi World',
    image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.9,
    reviewCount: 320,
    cuisine: 'Japanese',
    category: 'sushi',
    deliveryTime: '25-35 min',
    deliveryFee: '$3.99',
    distance: '2.5 miles',
    promoted: true
  },
  {
    id: '4',
    name: 'Taco Express',
    image: 'https://images.pexels.com/photos/6605654/pexels-photo-6605654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.3,
    reviewCount: 156,
    cuisine: 'Mexican',
    category: 'mexican',
    deliveryTime: '15-25 min',
    deliveryFee: '$1.49',
    distance: '0.8 miles',
    promoted: false
  },
  {
    id: '5',
    name: 'Golden Dragon',
    image: 'https://images.pexels.com/photos/955137/pexels-photo-955137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.6,
    reviewCount: 210,
    cuisine: 'Chinese',
    category: 'chinese',
    deliveryTime: '20-30 min',
    deliveryFee: '$2.99',
    distance: '1.5 miles',
    promoted: false
  },
  {
    id: '6',
    name: 'Taj Mahal',
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.7,
    reviewCount: 275,
    cuisine: 'Indian',
    category: 'indian',
    deliveryTime: '25-35 min',
    deliveryFee: '$2.49',
    distance: '2.2 miles',
    promoted: true
  },
  {
    id: '7',
    name: 'Mediterranean Grill',
    image: 'https://images.pexels.com/photos/5639398/pexels-photo-5639398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.4,
    reviewCount: 190,
    cuisine: 'Mediterranean',
    category: 'other',
    deliveryTime: '20-30 min',
    deliveryFee: '$2.99',
    distance: '1.7 miles',
    promoted: false
  },
  {
    id: '8',
    name: 'Green Leaf Salads',
    image: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.5,
    reviewCount: 165,
    cuisine: 'Healthy',
    category: 'other',
    deliveryTime: '15-25 min',
    deliveryFee: '$1.99',
    distance: '1.1 miles',
    promoted: false
  }
];

const sortOptions = [
  { label: 'Recommended', value: 'recommended' },
  { label: 'Delivery Time', value: 'delivery_time' },
  { label: 'Rating', value: 'rating' },
  { label: 'Distance', value: 'distance' },
];

const RestaurantList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [restaurants, setRestaurants] = useState(allRestaurants);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minRating: 0,
    maxDeliveryFee: 10,
    maxDeliveryTime: 60,
    category: searchParams.get('category') || '',
  });
  
  useEffect(() => {
    // Filter and sort restaurants based on user selections
    let filtered = [...allRestaurants];
    
    // Apply category filter from URL params
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setFilters(prev => ({ ...prev, category: categoryParam }));
    }
    
    // Apply search query filter
    if (searchQuery) {
      filtered = filtered.filter(restaurant => 
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply rating filter
    if (filters.minRating > 0) {
      filtered = filtered.filter(restaurant => restaurant.rating >= filters.minRating);
    }
    
    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(restaurant => restaurant.category === filters.category);
    }
    
    // Apply max delivery fee filter (convert string like "$2.99" to number 2.99)
    if (filters.maxDeliveryFee < 10) {
      filtered = filtered.filter(restaurant => 
        parseFloat(restaurant.deliveryFee.replace('$', '')) <= filters.maxDeliveryFee
      );
    }
    
    // Apply max delivery time filter (convert string like "20-30 min" to number 30)
    if (filters.maxDeliveryTime < 60) {
      filtered = filtered.filter(restaurant => {
        const timeParts = restaurant.deliveryTime.split('-');
        const maxTime = parseInt(timeParts[1]);
        return maxTime <= filters.maxDeliveryTime;
      });
    }
    
    // Sort restaurants
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'delivery_time':
        filtered.sort((a, b) => {
          const aTime = parseInt(a.deliveryTime.split('-')[0]);
          const bTime = parseInt(b.deliveryTime.split('-')[0]);
          return aTime - bTime;
        });
        break;
      case 'distance':
        filtered.sort((a, b) => {
          const aDistance = parseFloat(a.distance.split(' ')[0]);
          const bDistance = parseFloat(b.distance.split(' ')[0]);
          return aDistance - bDistance;
        });
        break;
      default: // recommended - show promoted first
        filtered.sort((a, b) => {
          if (a.promoted && !b.promoted) return -1;
          if (!a.promoted && b.promoted) return 1;
          return b.rating - a.rating; // Then sort by rating
        });
    }
    
    setRestaurants(filtered);
  }, [searchQuery, sortBy, filters, searchParams]);
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  
  const resetFilters = () => {
    setFilters({
      minRating: 0,
      maxDeliveryFee: 10,
      maxDeliveryTime: 60,
      category: '',
    });
    setSearchQuery('');
    setSearchParams({});
  };
  
  return (
    <div className="bg-neutral-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4 md:mb-0">
            {filters.category 
              ? `${filters.category.charAt(0).toUpperCase() + filters.category.slice(1)} Restaurants` 
              : 'All Restaurants'}
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-neutral-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Search for restaurants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            
            {/* Sort Dropdown */}
            <div className="relative inline-block text-left">
              <div>
                <button 
                  type="button" 
                  className="inline-flex justify-between w-full rounded-md border border-neutral-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-100 focus:ring-primary-500"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="h-5 w-5 mr-2 text-neutral-500" />
                  Filter & Sort
                  <ChevronDown className="h-5 w-5 ml-2 text-neutral-500" />
                </button>
              </div>
              
              {showFilters && (
                <div className="origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-4 px-6">
                    <h3 className="text-sm font-medium text-neutral-900 mb-4">Sort By</h3>
                    <div className="mb-6 space-y-2">
                      {sortOptions.map(option => (
                        <label key={option.value} className="flex items-center">
                          <input
                            type="radio"
                            name="sort"
                            value={option.value}
                            checked={sortBy === option.value}
                            onChange={() => setSortBy(option.value)}
                            className="h-4 w-4 text-primary-500 focus:ring-primary-400 border-neutral-300"
                          />
                          <span className="ml-2 text-sm text-neutral-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                    
                    <hr className="my-4" />
                    
                    <h3 className="text-sm font-medium text-neutral-900 mb-4">Filters</h3>
                    
                    <div className="mb-4">
                      <label className="block text-sm text-neutral-700 mb-2">
                        Minimum Rating
                      </label>
                      <div className="flex items-center">
                        <input
                          type="range"
                          min="0"
                          max="5"
                          step="0.5"
                          value={filters.minRating}
                          onChange={(e) => setFilters({ ...filters, minRating: parseFloat(e.target.value) })}
                          className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="ml-2 min-w-[30px] text-sm text-neutral-700">
                          {filters.minRating > 0 ? filters.minRating : 'Any'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm text-neutral-700 mb-2">
                        Max Delivery Fee
                      </label>
                      <div className="flex items-center">
                        <input
                          type="range"
                          min="0"
                          max="10"
                          step="0.5"
                          value={filters.maxDeliveryFee}
                          onChange={(e) => setFilters({ ...filters, maxDeliveryFee: parseFloat(e.target.value) })}
                          className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="ml-2 min-w-[50px] text-sm text-neutral-700">
                          {filters.maxDeliveryFee < 10 ? `$${filters.maxDeliveryFee.toFixed(2)}` : 'Any'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-sm text-neutral-700 mb-2">
                        Max Delivery Time
                      </label>
                      <div className="flex items-center">
                        <input
                          type="range"
                          min="10"
                          max="60"
                          step="5"
                          value={filters.maxDeliveryTime}
                          onChange={(e) => setFilters({ ...filters, maxDeliveryTime: parseInt(e.target.value) })}
                          className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="ml-2 min-w-[50px] text-sm text-neutral-700">
                          {filters.maxDeliveryTime < 60 ? `${filters.maxDeliveryTime} min` : 'Any'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50"
                        onClick={resetFilters}
                      >
                        <FilterX className="h-4 w-4 mr-1" />
                        Reset
                      </button>
                      
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600"
                        onClick={() => setShowFilters(false)}
                      >
                        Apply Filters
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Active Filters */}
        {(filters.minRating > 0 || 
          filters.maxDeliveryFee < 10 || 
          filters.maxDeliveryTime < 60 || 
          filters.category ||
          searchQuery) && (
          <div className="flex items-center flex-wrap gap-2 mb-6">
            <span className="text-sm text-neutral-600">Active filters:</span>
            
            {filters.minRating > 0 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                {filters.minRating}+ Stars
                <button 
                  type="button" 
                  onClick={() => setFilters({ ...filters, minRating: 0 })}
                  className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-neutral-400 hover:text-neutral-500"
                >
                  <span className="sr-only">Remove filter</span>
                  <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                    <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                  </svg>
                </button>
              </span>
            )}
            
            {filters.maxDeliveryFee < 10 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                Under ${filters.maxDeliveryFee.toFixed(2)}
                <button 
                  type="button" 
                  onClick={() => setFilters({ ...filters, maxDeliveryFee: 10 })}
                  className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-neutral-400 hover:text-neutral-500"
                >
                  <span className="sr-only">Remove filter</span>
                  <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                    <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                  </svg>
                </button>
              </span>
            )}
            
            {filters.maxDeliveryTime < 60 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                Under {filters.maxDeliveryTime} min
                <button 
                  type="button" 
                  onClick={() => setFilters({ ...filters, maxDeliveryTime: 60 })}
                  className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-neutral-400 hover:text-neutral-500"
                >
                  <span className="sr-only">Remove filter</span>
                  <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                    <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                  </svg>
                </button>
              </span>
            )}
            
            {filters.category && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                {filters.category.charAt(0).toUpperCase() + filters.category.slice(1)}
                <button 
                  type="button" 
                  onClick={() => {
                    setFilters({ ...filters, category: '' });
                    setSearchParams({});
                  }}
                  className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-neutral-400 hover:text-neutral-500"
                >
                  <span className="sr-only">Remove filter</span>
                  <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                    <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                  </svg>
                </button>
              </span>
            )}
            
            {searchQuery && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                "{searchQuery}"
                <button 
                  type="button" 
                  onClick={() => setSearchQuery('')}
                  className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-neutral-400 hover:text-neutral-500"
                >
                  <span className="sr-only">Remove filter</span>
                  <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                    <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                  </svg>
                </button>
              </span>
            )}
            
            <button
              onClick={resetFilters}
              className="text-sm text-primary-600 hover:text-primary-700 ml-2"
            >
              Clear all
            </button>
          </div>
        )}
        
        {/* Restaurant Grid */}
        {restaurants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {restaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-neutral-400" />
            </div>
            <h2 className="text-xl font-bold text-neutral-900 mb-2">No restaurants found</h2>
            <p className="text-neutral-600 mb-6 max-w-md mx-auto">
              We couldn't find any restaurants matching your criteria. Try adjusting your filters or search terms.
            </p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantList;