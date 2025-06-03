import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ChevronLeft, Plus, Minus, Info, ShoppingBag } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const Cart: React.FC = () => {
  const { items, updateQuantity, removeItem, clearCart, getTotal } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const subtotal = getTotal();
  const deliveryFee = items.length > 0 ? 2.99 : 0;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + deliveryFee + tax;
  
  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      toast.error('Please log in to continue with checkout');
      navigate('/auth/login', { state: { from: '/checkout' } });
      return;
    }
    
    navigate('/checkout');
  };
  
  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-16">
          <div className="mx-auto w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
            <ShoppingBag className="h-8 w-8 text-neutral-400" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Your cart is empty</h2>
          <p className="text-neutral-600 mb-6">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            to="/restaurants"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600"
          >
            Browse Restaurants
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-neutral-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <Link
            to="/restaurants"
            className="text-neutral-600 hover:text-primary-500 inline-flex items-center"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Continue Shopping
          </Link>
          <h1 className="text-2xl font-bold text-neutral-900 ml-4">Your Cart</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="mb-4 pb-2 border-b border-neutral-200">
                  <h2 className="text-xl font-semibold text-neutral-900">Order Details</h2>
                </div>
                
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center py-3 border-b border-neutral-100 last:border-b-0">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      
                      <div className="ml-4 flex-1">
                        <h3 className="font-medium text-neutral-900">{item.name}</h3>
                        
                        {/* Show options if any */}
                        {item.options && item.options.length > 0 && (
                          <div className="mt-1 text-sm text-neutral-500">
                            {item.options.map((option, idx) => (
                              <span key={idx}>
                                {option.name}: {option.value}
                                {option.price ? ` (+$${option.price.toFixed(2)})` : ''}
                                {idx < item.options!.length - 1 ? ', ' : ''}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <div className="mt-1 text-sm font-medium text-neutral-900">
                          ${item.price.toFixed(2)}
                        </div>
                      </div>
                      
                      <div className="flex items-center ml-4">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-full border border-neutral-300 text-neutral-600 hover:border-primary-500 hover:text-primary-500"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-neutral-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-full border border-neutral-300 text-neutral-600 hover:border-primary-500 hover:text-primary-500"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      
                      <div className="ml-4">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-neutral-400 hover:text-accent-500 p-1"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => clearCart()}
                    className="text-sm text-neutral-600 hover:text-accent-500"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-neutral-900 mb-4">Order Summary</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Delivery Fee</span>
                    <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-neutral-200 pt-3 mt-3">
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full mt-6 bg-primary-500 text-white py-3 px-4 rounded-md font-medium hover:bg-primary-600 transition-colors"
                >
                  Proceed to Checkout
                </button>
                
                <div className="mt-4 text-center">
                  <Link
                    to="/restaurants"
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    Add more items
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;