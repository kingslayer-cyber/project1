import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, CheckCircle, User, MapPin, Phone } from 'lucide-react';

// Order statuses
const ORDER_STATUSES = [
  { id: 'placed', label: 'Order Placed', icon: CheckCircle },
  { id: 'confirmed', label: 'Order Confirmed', icon: CheckCircle },
  { id: 'preparing', label: 'Preparing', icon: CheckCircle },
  { id: 'ready', label: 'Ready for Delivery', icon: CheckCircle },
  { id: 'out_for_delivery', label: 'Out for Delivery', icon: CheckCircle },
  { id: 'delivered', label: 'Delivered', icon: CheckCircle }
];

const OrderTracking: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [currentStatus, setCurrentStatus] = useState('preparing'); // This would come from API
  const [etaMinutes, setEtaMinutes] = useState(25); // This would come from API
  
  // In a real app, we would fetch order details from API
  const mockOrderDetails = {
    id,
    restaurantName: 'Burger Palace',
    restaurantImage: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    items: [
      { name: 'Classic Cheeseburger', quantity: 2, price: 8.99 },
      { name: 'Crispy French Fries', quantity: 1, price: 3.99 },
      { name: 'Vanilla Milkshake', quantity: 1, price: 5.99 }
    ],
    subtotal: 27.96,
    deliveryFee: 2.99,
    tax: 2.24,
    total: 33.19,
    address: '123 Main Street, Apt 4B, New York, NY 10001',
    paymentMethod: 'Credit Card',
    driver: {
      name: 'Michael Rodriguez',
      phone: '(555) 123-7890',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  };
  
  // Simulate order status updates for demo purposes
  useEffect(() => {
    const statusIndex = ORDER_STATUSES.findIndex(s => s.id === currentStatus);
    
    // Don't progress past delivered
    if (statusIndex >= ORDER_STATUSES.length - 1) return;
    
    // Update status every few seconds (for demo purposes)
    const timer = setTimeout(() => {
      setCurrentStatus(ORDER_STATUSES[statusIndex + 1].id);
      setEtaMinutes(prev => Math.max(0, prev - 5));
    }, 15000);
    
    return () => clearTimeout(timer);
  }, [currentStatus]);
  
  // Calculate progress percentage
  const calculateProgress = () => {
    const statusIndex = ORDER_STATUSES.findIndex(s => s.id === currentStatus);
    return ((statusIndex + 1) / ORDER_STATUSES.length) * 100;
  };
  
  return (
    <div className="bg-neutral-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-neutral-900 mb-4">Order Tracking</h1>
        <p className="text-neutral-600 mb-8">Order #{id}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tracking Progress */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-medium text-neutral-900">
                    Order Status
                  </h2>
                  {etaMinutes > 0 ? (
                    <div className="flex items-center text-neutral-700 bg-neutral-100 px-3 py-1 rounded-full text-sm">
                      <Clock className="h-4 w-4 mr-1 text-neutral-600" />
                      <span>ETA: {etaMinutes} min</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-green-700 bg-green-100 px-3 py-1 rounded-full text-sm">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span>Delivered</span>
                    </div>
                  )}
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-neutral-200 rounded-full h-2.5 mb-6">
                  <div 
                    className="bg-primary-500 h-2.5 rounded-full transition-all duration-500" 
                    style={{ width: `${calculateProgress()}%` }}
                  ></div>
                </div>
                
                {/* Status Steps */}
                <div className="space-y-4">
                  {ORDER_STATUSES.map((status, index) => {
                    const StatusIcon = status.icon;
                    const isActive = ORDER_STATUSES.findIndex(s => s.id === currentStatus) >= index;
                    const isCurrent = status.id === currentStatus;
                    
                    return (
                      <div key={status.id} className="flex items-start">
                        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                          isActive ? 'bg-primary-100' : 'bg-neutral-100'
                        }`}>
                          <StatusIcon className={`h-5 w-5 ${
                            isActive ? 'text-primary-600' : 'text-neutral-400'
                          }`} />
                        </div>
                        <div className="ml-4">
                          <h3 className={`text-sm font-medium ${
                            isActive ? 'text-neutral-900' : 'text-neutral-500'
                          }`}>
                            {status.label}
                          </h3>
                          {isCurrent && (
                            <p className="mt-1 text-xs text-neutral-500">
                              {status.id === 'placed' && 'Your order has been received.'}
                              {status.id === 'confirmed' && 'The restaurant has confirmed your order.'}
                              {status.id === 'preparing' && 'The restaurant is preparing your food.'}
                              {status.id === 'ready' && 'Your food is ready for delivery.'}
                              {status.id === 'out_for_delivery' && 'Your order is on the way!'}
                              {status.id === 'delivered' && 'Enjoy your meal!'}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Restaurant and Order Details */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={mockOrderDetails.restaurantImage}
                      alt={mockOrderDetails.restaurantName}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-neutral-900">{mockOrderDetails.restaurantName}</h3>
                    <p className="text-sm text-neutral-500">Order #{id}</p>
                  </div>
                </div>
                
                {/* Order Items */}
                <div className="border-t border-b border-neutral-200 py-4 mb-4">
                  {mockOrderDetails.items.map((item, index) => (
                    <div key={index} className="flex justify-between mb-2 last:mb-0">
                      <span className="text-neutral-700">{item.quantity}x {item.name}</span>
                      <span className="font-medium">${(item.quantity * item.price).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                {/* Order Totals */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Subtotal</span>
                    <span>${mockOrderDetails.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Delivery Fee</span>
                    <span>${mockOrderDetails.deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Tax</span>
                    <span>${mockOrderDetails.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium border-t border-neutral-200 pt-2 mt-2">
                    <span>Total</span>
                    <span>${mockOrderDetails.total.toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Delivery Address */}
                <div className="flex items-start mb-4">
                  <MapPin className="h-5 w-5 text-neutral-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <span className="block text-sm font-medium text-neutral-900">Delivery Address</span>
                    <span className="block text-sm text-neutral-600">{mockOrderDetails.address}</span>
                  </div>
                </div>
                
                {/* Payment Method */}
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 text-neutral-500 mr-2 flex-shrink-0" />
                  <span className="text-sm text-neutral-600">Paid with {mockOrderDetails.paymentMethod}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Driver Info - only show when out for delivery */}
          <div className="md:col-span-1">
            {currentStatus === 'out_for_delivery' && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-neutral-900 mb-4">Your Delivery Person</h2>
                  
                  <div className="flex items-center mb-4">
                    <div className="h-16 w-16 rounded-full overflow-hidden flex-shrink-0 bg-neutral-100">
                      <img
                        src={mockOrderDetails.driver.image}
                        alt={mockOrderDetails.driver.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-neutral-900">{mockOrderDetails.driver.name}</h3>
                      <p className="text-sm text-neutral-500">Your delivery person</p>
                    </div>
                  </div>
                  
                  <a
                    href={`tel:${mockOrderDetails.driver.phone}`}
                    className="w-full flex items-center justify-center py-2 px-4 border border-neutral-300 rounded-md text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 transition-colors"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Driver
                  </a>
                </div>
              </div>
            )}
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
              <div className="p-6">
                <h2 className="text-lg font-medium text-neutral-900 mb-4">Need Help?</h2>
                <p className="text-sm text-neutral-600 mb-4">
                  If you have any issues with your order, please contact customer support.
                </p>
                <a
                  href="#"
                  className="w-full flex items-center justify-center py-2 px-4 border border-primary-500 rounded-md text-sm font-medium text-primary-700 bg-primary-50 hover:bg-primary-100 transition-colors"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;