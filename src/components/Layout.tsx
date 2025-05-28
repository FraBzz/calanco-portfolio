import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CalancoLogo } from '../assets/icons';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDarkMode);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'tween',
        duration: 0.3
      }
    },
    open: {
      x: 0,
      transition: {
        type: 'tween',
        duration: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <header className="sticky top-0 z-50 border-b border-separator-light dark:border-separator-dark bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">          <NavLink to="/" className="flex items-center gap-1.5">
            <CalancoLogo size="header" />
            <span className="text-2xl font-display font-black leading-[1] -translate-y-[1px]">
              calanco
            </span>
          </NavLink>

          <nav className="hidden md:flex items-center gap-6">
            <NavLink 
              to="/backend"
              className={({ isActive }) => 
                `font-medium transition-colors ${isActive ? 'text-accent' : 'hover:text-accent'}`
              }
            >
              Backend
            </NavLink>
            <NavLink 
              to="/frontend"
              className={({ isActive }) => 
                `font-medium transition-colors ${isActive ? 'text-accent' : 'hover:text-accent'}`
              }
            >
              Frontend
            </NavLink>
            <NavLink 
              to="/mobile"
              className={({ isActive }) => 
                `font-medium transition-colors ${isActive ? 'text-accent' : 'hover:text-accent'}`
              }
            >
              Mobile
            </NavLink>
            <NavLink 
              to="/about"
              className={({ isActive }) => 
                `font-medium transition-colors ${isActive ? 'text-accent' : 'hover:text-accent'}`
              }
            >
              About
            </NavLink>
            <NavLink 
              to="/contact"
              className={({ isActive }) => 
                `font-medium transition-colors ${isActive ? 'text-accent' : 'hover:text-accent'}`
              }
            >
              Contact
            </NavLink>
          </nav>

          <div className="flex items-center gap-4">
            <motion.button
              onClick={toggleDarkMode}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-background-dark transition-colors"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </motion.button>

            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-background-dark rounded-full transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={closeMenu}
            />
            
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-background-light dark:bg-background-dark z-50 md:hidden"
            >
              <div className="p-4 border-b border-separator-light dark:border-separator-dark flex justify-between items-center">
                <h2 className="font-display font-bold">Navigation</h2>
                <button
                  onClick={closeMenu}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-background-dark rounded-full transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <nav className="p-4 flex flex-col gap-4">
                <NavLink 
                  to="/"
                  onClick={closeMenu}
                  className={({ isActive }) => 
                    `p-2 rounded-md font-medium transition-colors ${
                      isActive 
                        ? 'bg-accent/10 text-accent' 
                        : 'hover:bg-gray-100 dark:hover:bg-background-dark'
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink 
                  to="/backend"
                  onClick={closeMenu}
                  className={({ isActive }) => 
                    `p-2 rounded-md font-medium transition-colors ${
                      isActive 
                        ? 'bg-accent/10 text-accent' 
                        : 'hover:bg-gray-100 dark:hover:bg-background-dark'
                    }`
                  }
                >
                  Backend
                </NavLink>
                <NavLink 
                  to="/frontend"
                  onClick={closeMenu}
                  className={({ isActive }) => 
                    `p-2 rounded-md font-medium transition-colors ${
                      isActive 
                        ? 'bg-accent/10 text-accent' 
                        : 'hover:bg-gray-100 dark:hover:bg-background-dark'
                    }`
                  }
                >
                  Frontend
                </NavLink>
                <NavLink 
                  to="/mobile"
                  onClick={closeMenu}
                  className={({ isActive }) => 
                    `p-2 rounded-md font-medium transition-colors ${
                      isActive 
                        ? 'bg-accent/10 text-accent' 
                        : 'hover:bg-gray-100 dark:hover:bg-background-dark'
                    }`
                  }
                >
                  Mobile
                </NavLink>
                <NavLink 
                  to="/about"
                  onClick={closeMenu}
                  className={({ isActive }) => 
                    `p-2 rounded-md font-medium transition-colors ${
                      isActive 
                        ? 'bg-accent/10 text-accent' 
                        : 'hover:bg-gray-100 dark:hover:bg-background-dark'
                    }`
                  }
                >
                  About
                </NavLink>
                <NavLink 
                  to="/contact"
                  onClick={closeMenu}
                  className={({ isActive }) => 
                    `p-2 rounded-md font-medium transition-colors ${
                      isActive 
                        ? 'bg-accent/10 text-accent' 
                        : 'hover:bg-gray-100 dark:hover:bg-background-dark'
                    }`
                  }
                >
                  Contact
                </NavLink>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main>
        {children}
      </main>
      
      <footer className="border-t border-separator-light dark:border-separator-dark py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Calanco. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;