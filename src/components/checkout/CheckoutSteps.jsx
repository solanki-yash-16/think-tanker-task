import React from 'react';
import { Check, ShoppingCart, Truck, CreditCard, FileText, Gift } from 'lucide-react';
import { CHECKOUT_STEPS } from '../../utils/constants.js';

const CheckoutSteps = ({ currentStep }) => {
  const steps = [
    { key: CHECKOUT_STEPS.CART, label: 'Cart Review', icon: ShoppingCart },
    { key: CHECKOUT_STEPS.SHIPPING, label: 'Shipping Info', icon: Truck },
    { key: CHECKOUT_STEPS.PAYMENT, label: 'Payment', icon: CreditCard },
    { key: CHECKOUT_STEPS.CONFIRMATION, label: 'Review Order', icon: FileText },
    { key: CHECKOUT_STEPS.THANK_YOU, label: 'Complete', icon: Gift }
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.key === currentStep);
  };

  const currentStepIndex = getCurrentStepIndex();

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const IconComponent = step.icon;

          return (
            <React.Fragment key={step.key}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    isCompleted
                      ? 'bg-green-500 border-green-500 text-white'
                      : isCurrent
                      ? 'bg-primary-600 border-primary-600 text-white'
                      : 'bg-gray-200 border-gray-300 text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-500'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <IconComponent className="w-5 h-5" />
                  )}
                </div>
                <span
                  className={`mt-2 text-xs font-medium ${
                    isCompleted || isCurrent
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-4 ${
                    index < currentStepIndex
                      ? 'bg-green-500'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default CheckoutSteps;