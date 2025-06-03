import React from 'react';
import { useAuth } from '../hooks/useAuth';

function UserProfile() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">User Profile</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 text-gray-900">{user?.email}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <p className="mt-1 text-gray-900">{user?.name || 'Not set'}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Member Since</label>
            <p className="mt-1 text-gray-900">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Not available'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;