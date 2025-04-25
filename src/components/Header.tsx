
import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <header className="fixed w-full z-50 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="header-wrapper__logo"
        >
          <img src="/assets/logo.png" alt="DreamFrame" />
        </motion.div>
        
        <nav className="header-wrapper__menu">
          <ul className="flex items-center space-x-8">
            <motion.li
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <button className="btn-large bg-white text-black hover:bg-white/90 transition-colors">
                <span>Get Started</span>
              </button>
            </motion.li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
