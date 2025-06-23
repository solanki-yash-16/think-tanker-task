import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import CartPage from './pages/CartPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import Toast from './components/common/Toast.jsx';

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </Layout>
      <Toast />
    </>
  );
}

export default App;