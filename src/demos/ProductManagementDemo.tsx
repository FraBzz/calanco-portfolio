import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, Package, Check, AlertCircle, X, DollarSign, FileText, Save } from 'lucide-react';
import { ProductsService, type Product, type CreateProductDto, type UpdateProductDto } from '../services';
import { DemoLimits } from '../utils/demoLimits';
import DemoNotice from '../components/DemoNotice';

type FormMode = 'create' | 'edit' | 'view';
type ActionStatus = 'idle' | 'loading' | 'success' | 'error';

interface ProductFormData {
  name: string;
  description: string;
  price: string; // Keep as string for form handling
}

const ProductManagementDemo: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [formMode, setFormMode] = useState<FormMode>('view');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: ''
  });
  const [actionStatus, setActionStatus] = useState<ActionStatus>('idle');
  const [actionMessage, setActionMessage] = useState<string>('');

  // Load products on mount
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const productsData = await ProductsService.getAllProducts();
      setProducts(productsData);
    } catch (err: any) {
      setError(err.message || 'Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', price: '' });
    setEditingProduct(null);
    setFormMode('view');
    setActionStatus('idle');
    setActionMessage('');
  };
  const handleCreateNew = () => {
    // Check demo limits
    const canCreate = DemoLimits.canCreateProduct();
    if (!canCreate.allowed) {
      setActionStatus('error');
      setActionMessage(canCreate.message || 'Demo limit reached');
      setTimeout(() => {
        setActionStatus('idle');
        setActionMessage('');
      }, 5000);
      return;
    }

    const canOperate = DemoLimits.canPerformOperation();
    if (!canOperate.allowed) {
      setActionStatus('error');
      setActionMessage(canOperate.message || 'Too many operations');
      setTimeout(() => {
        setActionStatus('idle');
        setActionMessage('');
      }, 3000);
      return;
    }

    resetForm();
    setFormMode('create');
    DemoLimits.recordOperation();
  };
  const handleEdit = (product: Product) => {
    const canOperate = DemoLimits.canPerformOperation();
    if (!canOperate.allowed) {
      setActionStatus('error');
      setActionMessage(canOperate.message || 'Too many operations');
      setTimeout(() => {
        setActionStatus('idle');
        setActionMessage('');
      }, 3000);
      return;
    }

    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString()
    });
    setFormMode('edit');
    DemoLimits.recordOperation();
  };  const handleDelete = async (product: Product) => {
    const canOperate = DemoLimits.canPerformOperation();
    if (!canOperate.allowed) {
      setActionStatus('error');
      setActionMessage(canOperate.message || 'Too many operations');
      setTimeout(() => {
        setActionStatus('idle');
        setActionMessage('');
      }, 3000);
      return;
    }

    if (!window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      return;
    }

    setActionStatus('loading');
    DemoLimits.recordOperation();
    
    try {
      await ProductsService.deleteProduct(product.id);
      setProducts(prev => prev.filter(p => p.id !== product.id));
      setActionStatus('success');
      setActionMessage(`Product "${product.name}" deleted successfully`);
      
      setTimeout(() => {
        setActionStatus('idle');
        setActionMessage('');
      }, 3000);
    } catch (err: any) {
      setActionStatus('error');
      setActionMessage(err.message || 'Error deleting product');
      
      setTimeout(() => {
        setActionStatus('idle');
        setActionMessage('');
      }, 5000);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const canOperate = DemoLimits.canPerformOperation();
    if (!canOperate.allowed) {
      setActionStatus('error');
      setActionMessage(canOperate.message || 'Too many operations');
      setTimeout(() => {
        setActionStatus('idle');
        setActionMessage('');
      }, 3000);
      return;
    }

    if (!formData.name.trim() || !formData.description.trim() || !formData.price.trim()) {
      setActionStatus('error');
      setActionMessage('All fields are required');
      setTimeout(() => {
        setActionStatus('idle');
        setActionMessage('');
      }, 3000);
      return;
    }

    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      setActionStatus('error');
      setActionMessage('Price must be a positive number');
      setTimeout(() => {
        setActionStatus('idle');
        setActionMessage('');
      }, 3000);
      return;
    }

    setActionStatus('loading');
    DemoLimits.recordOperation();
    
    try {
      if (formMode === 'create') {
        const createData: CreateProductDto = {
          name: formData.name.trim(),
          description: formData.description.trim(),
          price: price
        };
        
        const newProduct = await ProductsService.createProduct(createData);
        setProducts(prev => [...prev, newProduct]);
        setActionMessage(`Product "${newProduct.name}" created successfully`);
        
        DemoLimits.recordProductCreation();
      } else if (formMode === 'edit' && editingProduct) {
        const updateData: UpdateProductDto = {
          name: formData.name.trim(),
          description: formData.description.trim(),
          price: price
        };
        
        const updatedProduct = await ProductsService.updateProduct(editingProduct.id, updateData);
        setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
        setActionMessage(`Product "${updatedProduct.name}" updated successfully`);
      }
      
      setActionStatus('success');
      resetForm();
      
      setTimeout(() => {
        setActionStatus('idle');
        setActionMessage('');
      }, 3000);
    } catch (err: any) {
      setActionStatus('error');
      setActionMessage(err.message || 'Error saving product');
      
      setTimeout(() => {
        setActionStatus('idle');
        setActionMessage('');
      }, 5000);
    }
  };

  const handleInputChange = (field: keyof ProductFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">      {/* Header */}
      <div className="flex justify-between items-center">        <h3 className="font-semibold text-xl flex items-center gap-2">
          <Package className="h-6 w-6 text-accent" />
          Product Management
        </h3>
        
        <div className="flex items-center gap-3">
          <div className="text-xs text-gray-400 hidden sm:block">
            Demo: {DemoLimits.getSessionStats().productsCreated}/{DemoLimits.getSessionStats().maxProducts} products
          </div>
          
          <button
            onClick={handleCreateNew}
            className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            <Plus className="h-4 w-4" />
            New Product
          </button>
        </div>
      </div>

      <AnimatePresence>
        {actionMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 rounded-md flex items-center gap-2 ${
              actionStatus === 'success' 
                ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
                : actionStatus === 'error'
                ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
                : 'bg-blue-900/20 text-blue-300 border border-blue-800'
            }`}
          >
            {actionStatus === 'success' && <Check className="h-4 w-4" />}
            {actionStatus === 'error' && <AlertCircle className="h-4 w-4" />}
            <span>{actionMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>  
      <AnimatePresence>
        {formMode !== 'view' && (
          <>            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={resetForm}
            ><div 
                className="bg-neutral-800 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >                <div className="flex items-center justify-between p-6 border-b border-separator-dark">
                  <h4 className="font-medium text-lg">
                    {formMode === 'create' ? 'Create New Product' : 'Edit Product'}
                  </h4>
                  <button
                    onClick={resetForm}
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">                    <div>
                      <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Product Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-3 py-2 border border-separator-dark rounded-md bg-white dark:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="Enter product name"
                        disabled={actionStatus === 'loading'}
                        autoFocus
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Description
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-separator-dark rounded-md bg-white dark:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                        placeholder="Enter product description"
                        disabled={actionStatus === 'loading'}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        Price ($)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                        className="w-full px-3 py-2 border border-separator-dark rounded-md bg-white dark:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="0.00"
                        disabled={actionStatus === 'loading'}
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="submit"
                        disabled={actionStatus === 'loading'}                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md font-medium transition-colors ${
                          actionStatus === 'loading'
                            ? 'bg-accent/20 text-accent/50 cursor-not-allowed'
                            : 'bg-cta hover:bg-cta/90 text-white'
                        }`}
                      >
                        {actionStatus === 'loading' ? (
                          <>
                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                            Saving...
                          </>                        ) : (
                          <>
                            <Save className="h-4 w-4" />
                            {formMode === 'create' ? 'Create Product' : 'Update Product'}
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={resetForm}
                        disabled={actionStatus === 'loading'}
                        className="px-4 py-2.5 border border-separator-dark rounded-md font-medium hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>

                  <div className="mt-6 bg-neutral-700/50 p-3 rounded text-xs text-gray-400">
                    <p className="font-medium mb-1">API Request Preview:</p>
                    <code className="block overflow-x-auto">
                      {formMode === 'create' ? 'POST' : 'PUT'} /api/products
                      {formMode === 'edit' && editingProduct ? `/${editingProduct.id}` : ''}
                      <br/>
                      {JSON.stringify({
                        name: formData.name || 'Product Name',
                        description: formData.description || 'Product Description', 
                        price: parseFloat(formData.price) || 0
                      }, null, 2)}
                    </code>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Products List */}
      <div className="bg-background-dark p-6 rounded-lg">
          <h4 className="font-medium mb-4 flex items-center gap-2">
            <Package className="h-5 w-5 text-accent" />
            Registered Products ({products.length})
          </h4>

          {isLoading ? (
            <div className="flex flex-col items-center py-8 text-gray-400">
              <div className="animate-spin h-8 w-8 mb-4 border-2 border-accent border-t-transparent rounded-full"></div>
              <p>Loading products...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center py-8 text-red-500 dark:text-red-400">
              <AlertCircle className="h-8 w-8 mb-4" />
              <p className="font-medium mb-2">Loading Error</p>
              <p className="text-sm text-center">{error}</p>
              <button
                onClick={loadProducts}
                className="mt-4 py-1.5 px-3 bg-red-900/20 text-red-400 text-sm font-medium rounded hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />              <p>No products found.</p>
              <p className="text-sm mt-2">Start by creating your first product.</p>
            </div>          ) : (
            <div className="max-h-96 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
              {products.map(product => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-neutral-800 p-4 rounded-md border border-separator-dark"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h5 className="font-medium text-lg">{product.name}</h5>
                      <p className="text-sm text-gray-400 mb-2">
                        {product.description}
                      </p>
                      <div className="flex items-center gap-2">                        <span className="font-display font-bold text-xl text-accent">
                          €{product.price.toFixed(2)}
                        </span>
                        <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">
                          ID: {product.id}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(product)}
                        disabled={actionStatus === 'loading'}                        className={`p-2 rounded transition-colors ${
                          actionStatus === 'loading'
                            ? 'bg-blue-100/30 dark:bg-blue-900/10 text-blue-400/50 dark:text-blue-500/40 cursor-not-allowed'
                            : 'bg-blue-900/20 text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/40'
                        }`}
                        title="Edit product"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={() => handleDelete(product)}
                        disabled={actionStatus === 'loading'}                        className={`p-2 rounded transition-colors ${
                          actionStatus === 'loading'
                            ? 'bg-red-100/30 dark:bg-red-900/10 text-red-400/50 dark:text-red-500/40 cursor-not-allowed'
                            : 'bg-red-900/20 text-red-400 hover:bg-red-200 dark:hover:bg-red-900/40'
                        }`}
                        title="Delete product"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>                </motion.div>
              ))}
            </div>
          )}
        </div>
    </div>
  );
};

export default ProductManagementDemo;



