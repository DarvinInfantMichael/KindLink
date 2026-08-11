import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Heart, Building2, User, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import ThemeToggle from '../components/ThemeToggle';

export default function Register() {
  const [role, setRole] = useState('donator'); // 'donator' | 'receiver'
  const [name, setName] = useState('');
  const [credential, setCredential] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, registerNgo, registerUser, ngos, users } = useAuth();

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    // Check if user/NGO already exists with this credential
    if (role === 'receiver') {
      if (ngos.some(n => n.credential === credential)) {
        setError('An organization with this credential already exists. Please login instead.');
        return;
      }
    } else {
      if (users.some(u => u.credential === credential)) {
        setError('A user with this credential already exists. Please login instead.');
        return;
      }
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      credential,
      role
    };
    
    // If registering as a receiver/NGO, add them to the global NGOs list
    if (role === 'receiver') {
      registerNgo({
        id: newUser.id,
        name: newUser.name,
        category: 'General',
        credential: newUser.credential
      });
    } else {
      registerUser(newUser);
    }

    // Auto-login after registration
    login(newUser);
    navigate('/dashboard');
  };

  return (
    <PageTransition className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-brand-50 to-white dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="glass max-w-md w-full rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl dark:shadow-none border border-white/20 dark:border-gray-800"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-400 to-brand-600 dark:from-brand-500 dark:to-brand-700"></div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Join KindLink</h1>
          <p className="text-gray-500 dark:text-gray-400">Links kindness to real needs</p>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-3 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-xl text-sm border border-red-100 dark:border-red-500/20"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-4 mb-8">
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => setRole('donator')}
            className={`flex-1 py-3 px-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all duration-200 ${
              role === 'donator' 
                ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/20 dark:text-brand-400' 
                : 'border-gray-200 hover:border-brand-200 text-gray-500 dark:border-gray-700 dark:hover:border-brand-500/50 dark:text-gray-400'
            }`}
          >
            <Heart className={role === 'donator' ? 'text-brand-500' : 'text-gray-400'} />
            <span className="font-medium">I want to Donate</span>
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => setRole('receiver')}
            className={`flex-1 py-3 px-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all duration-200 ${
              role === 'receiver' 
                ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/20 dark:text-brand-400' 
                : 'border-gray-200 hover:border-brand-200 text-gray-500 dark:border-gray-700 dark:hover:border-brand-500/50 dark:text-gray-400'
            }`}
          >
            <Building2 className={role === 'receiver' ? 'text-brand-500' : 'text-gray-400'} />
            <span className="font-medium">I am an NGO</span>
          </motion.button>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <motion.div whileFocus={{ scale: 1.01 }}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {role === 'donator' ? 'Full Name' : 'Organization Name'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {role === 'donator' ? <User className="h-5 w-5 text-gray-400" /> : <Building2 className="h-5 w-5 text-gray-400" />}
              </div>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10 w-full rounded-xl border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all py-2.5 shadow-sm border outline-none"
                placeholder={role === 'donator' ? 'John Doe' : 'Hope Foundation'}
              />
            </div>
          </motion.div>

          <motion.div whileFocus={{ scale: 1.01 }}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number or Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                required
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                className="pl-10 w-full rounded-xl border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all py-2.5 shadow-sm border outline-none"
                placeholder="+1 234 567 8900"
              />
            </div>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-medium py-3 rounded-xl transition-colors shadow-lg shadow-brand-500/30"
          >
            Create Account
          </motion.button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 font-medium">
            Login here
          </Link>
        </div>
      </motion.div>
    </PageTransition>
  );
}
