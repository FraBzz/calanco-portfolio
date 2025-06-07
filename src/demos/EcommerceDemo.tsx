import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Package, Check, AlertCircle, Clock, CheckCircle, Cog, Truck, Home, X, RefreshCw } from 'lucide-react';
import { ProductsService, CartService, OrdersService, ORDER_STATUS_DESCRIPTIONS, type Product, type OrderResponseDto, type OrderStatus } from '../services';

type CheckoutStatus = 'idle' | 'processing' | 'success' | 'error';

// Helper function to get status color
const getStatusColor = (status: OrderStatus): string => {
  switch (status) {
    case 'pending':
      return 'text-yellow-600 dark:text-yellow-400';
    case 'confirmed':
      return 'text-blue-600 dark:text-blue-400';
    case 'processing':
      return 'text-indigo-600 dark:text-indigo-400';
    case 'shipped':
      return 'text-purple-600 dark:text-purple-400';
    case 'delivered':
      return 'text-green-600 dark:text-green-400';
    case 'cancelled':
      return 'text-red-600 dark:text-red-400';
    case 'refunded':
      return 'text-orange-600 dark:text-orange-400';
    default:
      return 'text-gray-600 dark:text-gray-400';
  }
};

// Helper function to get status icon
const getStatusIcon = (status: OrderStatus): React.ReactNode => {
  const iconProps = { className: "h-4 w-4" };
  
  switch (status) {
    case 'pending':
      return <Clock {...iconProps} />;
    case 'confirmed':
      return <CheckCircle {...iconProps} />;
    case 'processing':
      return <Cog {...iconProps} />;
    case 'shipped':
      return <Truck {...iconProps} />;
    case 'delivered':
      return <Home {...iconProps} />;
    case 'cancelled':
      return <X {...iconProps} />;
    case 'refunded':
      return <RefreshCw {...iconProps} />;
    default:
      return <Package {...iconProps} />;
  }
};

