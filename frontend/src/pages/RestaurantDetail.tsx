import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Phone, Clock, Star, Search, Info } from 'lucide-react';
import MenuItem from '../components/restaurant/MenuItem';

// This would come from API in real app
const mockRestaurant = {
  id: '1',
  name: 'Burger Palace',
  description: 'The best burgers in town with a variety of options for everyone. Our ingredients are fresh and locally sourced.',
  image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  coverImage: 'https://images.pexels.com/photos/1556688/pexels-photo-1556688.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  rating: 4.8,
  reviewCount: 240,
  cuisine: 'American',
  priceRange: '$$',
  deliveryTime: '15-25 min',
  deliveryFee: '$1.99',
  minOrder: 10,
  address: '123 Main St, New York, NY 10001',
  phone: '(555) 123-4567',
  hours: 'Mon-Sun: 10:00 AM - 10:00 PM',
  distance: '1.2 miles away',
};

const menuCategories = [
  { id: 'popular', name: 'Popular Items' },
  { id: 'burgers', name: 'Burgers' },
  { id: 'sides', name: 'Sides' },
  { id: 'drinks', name: 'Drinks' },
  { id: 'desserts', name: 'Desserts' },
];

// Mock menu items (would come from API)
const menuItems = [
  {
    id: '1',
    name: 'Classic Cheeseburger',
    description: 'Angus beef patty with cheddar cheese, lettuce, tomato, pickles, and special sauce',
    price: 8.99,
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'burgers',
    popular: true
  },
  {
    id: '2',
    name: 'Double Bacon Deluxe',
    description: 'Two Angus beef patties, crispy bacon, cheddar cheese, caramelized onions, and BBQ sauce',
    price: 12.99,
    image: 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'burgers',
    popular: true
  },
  {
    id: '3',
    name: 'Veggie Burger',
    description: 'Plant-based patty with avocado, sprouts, tomato, and vegan mayo',
    price: 9.99,
    image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'burgers',
    popular: false
  },
  {
    id: '4',
    name: 'Crispy French Fries',
    description: 'Golden and crispy French fries served with ketchup',
    price: 3.99,
    image: 'https://images.pexels.com/photos/115740/pexels-photo-115740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'sides',
    popular: true
  },
  {
    id: '5',
    name: 'Onion Rings',
    description: 'Crispy battered onion rings served with our signature dipping sauce',
    price: 4.49,
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'sides',
    popular: false
  },
  {
    id: '6',
    name: 'Vanilla Milkshake',
    description: 'Creamy vanilla milkshake topped with whipped cream and a cherry',
    price: 5.99,
    image: 'https://images.pexels.com/photos/3727250/pexels-photo-3727250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'drinks',
    popular: true
  }
];

const RestaurantDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState(mockRestaurant);
  const [activeCategory, setActiveCategory] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    // Fetch restaurant details and menu items
    // In a real app, this would be an API call using the ID
    console.log(`Fetching details for restaurant ID: ${id}`);
    // For now, we're using mock data
  }, [id]);
  
  // Filter menu items based on active category and search
  const filteredItems = menuItems.filter(item => {
    // Filter by category unless it's "popular"
    const matchesCategory = activeCategory === 'popular' 
      ? item.popular 
      : item.category === activeCategory;
      
    // Filter by search term
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    return matchesCategory && matchesSearch;
  });
  
  return (
    <div>
      {/* Restaurant Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img 
          src={restaurant.coverImage} 
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {restaurant.name}
            </h1>
            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-sm text-white/90">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                <span className="font-medium">{restaurant.rating}</span>
                <span className="ml-1">({restaurant.reviewCount})</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <span>{restaurant.cuisine}</span>
              <span className="hidden sm:inline">•</span>
              <span>{restaurant.priceRange}</span>
              <span className="hidden sm:inline">•</span>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{restaurant.deliveryTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Restaurant Info & Menu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu Section */}
          <div className="lg:col-span-2">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="Search menu items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {/* Category Navigation */}
            <div className="mb-6 overflow-x-auto">
              <div className="flex space-x-4 pb-2">
                {menuCategories.map(category => (
                  <button
                    key={category.id}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                      activeCategory === category.id
                        ? 'bg-primary-500 text-white'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Menu Items */}
            <div className="space-y-4">
              {filteredItems.length > 0 ? (
                filteredItems.map(item => (
                  <MenuItem key={item.id} item={item} restaurantId={restaurant.id} />
                ))
              ) : (
                <div className="text-center py-10">
                  <Search className="h-12 w-12 text-neutral-300 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-neutral-900">No menu items found</h3>
                  <p className="text-neutral-500 mt-1">
                    Try adjusting your search or category selection
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Restaurant Info Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 sticky top-20">
              <h3 className="text-lg font-bold text-neutral-900 mb-4">Restaurant Info</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-neutral-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <span className="block text-neutral-700">{restaurant.address}</span>
                    <span className="block text-sm text-neutral-500">{restaurant.distance}</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-neutral-500 mr-2 flex-shrink-0" />
                  <span className="text-neutral-700">{restaurant.phone}</span>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-neutral-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <span className="block text-neutral-700">Hours</span>
                    <span className="block text-sm text-neutral-500">{restaurant.hours}</span>
                  </div>
                </div>
                
                <div className="border-t border-neutral-200 pt-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-neutral-500">Delivery Fee</span>
                    <span className="text-sm font-medium">{restaurant.deliveryFee}</span>
                  </div>
                  
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-neutral-500">Minimum Order</span>
                    <span className="text-sm font-medium">${restaurant.minOrder}</span>
                  </div>
                </div>
                
                <div className="border-t border-neutral-200 pt-4">
                  <h4 className="text-sm font-medium text-neutral-900 mb-2">About</h4>
                  <p className="text-sm text-neutral-600">
                    {restaurant.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;