import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

export const Cart: React.FC = () => {
  const { state, dispatch } = useCart();

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity > 0) {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  const handleRemoveItem = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    toast.success('Item removed from cart');
  };

  const handleCheckout = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast.success('Order placed successfully!');
  };

  if (state.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Your cart is empty</h2>
          <p className="mt-2 text-gray-500">Add some items to your cart to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="bg-white rounded-lg shadow">
        <div className="divide-y divide-gray-200">
          {state.items.map((item) => (
            <div key={item.id} className="p-6 flex items-center">
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-contain rounded"
              />
              
              <div className="ml-6 flex-1">
                <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                <p className="mt-1 text-lg font-medium text-indigo-600">
                  ${item.price.toFixed(2)}
                </p>
              </div>
              
              <div className="ml-6 flex items-center">
                <button
                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                  className="p-1 text-gray-400 hover:text-gray-500"
                >
                  <Minus className="h-5 w-5" />
                </button>
                <span className="mx-3 text-gray-600">{item.quantity}</span>
                <button
                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                  className="p-1 text-gray-400 hover:text-gray-500"
                >
                  <Plus className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="ml-4 p-1 text-red-400 hover:text-red-500"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-6 bg-gray-50 rounded-b-lg">
          <div className="flex justify-between text-lg font-medium">
            <span>Total</span>
            <span>${state.total.toFixed(2)}</span>
          </div>
          
          <button
            onClick={handleCheckout}
            className="mt-6 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};