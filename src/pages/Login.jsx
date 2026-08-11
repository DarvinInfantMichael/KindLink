import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Heart, Building2, Phone, KeyRound, ArrowRight, ArrowLeft, User, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import ThemeToggle from '../components/ThemeToggle';

export default function Login() {
  const [step, setStep] = useState(1); // 1: Role & Credential, 2: OTP
  const [role, setRole] = useState('donator');
  const [name, setName] = useState('');
  const [credential, setCredential] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login, ngos, users, registerUser } = useAuth();

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!name || !credential) {
      setError('Please enter your name and email or phone number.');
      return;
    }

    // Validate user existence
    if (role === 'receiver') {
      const existingNgo = ngos.find(n => n.credential === credential);
      if (!existingNgo) {
        setError('Organization not found. Please register first.');
        return;
      }
      if (existingNgo.name.toLowerCase().trim() !== name.toLowerCase().trim()) {
        setError('Organization name does not match our records.');
        return;
      }
    } else {
      const existingUser = users.find(u => u.credential === credential);
      if (!existingUser) {
        // Auto-register donator for seamless login
        registerUser({
          id: Date.now().toString(),
          name: name.trim(),
          credential: credential.trim(),
          role: 'donator'
        });
      } else if (existingUser.name.toLowerCase().trim() !== name.toLowerCase().trim()) {
        setError('User name does not match our records.');
        return;
      }
    }

    setError('');
    
    // Simulate sending OTP
    const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(mockOtp);
    setStep(2);
    
    // For prototype purposes, alert the OTP
    alert(`[Simulated] Your KindLink OTP is: ${mockOtp}`);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp !== generatedOtp) {
      setError('Invalid OTP. Please try again.');
      return;
    }
    
    // Success - match existing NGO or user
    let userToLogin;

    if (role === 'receiver') {
      const existingNgo = ngos.find(n => n.credential === credential);
      userToLogin = {
        id: existingNgo.id,
        name: existingNgo.name,
        credential: existingNgo.credential,
        role: 'receiver'
      };
    } else {
      const existingUser = users.find(u => u.credential === credential);
      userToLogin = existingUser;
    }
    
    login(userToLogin);
    navigate('/dashboard');
  };

  return (
    <PageTransition className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-brand-50 to-white dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">
      <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-50">
        <Link to="/" className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-full transition-all shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md hover:scale-105 active:scale-95">
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Home</span>
          <span className="sm:hidden">Back</span>
        </Link>
      </div>
      <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-50">
        <ThemeToggle />
      </div>
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="glass max-w-md w-full rounded-2xl p-8 relative overflow-hidden shadow-2xl dark:shadow-none border border-white/20 dark:border-gray-800"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-400 to-brand-600 dark:from-brand-500 dark:to-brand-700"></div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h1>
          <p className="text-gray-500 dark:text-gray-400">Sign in to your KindLink account</p>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 p-3 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-xl text-sm border border-red-100 dark:border-red-500/20"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex gap-4 mb-8">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => { setRole('donator'); setName(''); }}
                  className={`flex-1 py-3 px-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all duration-200 ${
                    role === 'donator' 
                      ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/20 dark:text-brand-400' 
                      : 'border-gray-200 hover:border-brand-200 text-gray-500 dark:border-gray-700 dark:hover:border-brand-500/50 dark:text-gray-400'
                  }`}
                >
                  <Heart className={role === 'donator' ? 'text-brand-500' : 'text-gray-400'} />
                  <span className="font-medium">Donator</span>
                </motion.button>
                
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => { setRole('receiver'); setName(''); }}
                  className={`flex-1 py-3 px-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all duration-200 ${
                    role === 'receiver' 
                      ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/20 dark:text-brand-400' 
                      : 'border-gray-200 hover:border-brand-200 text-gray-500 dark:border-gray-700 dark:hover:border-brand-500/50 dark:text-gray-400'
                  }`}
                >
                  <Building2 className={role === 'receiver' ? 'text-brand-500' : 'text-gray-400'} />
                  <span className="font-medium">NGO</span>
                </motion.button>
              </div>

              <form onSubmit={handleSendOtp} className="space-y-5">
                <motion.div whileFocus={{ scale: 1.01 }}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {role === 'donator' ? 'Full Name' : 'Organization Name'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {role === 'donator' ? <User className="h-5 w-5 text-gray-400" /> : <Building2 className="h-5 w-5 text-gray-400" />}
                    </div>
                    {role === 'donator' ? (
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10 w-full rounded-xl border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all py-2.5 shadow-sm border outline-none"
                        placeholder="John Doe"
                      />
                    ) : (
                      <>
                        <select
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="pl-10 pr-10 w-full rounded-xl border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all py-2.5 shadow-sm border outline-none appearance-none"
                        >
                          <option value="" disabled>Select Organization</option>
                          {ngos.map((ngo) => (
                            <option key={ngo.id} value={ngo.name}>
                              {ngo.name}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        </div>
                      </>
                    )}
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
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-medium py-3 rounded-xl transition-colors shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2"
                >
                  Send OTP <ArrowRight className="w-5 h-5" />
                </motion.button>
              </form>
            </motion.div>
          ) : (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6 text-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-16 h-16 bg-brand-100 dark:bg-brand-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <KeyRound className="w-8 h-8 text-brand-600 dark:text-brand-400" />
                </motion.div>
                <p className="text-gray-600 dark:text-gray-400">Enter the 6-digit code sent to<br/><span className="font-medium text-gray-900 dark:text-white">{credential}</span></p>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-5">
                <motion.div whileFocus={{ scale: 1.01 }}>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="w-full text-center tracking-[0.5em] text-2xl font-bold rounded-xl border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all py-4 shadow-sm border outline-none"
                    placeholder="------"
                  />
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-medium py-3 rounded-xl transition-colors shadow-lg shadow-brand-500/30"
                >
                  Verify & Login
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium py-2 text-sm"
                >
                  Back to edit details
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          New to KindLink?{' '}
          <Link to="/register" className="text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 font-medium">
            Create an account
          </Link>
        </div>
      </motion.div>
    </PageTransition>
  );
}
