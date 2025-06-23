import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { CHECKOUT_STEPS } from '../utils/constants.js';
import { formatPrice, generateOrderId } from '../utils/helpers.js';
import { showToast } from '../components/common/Toast.jsx';
import CheckoutSteps from '../components/checkout/CheckoutSteps.jsx';
import ThankYou from '../components/checkout/ThankYou.jsx';

const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState(CHECKOUT_STEPS.CART);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderData, setOrderData] = useState(null);
  const [errors, setErrors] = useState({});
  
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    if (cartItems.length === 0 && currentStep !== CHECKOUT_STEPS.THANK_YOU) {
      navigate('/cart');
      return;
    }

    // Pre-fill user info
    if (user) {
      setShippingInfo(prev => ({
        ...prev,
        fullName: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      }));
    }
  }, [isAuthenticated, cartItems.length, currentStep, user, navigate]);

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const validateShippingInfo = () => {
    const newErrors = {};
    
    if (!shippingInfo.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!shippingInfo.email.trim()) newErrors.email = 'Email is required';
    if (!shippingInfo.phone.trim()) newErrors.phone = 'Phone is required';
    if (!shippingInfo.address.trim()) newErrors.address = 'Address is required';
    if (!shippingInfo.city.trim()) newErrors.city = 'City is required';
    if (!shippingInfo.state.trim()) newErrors.state = 'State is required';
    if (!shippingInfo.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleNext = () => {
    const steps = Object.values(CHECKOUT_STEPS);
    const currentIndex = steps.indexOf(currentStep);
    
    if (currentStep === CHECKOUT_STEPS.SHIPPING && !validateShippingInfo()) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const steps = Object.values(CHECKOUT_STEPS);
    const currentIndex = steps.indexOf(currentStep);
    
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const handlePlaceOrder = async () => {
    const orderId = generateOrderId();
    const newOrderData = {
      orderId,
      items: cartItems,
      total,
      shippingInfo,
      paymentMethod,
      orderDate: new Date().toISOString()
    };

    // Save order to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('elitecart_orders') || '[]');
    existingOrders.push(newOrderData);
    localStorage.setItem('elitecart_orders', JSON.stringify(existingOrders));

    setOrderData(newOrderData);
    clearCart();
    setCurrentStep(CHECKOUT_STEPS.THANK_YOU);
    showToast('Order placed successfully!', 'success');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case CHECKOUT_STEPS.CART:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Review Your Cart
            </h2>
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => {
                const discountedPrice = item.discount > 0 
                  ? item.price * (1 - item.discount / 100)
                  : item.price;
                
                return (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {formatPrice(discountedPrice * item.quantity)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex justify-between font-semibold text-gray-900 dark:text-white">
                <span>Total: {formatPrice(total)}</span>
              </div>
            </div>
          </div>
        );

      case CHECKOUT_STEPS.SHIPPING:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Shipping Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={shippingInfo.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.fullName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                />
                {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={shippingInfo.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={shippingInfo.phone}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.address ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                />
                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.city ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                />
                {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={shippingInfo.state}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.state ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                />
                {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={shippingInfo.zipCode}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.zipCode ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                />
                {errors.zipCode && <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Country
                </label>
                <select
                  name="country"
                  value={shippingInfo.country}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                </select>
              </div>
            </div>
          </div>
        );

      case CHECKOUT_STEPS.PAYMENT:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Payment Method
            </h2>
            <div className="space-y-4">
              <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-primary-600"
                  />
                  <span className="font-medium text-gray-900 dark:text-white">Credit/Debit Card</span>
                </label>
              </div>
              
              <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-primary-600"
                  />
                  <span className="font-medium text-gray-900 dark:text-white">PayPal</span>
                </label>
              </div>
              
              <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-primary-600"
                  />
                  <span className="font-medium text-gray-900 dark:text-white">Cash on Delivery</span>
                </label>
              </div>
            </div>
          </div>
        );

      case CHECKOUT_STEPS.CONFIRMATION:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Order Confirmation
            </h2>
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Shipping Address</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {shippingInfo.fullName}<br />
                  {shippingInfo.address}<br />
                  {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}<br />
                  {shippingInfo.country}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Payment Method</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {paymentMethod === 'card' ? 'Credit/Debit Card' : 
                   paymentMethod === 'paypal' ? 'PayPal' : 'Cash on Delivery'}
                </p>
              </div>
            </div>
          </div>
        );

      case CHECKOUT_STEPS.THANK_YOU:
        return <ThankYou orderData={orderData} />;

      default:
        return null;
    }
  };

  if (currentStep === CHECKOUT_STEPS.THANK_YOU) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {renderStepContent()}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <CheckoutSteps currentStep={currentStep} />
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        {renderStepContent()}
        
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          {currentStep !== CHECKOUT_STEPS.CART && (
            <button
              onClick={handleBack}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Back
            </button>
          )}
          
          <div className="ml-auto">
            {currentStep === CHECKOUT_STEPS.CONFIRMATION ? (
              <button
                onClick={handlePlaceOrder}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
              >
                Place Order
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
              >
                Continue
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;