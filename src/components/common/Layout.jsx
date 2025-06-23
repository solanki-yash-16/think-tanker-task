import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const Layout = ({ children }) => {
  const location = useLocation();

  const handleSearch = (query) => {
    // This will be handled by the Products page
    if (location.pathname !== '/products') {
      window.location.href = `/products?search=${encodeURIComponent(query)}`;
    } else {
      // Trigger search on current products page
      const event = new CustomEvent('searchProducts', { detail: query });
      window.dispatchEvent(event);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header onSearch={handleSearch} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;