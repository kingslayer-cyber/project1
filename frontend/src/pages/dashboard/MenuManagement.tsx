import React from 'react';

const MenuManagement = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Menu Management</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Menu Items</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Add New Item
          </button>
        </div>
        <div className="text-gray-500 text-center py-8">
          No menu items found. Add your first menu item to get started.
        </div>
      </div>
    </div>
  );
};

export default MenuManagement;