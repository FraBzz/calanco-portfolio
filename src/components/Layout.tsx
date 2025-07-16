import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CalancoLogo } from '../assets/icons';
import LanguageSelector from './LanguageSelector';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation('common');

  useEffect(() => {
    // Always enable dark mode
    document.documentElement.classList.add('dark');
  }, []);

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
    <div className="min-h-screen bg-background-dark text-text-dark">
      <header className="sticky top-0 z-50 border-b border-separator-dark bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Mobile Layout */}
          <div className="flex justify-between items-center md:hidden">
            <NavLink to="/" className="flex items-center gap-0.5">
              <CalancoLogo size="header" />
              <span className="text-2xl font-display font-black leading-[1] -translate-y-[1px]">
                calanco<span className="text-accent">.dev</span>
              </span>
            </NavLink>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 hover:bg-background-dark rounded-full transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:grid grid-cols-3 items-center">
            <NavLink to="/" className="flex items-center gap-0.5 justify-self-start">
              <CalancoLogo size="header" />
              <span className="text-2xl font-display font-black leading-[1] -translate-y-[1px]">
                calanco<span className="text-accent">.dev</span>
              </span>
            </NavLink>            <nav className="flex items-center gap-6 justify-self-center">
              <NavLink 
                to="/business"
                className={({ isActive }) => 
                  `font-medium transition-colors ${isActive ? 'text-accent' : 'hover:text-accent'}`
                }
              >
                {t('nav.business')}
              </NavLink>
              <NavLink
                to="/backend"
                className={({ isActive }) =>
                  `font-medium transition-colors ${isActive ? 'text-accent' : 'hover:text-accent'}`
                }
              >
                {t('nav.backend')}
              </NavLink>
              <NavLink
                to="/frontend"
                className={({ isActive }) =>
                  `font-medium transition-colors ${isActive ? 'text-accent' : 'hover:text-accent'}`
                }
              >
                {t('nav.frontend')}
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `font-medium transition-colors ${isActive ? 'text-accent' : 'hover:text-accent'}`
                }
              >
                {t('nav.about')}
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `font-medium transition-colors ${isActive ? 'text-accent' : 'hover:text-accent'}`
                }
              >
                {t('nav.contact')}
              </NavLink>
            </nav>            <div className="justify-self-end">
              <LanguageSelector />
            </div>
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
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-background-dark z-50 md:hidden"
            >
              <div className="p-4 border-b border-separator-dark flex justify-between items-center">
                <h2 className="font-display font-bold">Navigation</h2>
                <div className="flex items-center gap-2">
                  <LanguageSelector />
                  <button
                    onClick={closeMenu}
                    className="p-2 hover:bg-background-dark rounded-full transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <nav className="p-4 flex flex-col gap-4">
                <NavLink
                  to="/"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `p-2 rounded-md font-medium transition-colors ${isActive
                      ? 'bg-accent/10 text-accent'
                      : 'hover:bg-background-dark'
                    }`
                  }
                >
                  {t('nav.home')}
                </NavLink>
                <NavLink
                  to="/backend"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `p-2 rounded-md font-medium transition-colors ${isActive
                      ? 'bg-accent/10 text-accent'
                      : 'hover:bg-background-dark'
                    }`
                  }
                >
                  {t('nav.backend')}
                </NavLink>
                <NavLink
                  to="/frontend"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `p-2 rounded-md font-medium transition-colors ${isActive
                      ? 'bg-accent/10 text-accent'
                      : 'hover:bg-background-dark'
                    }`
                  }
                >
                  {t('nav.frontend')}
                </NavLink>
                <NavLink
                  to="/business"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `p-2 rounded-md font-medium transition-colors ${isActive
                      ? 'bg-accent/10 text-accent'
                      : 'hover:bg-background-dark'
                    }`
                  }
                >
                  {t('nav.business')}
                </NavLink>
                <NavLink
                  to="/about"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `p-2 rounded-md font-medium transition-colors ${isActive
                      ? 'bg-accent/10 text-accent'
                      : 'hover:bg-background-dark'
                    }`
                  }
                >
                  {t('nav.about')}
                </NavLink>
                <NavLink
                  to="/contact"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `p-2 rounded-md font-medium transition-colors ${isActive
                      ? 'bg-accent/10 text-accent'
                      : 'hover:bg-background-dark'
                    }`
                  }
                >
                  {t('nav.contact')}
                </NavLink>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main>
        {children}
      </main>
      <footer className="border-t border-separator-dark py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Calanco. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;


