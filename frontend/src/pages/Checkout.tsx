import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, MapPin, AlertCircle, ChevronRight, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const Checkout: React.FC = () => {
  const { items, getTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'debit_card' | 'paypal' | 'cash'>('credit_card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form states
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    instructions: ''
  });
  
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });
  
  // Summary calculations
  const subtotal = getTotal();
  const deliveryFee = items.length > 0 ? 2.99 : 0;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + deliveryFee + tax;
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/login', { state: { from: '/checkout' } });
      return;
    }
    
    if (items.length === 0) {
      navigate('/cart');
      return;
    }
    
    // If we have user data, pre-fill address form
    if (user?.address) {
      setAddress({
        street: user.address.street || '',
        city: user.address.city || '',
        state: user.address.state || '',
        zipCode: user.address.zipCode || '',
        instructions: ''
      });
    }
  }, [isAuthenticated, items.length, user, navigate]);
  
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Form validation
    if (!address.street || !address.city || !address.state || !address.zipCode) {
      toast.error('Please fill in all required address fields');
      setIsSubmitting(false);
      return;
    }
    
    if (paymentMethod !== 'cash') {
      if (!paymentDetails.cardNumber || !paymentDetails.cardName || !paymentDetails.expiry || !paymentDetails.cvv) {
        toast.error('Please fill in all payment details');
        setIsSubmitting(false);
        return;
      }
    }
    
    try {
      // In a real app, this would be an API call to process the order
      // For demo purposes, we'll simulate a successful order
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a random order ID
      const orderId = Math.random().toString(36).substring(2, 10);
      
      // Clear cart after successful order
      clearCart();
      
      // Redirect to confirmation page
      navigate(`/order-confirmation/${orderId}`);
    } catch (error) {
      toast.error('There was a problem processing your order. Please try again.');
      console.error('Checkout error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-neutral-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-neutral-900 mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {/* Delivery Address */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-neutral-900 mb-4 flex items-center">
                    <MapPin className="h-5 w-5 text-primary-500 mr-2" />
                    Delivery Address
                  </h2>
                  
                  <div className="grid grid-cols-1 gap-y-4">
                    <div>
                      <label htmlFor="street" className="block text-sm font-medium text-neutral-700">
                        Street Address <span className="text-accent-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="street"
                        name="street"
                        className="mt-1 block w-full border border-neutral-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        value={address.street}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-neutral-700">
                          City <span className="text-accent-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          className="mt-1 block w-full border border-neutral-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          value={address.city}
                          onChange={handleAddressChange}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-neutral-700">
                          State <span className="text-accent-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          className="mt-1 block w-full border border-neutral-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          value={address.state}
                          onChange={handleAddressChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium text-neutral-700">
                        ZIP Code <span className="text-accent-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        className="mt-1 block w-full border border-neutral-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        value={address.zipCode}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="instructions" className="block text-sm font-medium text-neutral-700">
                        Delivery Instructions (optional)
                      </label>
                      <textarea
                        id="instructions"
                        name="instructions"
                        rows={3}
                        className="mt-1 block w-full border border-neutral-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        placeholder="E.g., Apartment number, gate code, etc."
                        value={address.instructions}
                        onChange={handleAddressChange}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-neutral-900 mb-4 flex items-center">
                    <CreditCard className="h-5 w-5 text-primary-500 mr-2" />
                    Payment Method
                  </h2>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-4">
                      <label className={`flex items-center p-3 border rounded-md cursor-pointer ${
                        paymentMethod === 'credit_card' ? 'border-primary-500 bg-primary-50' : 'border-neutral-300'
                      }`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="credit_card"
                          checked={paymentMethod === 'credit_card'}
                          onChange={() => setPaymentMethod('credit_card')}
                          className="sr-only"
                        />
                        <div>
                          <span className="text-sm font-medium block">Credit Card</span>
                        </div>
                      </label>
                      
                      <label className={`flex items-center p-3 border rounded-md cursor-pointer ${
                        paymentMethod === 'debit_card' ? 'border-primary-500 bg-primary-50' : 'border-neutral-300'
                      }`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="debit_card"
                          checked={paymentMethod === 'debit_card'}
                          onChange={() => setPaymentMethod('debit_card')}
                          className="sr-only"
                        />
                        <div>
                          <span className="text-sm font-medium block">Debit Card</span>
                        </div>
                      </label>
                      
                      <label className={`flex items-center p-3 border rounded-md cursor-pointer ${
                        paymentMethod === 'paypal' ? 'border-primary-500 bg-primary-50' : 'border-neutral-300'
                      }`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="paypal"
                          checked={paymentMethod === 'paypal'}
                          onChange={() => setPaymentMethod('paypal')}
                          className="sr-only"
                        />
                        <div>
                          <span className="text-sm font-medium block">PayPal</span>
                        </div>
                      </label>
                      
                      <label className={`flex items-center p-3 border rounded-md cursor-pointer ${
                        paymentMethod === 'cash' ? 'border-primary-500 bg-primary-50' : 'border-neutral-300'
                      }`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cash"
                          checked={paymentMethod === 'cash'}
                          onChange={() => setPaymentMethod('cash')}
                          className="sr-only"
                        />
                        <div>
                          <span className="text-sm font-medium block">Cash on Delivery</span>
                        </div>
                      </label>
                    </div>
                  </div>
                  
                  {paymentMethod !== 'cash' && (
                    <div className="grid grid-cols-1 gap-y-4">
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-neutral-700">
                          Card Number <span className="text-accent-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          className="mt-1 block w-full border border-neutral-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          placeholder="1234 5678 9012 3456"
                          value={paymentDetails.cardNumber}
                          onChange={handlePaymentChange}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="cardName" className="block text-sm font-medium text-neutral-700">
                          Name on Card <span className="text-accent-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="cardName"
                          name="cardName"
                          className="mt-1 block w-full border border-neutral-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          value={paymentDetails.cardName}
                          onChange={handlePaymentChange}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiry" className="block text-sm font-medium text-neutral-700">
                            Expiry Date <span className="text-accent-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="expiry"
                            name="expiry"
                            className="mt-1 block w-full border border-neutral-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            placeholder="MM/YY"
                            value={paymentDetails.expiry}
                            onChange={handlePaymentChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-neutral-700">
                            CVV <span className="text-accent-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            className="mt-1 block w-full border border-neutral-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            placeholder="123"
                            value={paymentDetails.cvv}
                            onChange={handlePaymentChange}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="lg:hidden bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-neutral-900 mb-4">Order Summary</h2>
                  
                  <div className="space-y-2">
                    {items.map(item => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-neutral-600">
                          {item.quantity} × {item.name}
                        </span>
                        <span className="text-neutral-900 font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                    
                    <div className="border-t border-neutral-200 pt-2 mt-2">
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
                      <div className="flex justify-between font-medium text-lg mt-2">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full lg:hidden py-3 px-4 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-md transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>
          
          {/* Order Summary (Desktop) */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-20">
              <div className="p-6">
                <h2 className="text-lg font-medium text-neutral-900 mb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {items.map(item => (
                    <div key={item.id} className="flex">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-neutral-200">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <h3 className="text-sm font-medium">
                            {item.name} <span className="text-neutral-500">x {item.quantity}</span>
                          </h3>
                          <p className="text-sm font-medium text-neutral-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        {item.options && item.options.length > 0 && (
                          <div className="mt-1 text-xs text-neutral-500">
                            {item.options.map((option, idx) => (
                              <span key={idx}>
                                {option.name}: {option.value}
                                {idx < item.options!.length - 1 ? ', ' : ''}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-neutral-200 py-4 space-y-2">
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
                  
                  <div className="border-t border-neutral-200 pt-2 mt-2">
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleSubmit}
                  className="w-full py-3 px-4 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-md transition-colors mt-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </button>
                
                <div className="mt-4 flex items-start">
                  <Info className="h-4 w-4 text-neutral-400 mt-0.5 flex-shrink-0 mr-1.5" />
                  <p className="text-xs text-neutral-500">
                    By placing your order, you agree to our <a href="#" className="text-primary-500">Terms of Service</a> and <a href="#" className="text-primary-500">Privacy Policy</a>.
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

export default Checkout;