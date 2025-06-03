import React from 'react';
import { useAuth } from '../hooks/useAuth';

const OrderHistory = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Order History</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          {/* Placeholder for order history items */}
          <p className="text-gray-600">Your order history will appear here.</p>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;