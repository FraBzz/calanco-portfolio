import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Key, AlertCircle } from 'lucide-react';

const AuthDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      if (formState.email.includes('@') && formState.password.length >= 6) {
        setResponse({
          status: 'success',
          data: {
            user: {
              id: 'usr_123456789',
              email: formState.email,
              name: 'Demo User',
              createdAt: new Date().toISOString()
            },
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c3JfMTIzNDU2Nzg5IiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
          }
        });
      } else {
        setError('Invalid email or password');
        setResponse(null);
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      if (formState.email.includes('@') && formState.password.length >= 6 && formState.name) {
        setResponse({
          status: 'success',
          data: {
            user: {
              id: 'usr_' + Math.floor(Math.random() * 1000000),
              email: formState.email,
              name: formState.name,
              createdAt: new Date().toISOString()
            },
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c3JfbmV3dXNlciIsIm5hbWUiOiJOZXcgVXNlciIsImlhdCI6MTUxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
          }
        });
      } else {
        setError('Please fill out all fields correctly');
        setResponse(null);
      }
      setIsLoading(false);
    }, 1000);
  };

  const resetDemo = () => {
    setResponse(null);
    setFormState({
      email: '',
      password: '',
      name: ''
    });
    setError(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-neutral-800 dark:bg-background-dark p-6 rounded-lg">
        <div className="flex border-b border-separator-light dark:border-separator-dark mb-6">
          <button
            onClick={() => setActiveTab('login')}
            className={`pb-3 px-4 font-medium ${
              activeTab === 'login'
                ? 'border-b-2 border-accent text-accent'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`pb-3 px-4 font-medium ${
              activeTab === 'register'
                ? 'border-b-2 border-accent text-accent'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            Register
          </button>
        </div>

        {activeTab === 'login' ? (
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className="pl-10 w-full p-2 bg-white dark:bg-neutral-800 border border-separator-light dark:border-separator-dark rounded-md"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formState.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="pl-10 w-full p-2 bg-white dark:bg-neutral-800 border border-separator-light dark:border-separator-dark rounded-md"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 text-sm rounded-md flex items-start gap-2">
                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>            )}
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2.5 rounded-md font-medium transition-colors ${
                isLoading 
                  ? 'bg-accent/20 text-accent/50 cursor-not-allowed' 
                  : 'bg-accent hover:bg-accent/90 text-white'
              }`}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full p-2 bg-white dark:bg-neutral-800 border border-separator-light dark:border-separator-dark rounded-md"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className="w-full p-2 bg-white dark:bg-neutral-800 border border-separator-light dark:border-separator-dark rounded-md"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formState.password}
                onChange={handleChange}
                placeholder="Min. 6 characters"
                className="w-full p-2 bg-white dark:bg-neutral-800 border border-separator-light dark:border-separator-dark rounded-md"
                required
                minLength={6}
              />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 text-sm rounded-md flex items-start gap-2">
                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
              <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2.5 rounded-md font-medium transition-colors ${
                isLoading 
                  ? 'bg-accent/20 text-accent/50 cursor-not-allowed' 
                  : 'bg-accent hover:bg-accent/90 text-white'
              }`}
            >
              {isLoading ? 'Creating account...' : 'Register'}
            </button>
          </form>
        )}
      </div>
      
      <div className="bg-neutral-800 dark:bg-background-dark p-6 rounded-lg">
        <h4 className="font-medium mb-4">API Response</h4>
        {response ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white dark:bg-neutral-800 p-4 rounded-md overflow-x-auto mb-4"
            >
              <pre className="text-sm whitespace-pre-wrap">
                {JSON.stringify(response, null, 2)}
              </pre>
            </motion.div>
            <button
              onClick={resetDemo}
              className="text-sm text-accent hover:underline"
            >
              Reset demo
            </button>
          </>
        ) : (
          <div className="text-gray-500 dark:text-gray-400 text-sm italic">
            No data yet. Submit the form to see the API response.
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthDemo;