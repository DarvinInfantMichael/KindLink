import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, HeartHandshake } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const links = [
    { name: 'ABOUT KINDLINK', path: '/' },
    { name: 'FUTURE PLANS', path: '/future-plans' },
  ];

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group cursor-pointer" onClick={closeMenu}>
          <motion.div 
            whileHover={{ rotate: 12, scale: 1.1 }}
            className="bg-brand-500 p-2 rounded-xl transition-transform duration-300 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
          >
            <HeartHandshake className="w-6 h-6 text-white" />
          </motion.div>
          <span className="text-2xl font-black text-white tracking-tight drop-shadow-md">KindLink</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link 
              key={link.name}
              to={link.path} 
              className={`text-sm font-bold uppercase tracking-wider transition-colors drop-shadow-sm ${location.pathname === link.path ? 'text-brand-400 border-b-2 border-brand-500 pb-1' : 'text-white/70 hover:text-white'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Actions & Mobile Toggle */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link to="/login" className="text-sm font-bold text-white/80 hover:text-white transition-colors hidden sm:block uppercase tracking-wider drop-shadow-sm">Log in</Link>
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
            <Link to="/register" onClick={closeMenu} className="text-xs sm:text-sm font-bold uppercase tracking-wider bg-brand-500 text-white hover:bg-brand-600 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] transition-all">Volunteer</Link>
          </motion.div>
          
          <button 
            className="md:hidden p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors ml-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900 border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {links.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path}
                  onClick={closeMenu}
                  className={`text-sm font-bold uppercase tracking-wider block p-3 rounded-xl ${location.pathname === link.path ? 'bg-brand-500/20 text-brand-400' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                to="/login"
                onClick={closeMenu}
                className="text-sm font-bold uppercase tracking-wider block p-3 rounded-xl text-white/70 hover:bg-white/5 hover:text-white sm:hidden"
              >
                Log in
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
