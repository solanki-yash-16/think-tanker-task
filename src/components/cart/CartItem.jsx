import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';
import { formatPrice } from '../../utils/helpers.js';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  const discountedPrice = item.discount > 0 
    ? item.price * (1 - item.discount / 100)
    : item.price;

  const totalPrice = discountedPrice * item.quantity;

  return (
    <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 object-cover rounded-lg"
      />
      
      <div className="flex-1">
        <h3 className="font-medium text-gray-900 dark:text-white mb-1">
          {item.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {item.category}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-semibold text-gray-900 dark:text-white">
            {formatPrice(discountedPrice)}
          </span>
          {item.discount > 0 && (
            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
              {formatPrice(item.price)}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-3 py-2 text-center min-w-12 text-gray-900 dark:text-white">
            {item.quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="text-right">
          <p className="font-semibold text-gray-900 dark:text-white">
            {formatPrice(totalPrice)}
          </p>
        </div>

        <button
          onClick={() => removeFromCart(item.id)}
          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;