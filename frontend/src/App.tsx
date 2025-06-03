import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Home from './pages/Home';
import RestaurantList from './pages/RestaurantList';
import RestaurantDetail from './pages/RestaurantDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import OrderTracking from './pages/OrderTracking';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import OrderHistory from './pages/OrderHistory';

// Dashboard Pages
import RestaurantDashboard from './pages/dashboard/RestaurantDashboard';
import MenuManagement from './pages/dashboard/MenuManagement';
import OrderManagement from './pages/dashboard/OrderManagement';

// Auth Guard
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Toaster position="top-center" />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="restaurants" element={<RestaurantList />} />
              <Route path="restaurants/:id" element={<RestaurantDetail />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="order-confirmation/:id" element={<OrderConfirmation />} />
              <Route path="order-tracking/:id" element={<OrderTracking />} />
            </Route>

            {/* Auth Routes */}
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

            {/* Protected User Routes */}
            <Route path="/user" element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }>
              <Route path="profile" element={<UserProfile />} />
              <Route path="orders" element={<OrderHistory />} />
            </Route>

            {/* Restaurant Dashboard Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute requiredRole="restaurant">
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<RestaurantDashboard />} />
              <Route path="menu" element={<MenuManagement />} />
              <Route path="orders" element={<OrderManagement />} />
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;