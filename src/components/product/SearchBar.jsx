import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { getCategories } from '../../utils/api.js';

const SearchBar = ({ onSearch, onFilter, searchQuery, selectedCategory }) => {
  const [localSearch, setLocalSearch] = useState(searchQuery || '');
  const [showFilters, setShowFilters] = useState(false);
  const categories = getCategories();

  const handleSearch = (e) => {
    e.preventDefault();
    // Only search if 3 or more characters, or if empty (to clear search)
    if (localSearch.trim().length >= 3 || localSearch.trim().length === 0) {
      onSearch(localSearch.trim());
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalSearch(value);
    
    // Auto-search when user types 3 or more characters
    if (value.trim().length >= 3) {
      onSearch(value.trim());
    } else if (value.trim().length === 0) {
      onSearch('');
    }
  };

  const clearSearch = () => {
    setLocalSearch('');
    onSearch('');
  };

  const handleCategoryChange = (category) => {
    onFilter(category);
    setShowFilters(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6 sticky top-16 z-30">
      <form onSubmit={handleSearch} className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <input
            type="text"
            value={localSearch}
            onChange={handleInputChange}
            placeholder="Search products (minimum 3 characters)..."
            className="w-full pl-4 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
          {localSearch && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-600"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 whitespace-nowrap"
          >
            <Filter className="w-5 h-5" />
            <span className="hidden sm:block">
              {selectedCategory || 'All Categories'}
            </span>
          </button>

          {showFilters && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
              <div className="py-2">
                <button
                  onClick={() => handleCategoryChange('')}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    !selectedCategory ? 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400' : 'text-gray-900 dark:text-white'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      selectedCategory === category 
                        ? 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400' 
                        : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </form>

      {(searchQuery || selectedCategory) && (
        <div className="mt-3 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <span>Active filters:</span>
          {searchQuery && (
            <span className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-2 py-1 rounded">
              Search: "{searchQuery}"
            </span>
          )}
          {selectedCategory && (
            <span className="bg-secondary-100 dark:bg-secondary-900 text-secondary-800 dark:text-secondary-200 px-2 py-1 rounded">
              Category: {selectedCategory}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;