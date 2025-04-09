import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut, Store } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Header = () => {
  const navigate = useNavigate();
  const { state } = useCart();
  
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const cartCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Store className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">Shop</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600">
              Store
            </Link>
            
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-blue-600" />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <button
              onClick={logout}
              className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
            >
              <LogOut className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};