const EcommerceDemo: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [productsError, setProductsError] = useState<string | null>(null);
  const [cartError, setCartError] = useState<string | null>(null);
  const [cart, setCart] = useState<(Product & { quantity: number })[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const [isCartLoading, setIsCartLoading] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState<CheckoutStatus>('idle');
  const [completedOrder, setCompletedOrder] = useState<OrderResponseDto | null>(null);
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        setProductsError(null);
        const productsData = await ProductsService.getAllProducts();
        setProducts(productsData);
      } catch (err: any) {
        setProductsError(err.message || 'Failed to load products');
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);
  const addToCart = async (product: Product) => {
    setIsCartLoading(true);
    try {
      const quantityToAdd = 1;

      const { cartId: newCartId, cart: updatedCart } = await CartService.addToCart(cartId, {
        productId: product.id,
        quantity: quantityToAdd
      });

      // Aggiorna l'ID del carrello se è cambiato (nuovo carrello creato)
      if (cartId !== newCartId) {
        setCartId(newCartId);
      }

      // Converte i dati del carrello backend in formato locale
      const updatedLocalCart = updatedCart.lines.map(line => {
        const productData = products.find(p => p.id === line.productId);
        return {
          ...productData!,
          quantity: line.quantity
        };
      });      setCart(updatedLocalCart);
    } catch (err: any) {
      setCartError(err.message || 'Failed to add item to cart');
      // Clear cart error after 3 seconds
      setTimeout(() => setCartError(null), 3000);
      // Fallback al comportamento locale in caso di errore
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
    } finally {
      setIsCartLoading(false);
    }
  };
    const removeFromCart = async (productId: string) => {
    if (!cartId) return;
    
    setIsCartLoading(true);
    try {
      const updatedCart = await CartService.removeFromCart(cartId, productId);
      
      // Converte i dati del carrello backend in formato locale
      const updatedLocalCart = updatedCart.lines.map(line => {
        const productData = products.find(p => p.id === line.productId);
        return {
          ...productData!,
          quantity: line.quantity
        };
      });      setCart(updatedLocalCart);
    } catch (err: any) {
      setCartError(err.message || 'Failed to remove item from cart');
      // Clear cart error after 3 seconds
      setTimeout(() => setCartError(null), 3000);
      // Fallback al comportamento locale in caso di errore
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
    } finally {
      setIsCartLoading(false);
    }
  };
  
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };
    const handleCheckout = async () => {
    if (!cartId || cart.length === 0) return;
    
    setCheckoutStatus('processing');
    
    try {
      const orderResponse = await OrdersService.checkout({
        cartId: cartId
      });
      
      setCompletedOrder(orderResponse);
      setCheckoutStatus('success');
        // Reset cart after successful checkout
      setCart([]);
      setCartId(null);} catch (err: any) {
      console.error('Checkout failed:', err);
      setCheckoutStatus('error');
      // Note: We don't set cart error here as checkout failure is handled by checkoutStatus
      
      // Reset error state after 3 seconds
      setTimeout(() => {
        setCheckoutStatus('idle');
      }, 3000);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">      <div className="bg-neutral-800 dark:bg-background-dark p-6 rounded-lg">        <h4 className="font-medium mb-4 flex items-center gap-2">
          <Package className="h-5 w-5 text-accent" />
          Available Products ({products.length})
        </h4>
        
        {isLoading ? (
          <div className="flex flex-col items-center py-8 text-gray-500 dark:text-gray-400">
            <div className="animate-spin h-8 w-8 mb-4 border-2 border-accent border-t-transparent rounded-full"></div>
            <p>Loading products...</p>
          </div>        ) : productsError ? (
          <div className="flex flex-col items-center py-8 text-red-500 dark:text-red-400">
            <AlertCircle className="h-8 w-8 mb-4" />
            <p className="font-medium mb-2">Error loading products</p>
            <p className="text-sm text-center">{productsError}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 py-1.5 px-3 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium rounded hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors"
            >
              Retry
            </button>
          </div>) : (
          <div className="relative">
            <div 
              className="h-[400px] overflow-y-auto pr-2 custom-scrollbar"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#6B7280 transparent'
              }}
            >
              <div className="space-y-4">
                {products.map(product => (
                  <motion.div 
                    key={product.id}
                    whileHover={{ scale: 1.01 }}
                    className="bg-white dark:bg-neutral-800 p-4 rounded-md border border-separator-light dark:border-separator-dark flex-shrink-0"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-medium">{product.name}</h5>
                      <span className="font-display font-bold">${product.price.toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {product.description}
                    </p>                    <button
                      onClick={() => addToCart(product)}
                      disabled={isCartLoading}                      className={`py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                        isCartLoading 
                          ? 'bg-accent/20 text-accent/50 cursor-not-allowed' 
                          : 'bg-accent text-white hover:bg-accent/90 dark:hover:bg-accent/80 shadow-sm hover:shadow-md'
                      }`}
                    >
                      {isCartLoading ? 'Adding...' : 'Add to Cart'}
                    </button>
                  </motion.div>
                ))}
              </div>            </div>
          </div>
        )}
      </div>
      
      <div className="bg-neutral-800 dark:bg-background-dark p-6 rounded-lg">        <h4 className="font-medium mb-4 flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-accent" />
          Your Cart {cart.length > 0 && `(${cart.reduce((total, item) => total + item.quantity, 0)} items)`}
        </h4>
        
        {cartError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 dark:bg-red-900/20 p-3 rounded-md mb-4 border border-red-200 dark:border-red-800"
          >
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <AlertCircle className="h-4 w-4" />
              <p className="text-sm">{cartError}</p>
            </div>
          </motion.div>
        )}
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
            </div>            <h5 className="text-xl font-bold mb-2 text-green-700 dark:text-green-400">Order Complete!</h5>
            {completedOrder ? (
              <div className="text-left mt-4 space-y-2">
                <p className="text-green-600 dark:text-green-300 text-center mb-4">
                  Your order has been successfully processed.
                </p>                <div className="bg-green-100 dark:bg-green-800/20 p-4 rounded text-sm">
                  <p><strong>Order ID:</strong> {completedOrder.id}</p>                  <p>
                    <strong>Status:</strong> 
                    <span className={`ml-1 font-medium ${getStatusColor(completedOrder.status as OrderStatus)} flex items-center gap-1`}>
                      {getStatusIcon(completedOrder.status as OrderStatus)}
                      {ORDER_STATUS_DESCRIPTIONS[completedOrder.status as OrderStatus] || completedOrder.status}
                    </span>
                  </p>
                  <p><strong>Total:</strong> ${completedOrder.totalAmount.toFixed(2)}</p>
                  <p><strong>Items:</strong> {completedOrder.orderLines.length}</p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                    Order created at: {new Date(completedOrder.createdAt).toLocaleString()}
                  </p>
                </div>
                
                <div className="text-center mt-6">
                  <button
                    onClick={() => {
                      setCheckoutStatus('idle');
                      setCompletedOrder(null);
                    }}
                    className="py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors"
                  >
                    Close & Continue Shopping
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-green-600 dark:text-green-300 mb-6">
                  Your order has been successfully processed. 
                  The API response includes order confirmation and shipping details.
                </p>
                
                <div className="text-center">
                  <button
                    onClick={() => {
                      setCheckoutStatus('idle');
                      setCompletedOrder(null);
                    }}
                    className="py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors"
                  >
                    Close & Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        ) : checkoutStatus === 'error' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 dark:bg-red-900/20 p-6 rounded-md text-center"
          >
            <div className="flex justify-center mb-4">
              <div className="bg-red-100 dark:bg-red-800/30 w-16 h-16 rounded-full flex items-center justify-center">
                <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <h5 className="text-xl font-bold mb-2 text-red-700 dark:text-red-400">Checkout Failed</h5>
            <p className="text-red-600 dark:text-red-300">
              There was an error processing your order. Please try again.
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
                      className="flex justify-between items-center bg-white dark:bg-neutral-800 p-3 rounded-md border border-separator-light dark:border-separator-dark"
                    >
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          ${item.price.toFixed(2)} × {item.quantity}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>                        <button
                          onClick={() => removeFromCart(item.id)}
                          disabled={isCartLoading}
                          className={`p-1 text-xs rounded transition-colors ${
                            isCartLoading
                              ? 'bg-gray-200/50 dark:bg-gray-700/30 text-gray-400/60 dark:text-gray-500/50 cursor-not-allowed'
                              : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                          }`}
                        >
                          {isCartLoading ? '...' : 'Remove'}
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
                        ? 'bg-cta/20 text-cta/50 cursor-not-allowed' 
                        : 'bg-cta hover:bg-cta/90 text-white'
                    }`}
                  >
                    {checkoutStatus === 'processing' ? 'Processing...' : 'Checkout'}
                  </button>
                </div>
                  <div className="bg-gray-100 dark:bg-neutral-800/80 p-3 rounded text-xs text-gray-600 dark:text-gray-400">
                  <p className="font-medium mb-1">API Request Preview:</p>
                  <code className="block overflow-x-auto">
                    POST /api/checkout<br/>
                    {JSON.stringify({ items: cart, total: parseFloat(getTotalPrice()) }, null, 2)}
                  </code>
                  {cartId && (
                    <div className="mt-2 pt-2 border-t border-gray-300 dark:border-gray-600">
                      <p className="font-medium mb-1">Current Cart ID:</p>
                      <code className="text-xs break-all">{cartId}</code>
                    </div>
                  )}
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