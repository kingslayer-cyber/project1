import React, { createContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  id: string;
  restaurantId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  options?: {
    name: string;
    value: string;
    price?: number;
  }[];
}

interface CartContextType {
  items: CartItem[];
  restaurantId: string | null;
  addItem: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const CartContext = createContext<CartContextType>({
  items: [],
  restaurantId: null,
  addItem: () => {},
  updateQuantity: () => {},
  removeItem: () => {},
  clearCart: () => {},
  getTotal: () => 0,
});

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  
  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedRestaurantId = localStorage.getItem('restaurantId');
    
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error parsing cart from localStorage', e);
      }
    }
    
    if (savedRestaurantId) {
      setRestaurantId(savedRestaurantId);
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
    if (restaurantId) {
      localStorage.setItem('restaurantId', restaurantId);
    } else {
      localStorage.removeItem('restaurantId');
    }
  }, [items, restaurantId]);
  
  const addItem = (item: CartItem) => {
    // If adding from a different restaurant, clear the cart first
    if (restaurantId && item.restaurantId !== restaurantId && items.length > 0) {
      if (!window.confirm('Adding items from a different restaurant will clear your current cart. Continue?')) {
        return;
      }
      setItems([]);
    }
    
    setRestaurantId(item.restaurantId);
    
    // Check if item already exists in cart
    const existingItemIndex = items.findIndex(i => 
      i.id === item.id && 
      JSON.stringify(i.options) === JSON.stringify(item.options)
    );
    
    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      const updatedItems = [...items];
      updatedItems[existingItemIndex].quantity += item.quantity;
      setItems(updatedItems);
    } else {
      // Add new item
      setItems([...items, item]);
    }
  };
  
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    
    const updatedItems = items.map(item => 
      item.id === id ? { ...item, quantity } : item
    );
    setItems(updatedItems);
  };
  
  const removeItem = (id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    
    // If cart is empty, reset restaurantId
    if (updatedItems.length === 0) {
      setRestaurantId(null);
    }
  };
  
  const clearCart = () => {
    setItems([]);
    setRestaurantId(null);
  };
  
  const getTotal = () => {
    return items.reduce((total, item) => {
      const itemPrice = item.price;
      const optionsPrice = item.options?.reduce((sum, option) => sum + (option.price || 0), 0) || 0;
      return total + (itemPrice + optionsPrice) * item.quantity;
    }, 0);
  };
  
  return (
    <CartContext.Provider
      value={{
        items,
        restaurantId,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};