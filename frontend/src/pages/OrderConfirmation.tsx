import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, MapPin, Clock, ChevronRight, CalendarClock } from 'lucide-react';

const OrderConfirmation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // In a real app, we would fetch order details from API
  // For demo, generate a delivery time 30-40 minutes from now
  const now = new Date();
  const deliveryTime = new Date(now.getTime() + (30 * 60000)); // 30 minutes from now
  
  return (
    <div className="bg-neutral-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 sm:p-8">
            {/* Success Header */}
            <div className="text-center mb-8">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-neutral-900">Order Confirmed!</h1>
              <p className="text-neutral-600 mt-2">
                Your order has been placed successfully.
              </p>
            </div>
            
            {/* Order Details */}
            <div className="border rounded-lg border-neutral-200 overflow-hidden mb-8">
              <div className="bg-neutral-50 py-3 px-4 border-b border-neutral-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-sm font-medium text-neutral-700">Order Details</h2>
                  <span className="text-sm font-medium text-primary-600">#{id}</span>
                </div>
              </div>
              
              <div className="p-4 space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-neutral-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-neutral-900">Delivery Address</p>
                    <p className="text-sm text-neutral-600 mt-1">
                      123 Main Street, Apt 4B<br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-neutral-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-neutral-900">Estimated Delivery Time</p>
                    <p className="text-sm text-neutral-600 mt-1">
                      {deliveryTime.toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'})} ({Math.round((deliveryTime.getTime() - now.getTime()) / 60000)} min)
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CalendarClock className="h-5 w-5 text-neutral-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-neutral-900">Order Date</p>
                    <p className="text-sm text-neutral-600 mt-1">
                      {now.toLocaleDateString([], {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'})}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tracking Link */}
            <div className="bg-primary-50 rounded-lg p-4 mb-8 flex items-center justify-between">
              <div>
                <h3 className="font-medium text-primary-800">Track your order in real-time</h3>
                <p className="text-sm text-primary-700 mt-1">
                  Check the status and location of your delivery
                </p>
              </div>
              <Link
                to={`/order-tracking/${id}`}
                className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                Track Order <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <Link
                to={`/order-tracking/${id}`}
                className="flex-1 bg-primary-500 text-white py-2 px-4 rounded-md font-medium hover:bg-primary-600 transition-colors flex justify-center items-center"
              >
                Track Order
              </Link>
              <Link
                to="/restaurants"
                className="flex-1 bg-white text-neutral-700 border border-neutral-300 py-2 px-4 rounded-md font-medium hover:bg-neutral-50 transition-colors flex justify-center items-center"
              >
                Order Again
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;