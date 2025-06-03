import React, { useState } from 'react';
import { Plus, Minus, Info } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import toast from 'react-hot-toast';

interface MenuItemProps {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    popular: boolean;
  };
  restaurantId: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, restaurantId }) => {
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const { addItem } = useCart();
  
  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    addItem({
      id: item.id,
      restaurantId,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity,
    });
    
    toast.success(`${item.name} added to cart!`);
    setQuantity(1);
    setShowModal(false);
  };
  
  return (
    <>
      <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow">
        <div className="flex flex-col sm:flex-row">
          {/* Item Details */}
          <div className="p-4 flex-1">
            <h3 className="font-medium text-lg text-neutral-900">{item.name}</h3>
            <p className="text-neutral-600 text-sm mt-1 line-clamp-2">{item.description}</p>
            <div className="mt-2">
              <span className="font-medium text-neutral-900">${item.price.toFixed(2)}</span>
            </div>
            
            {/* Add to cart button for mobile */}
            <button
              onClick={() => setShowModal(true)}
              className="sm:hidden mt-3 px-4 py-1.5 bg-primary-500 text-white rounded-full text-sm font-medium hover:bg-primary-600 transition-colors"
            >
              Add to cart
            </button>
          </div>
          
          {/* Item Image */}
          <div className="sm:w-32 sm:h-32 h-24 relative flex-shrink-0">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover"
            />
            
            {/* Add to cart button for desktop */}
            <button
              onClick={() => setShowModal(true)}
              className="hidden sm:flex absolute right-2 bottom-2 w-8 h-8 rounded-full bg-white shadow-md items-center justify-center hover:bg-primary-500 hover:text-white transition-colors"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Item Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 transition-opacity" 
              aria-hidden="true"
              onClick={() => setShowModal(false)}
            >
              <div className="absolute inset-0 bg-neutral-500 opacity-75"></div>
            </div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-48 sm:h-64 object-cover"
                />
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-neutral-900 mb-2">{item.name}</h3>
                <p className="text-neutral-600 mb-4">{item.description}</p>
                
                <div className="border-t border-neutral-200 pt-4 pb-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-lg font-bold text-neutral-900">
                      ${(item.price * quantity).toFixed(2)}
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-neutral-300 hover:border-primary-500 hover:text-primary-500"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-10 text-center font-medium">{quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-neutral-300 hover:border-primary-500 hover:text-primary-500"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={handleAddToCart}
                    className="px-6 py-2 bg-primary-500 text-white rounded-md font-medium hover:bg-primary-600 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuItem;