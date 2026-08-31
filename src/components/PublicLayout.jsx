import React from 'react';
import Navbar from './Navbar';
import DynamicBackground from './DynamicBackground';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

export default function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen text-white relative">
      <DynamicBackground />
      <Navbar />
      
      {/* Floating Side Register Button */}
      <motion.div 
        className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center"
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
      >
        <Link to="/register">
          <motion.div 
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="bg-brand-500 hover:bg-brand-400 text-white font-black uppercase tracking-[0.2em] py-6 px-3 rounded-l-2xl shadow-[-10px_0_30px_rgba(16,185,129,0.3)] hover:shadow-[-10px_0_40px_rgba(16,185,129,0.6)] border border-brand-300 border-r-0 flex flex-col items-center gap-4 cursor-pointer group transition-all"
          >
            <UserPlus className="w-5 h-5 group-hover:scale-125 transition-transform" />
            <span style={{ writingMode: 'vertical-rl' }} className="rotate-180 text-sm">
              Register
            </span>
          </motion.div>
        </Link>
      </motion.div>

      <main className="flex-grow relative z-10">
        {children}
      </main>
      <footer className="bg-transparent text-white/50 py-8 text-center text-sm relative z-10">
        <p>&copy; 2026 KindLink • All Rights Reserved</p>
      </footer>
    </div>
  );
}
