import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const categories = [
  {
    id: 'burgers',
    name: 'Burgers',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'pizza',
    name: 'Pizza',
    image: 'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'sushi',
    name: 'Sushi',
    image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'mexican',
    name: 'Mexican',
    image: 'https://images.pexels.com/photos/6605654/pexels-photo-6605654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'chinese',
    name: 'Chinese',
    image: 'https://images.pexels.com/photos/955137/pexels-photo-955137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'indian',
    name: 'Indian',
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
];

const CategorySection: React.FC = () => {
  return (
    <section className="py-12 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">Explore By Category</h2>
            <p className="mt-2 text-neutral-600">Find your favorite cuisine</p>
          </div>
          <Link to="/restaurants" className="text-primary-500 font-medium hidden sm:flex items-center hover:text-primary-600 transition-colors">
            View all <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map(category => (
            <Link
              key={category.id}
              to={`/restaurants?category=${category.id}`}
              className="group relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white hover:-translate-y-1"
            >
              <div className="aspect-square">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <h3 className="font-medium text-lg">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 text-center sm:hidden">
          <Link 
            to="/restaurants"
            className="inline-flex items-center px-4 py-2 border border-primary-500 text-primary-500 rounded-md hover:bg-primary-50 transition-colors"
          >
            View all categories <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;