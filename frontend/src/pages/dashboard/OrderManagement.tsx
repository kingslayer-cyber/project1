import React from 'react';

const OrderManagement = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Order Management</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
          <div className="flex gap-2">
            <select className="border rounded-lg px-3 py-2">
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="preparing">Preparing</option>
              <option value="ready">Ready</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        </div>
        <div className="text-gray-500 text-center py-8">
          No orders found.
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;