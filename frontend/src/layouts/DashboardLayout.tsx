import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  Menu, X, LayoutDashboard, UtensilsCrossed, 
  ClipboardList, LogOut, ChevronRight, User
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { path: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/dashboard/menu', icon: <UtensilsCrossed size={20} />, label: 'Menu Management' },
    { path: '/dashboard/orders', icon: <ClipboardList size={20} />, label: 'Order Management' },
  ];

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-4 py-5 border-b">
            <h1 className="text-xl font-bold text-primary-600">Restaurant Dashboard</h1>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-neutral-500 hover:text-neutral-700"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-2 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/dashboard'}
                  className={({ isActive }) => 
                    `flex items-center px-3 py-3 text-sm font-medium rounded-md transition-colors group ${
                      isActive 
                        ? 'bg-primary-50 text-primary-600' 
                        : 'text-neutral-700 hover:bg-neutral-100'
                    }`
                  }
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                  <ChevronRight 
                    size={16} 
                    className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="border-t p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <User size={20} className="text-primary-600" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-neutral-700">{user?.name || 'Restaurant Owner'}</p>
                <button 
                  onClick={handleLogout}
                  className="flex items-center text-xs font-medium text-neutral-500 hover:text-primary-600 mt-1"
                >
                  <LogOut size={14} className="mr-1" />
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className={`lg:pl-64 flex flex-col min-h-screen`}>
        {/* Top navigation */}
        <header className="bg-white shadow-sm lg:shadow-none z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <button
                type="button"
                className="lg:hidden text-neutral-500 hover:text-neutral-700"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={24} />
              </button>
              <div className="lg:hidden font-semibold text-neutral-900">Restaurant Dashboard</div>
              <div className="flex items-center">
                {/* Notification bell or other icons could go here */}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;