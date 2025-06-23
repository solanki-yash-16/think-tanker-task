import React from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { formatPrice } from '../../utils/helpers.js';
import { showToast } from '../common/Toast.jsx';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      showToast('Please sign in to add items to cart', 'warning');
      return;
    }

    if (!product.inStock) {
      showToast('Product is currently out of stock', 'error');
      return;
    }

    addToCart(product);
    showToast(`${product.name} added to cart`, 'success');
  };

  const discountedPrice = product.discount > 0 
    ? product.price * (1 - product.discount / 100)
    : product.price;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden group">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
          onError={(e) => {
            e.target.src = 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop';
          }}
        />
        {product.discount > 0 && (
          <span className="absolute top-2 left-2 bg-accent-500 text-white px-2 py-1 rounded text-sm font-semibold">
            -{product.discount}%
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold bg-red-600 px-3 py-1 rounded">
              Out of Stock
            </span>
          </div>
        )}
        <button className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs text-primary-600 dark:text-primary-400 font-medium uppercase tracking-wide">
            {product.category}
          </span>
        </div>
        
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight">
          {product.name}
        </h3>

        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {product.rating} ({product.reviews})
          </span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            {formatPrice(discountedPrice)}
          </span>
          {product.discount > 0 && (
            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium transition-colors ${
            product.inStock
              ? 'bg-primary-600 hover:bg-primary-700 text-white'
              : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;