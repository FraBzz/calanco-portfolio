import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Package, Check } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

const products: Product[] = [
  {
    id: 'prod_001',
    name: 'Premium Headphones',
    price: 199.99,
    description: 'Noise-cancelling wireless headphones with premium sound quality.'
  },
  {
    id: 'prod_002',
    name: 'Smart Watch',
    price: 249.99,
    description: 'Feature-rich smartwatch with health tracking and notifications.'
  },
  {
    id: 'prod_003',
    name: 'Wireless Charger',
    price: 39.99,
    description: 'Fast wireless charging pad compatible with all modern devices.'
  }
];

const EcommerceDemo: React.FC = () => {
  const [cart, setCart] = useState<(Product & { quantity: number })[]>([]);
  const [checkoutStatus, setCheckoutStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  
  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };
  
  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item => 
          item.id === productId 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        );
      } else {
        return prevCart.filter(item => item.id !== productId);
      }
    });
  };
  
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };
  
  const handleCheckout = () => {
    setCheckoutStatus('processing');
    
    // Simulate API call
    setTimeout(() => {
      setCheckoutStatus('success');
      
      // Reset after success display
      setTimeout(() => {
        setCheckoutStatus('idle');
        setCart([]);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
        <h4 className="font-medium mb-4 flex items-center gap-2">
          <Package className="h-5 w-5 text-accent" />
          Available Products
        </h4>
        
        <div className="space-y-4">
          {products.map(product => (
            <motion.div 
              key={product.id}
              whileHover={{ scale: 1.01 }}
              className="bg-white dark:bg-gray-900 p-4 rounded-md border border-separator-light dark:border-separator-dark"
            >
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-medium">{product.name}</h5>
                <span className="font-display font-bold">${product.price.toFixed(2)}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {product.description}
              </p>
              <button
                onClick={() => addToCart(product)}
                className="py-1.5 px-3 bg-accent/10 text-accent text-sm font-medium rounded hover:bg-accent/20 transition-colors"
              >
                Add to Cart
              </button>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
        <h4 className="font-medium mb-4 flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-accent" />
          Your Cart {cart.length > 0 && `(${cart.reduce((total, item) => total + item.quantity, 0)} items)`}
        </h4>
        
        {checkoutStatus === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 dark:bg-green-900/20 p-6 rounded-md text-center"
          >
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 dark:bg-green-800/30 w-16 h-16 rounded-full flex items-center justify-center">
                <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h5 className="text-xl font-bold mb-2 text-green-700 dark:text-green-400">Order Complete!</h5>
            <p className="text-green-600 dark:text-green-300">
              Your order has been successfully processed. 
              The API response includes order confirmation and shipping details.
            </p>
          </motion.div>
        ) : (
          <>
            {cart.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <p>Your cart is empty.</p>
                <p className="text-sm mt-2">Add some products to proceed.</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-6">
                  {cart.map(item => (
                    <div 
                      key={item.id}
                      className="flex justify-between items-center bg-white dark:bg-gray-900 p-3 rounded-md border border-separator-light dark:border-separator-dark"
                    >
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          ${item.price.toFixed(2)} × {item.quantity}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-xs bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-separator-light dark:border-separator-dark pt-4 mb-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-medium">Total:</span>
                    <span className="font-display font-bold text-lg">${getTotalPrice()}</span>
                  </div>
                  
                  <button
                    onClick={handleCheckout}
                    disabled={checkoutStatus === 'processing'}
                    className={`w-full py-2.5 rounded-md font-medium transition-colors ${
                      checkoutStatus === 'processing' 
                        ? 'bg-gray-400 text-white cursor-not-allowed' 
                        : 'bg-cta hover:bg-cta/90 text-white'
                    }`}
                  >
                    {checkoutStatus === 'processing' ? 'Processing...' : 'Checkout'}
                  </button>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-900/80 p-3 rounded text-xs text-gray-600 dark:text-gray-400">
                  <p className="font-medium mb-1">API Request Preview:</p>
                  <code className="block overflow-x-auto">
                    POST /api/checkout<br/>
                    {JSON.stringify({ items: cart, total: parseFloat(getTotalPrice()) }, null, 2)}
                  </code>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EcommerceDemo;