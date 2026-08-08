import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Heart, Building2, Phone, KeyRound, ArrowRight } from 'lucide-react';

export default function Login() {
  const [step, setStep] = useState(1); // 1: Role & Credential, 2: OTP
  const [role, setRole] = useState('donator');
  const [credential, setCredential] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login, ngos, users } = useAuth();

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!credential) {
      setError('Please enter your email or phone number.');
      return;
    }

    // Validate user existence
    if (role === 'receiver') {
      const exists = ngos.some(n => n.credential === credential);
      if (!exists) {
        setError('Organization not found. Please register first.');
        return;
      }
    } else {
      const exists = users.some(u => u.credential === credential);
      if (!exists) {
        setError('User not found. Please register first.');
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
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-brand-50 to-white">
      <div className="glass max-w-md w-full rounded-2xl p-8 relative overflow-hidden transition-all duration-300">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-400 to-brand-600"></div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-500">Sign in to your KindLink account</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
            {error}
          </div>
        )}

        {step === 1 ? (
          <div className="animate-fade-in">
            <div className="flex gap-4 mb-8">
              <button
                type="button"
                onClick={() => setRole('donator')}
                className={`flex-1 py-3 px-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all duration-200 ${
                  role === 'donator' 
                    ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-sm' 
                    : 'border-gray-200 hover:border-brand-200 text-gray-500'
                }`}
              >
                <Heart className={role === 'donator' ? 'text-brand-500' : 'text-gray-400'} />
                <span className="font-medium">Donator</span>
              </button>
              
              <button
                type="button"
                onClick={() => setRole('receiver')}
                className={`flex-1 py-3 px-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all duration-200 ${
                  role === 'receiver' 
                    ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-sm' 
                    : 'border-gray-200 hover:border-brand-200 text-gray-500'
                }`}
              >
                <Building2 className={role === 'receiver' ? 'text-brand-500' : 'text-gray-400'} />
                <span className="font-medium">NGO</span>
              </button>
            </div>

            <form onSubmit={handleSendOtp} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number or Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    required
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    className="pl-10 w-full rounded-xl border-gray-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all py-2.5 shadow-sm border"
                    placeholder="+1 234 567 8900"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-medium py-3 rounded-xl transition-colors shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2"
              >
                Send OTP <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        ) : (
          <div className="animate-slide-up">
            <div className="mb-6 text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <KeyRound className="w-8 h-8 text-brand-600" />
              </div>
              <p className="text-gray-600">Enter the 6-digit code sent to<br/><span className="font-medium text-gray-900">{credential}</span></p>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="w-full text-center tracking-[0.5em] text-2xl font-bold rounded-xl border-gray-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all py-4 shadow-sm border"
                  placeholder="------"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-medium py-3 rounded-xl transition-colors shadow-lg shadow-brand-500/30"
              >
                Verify & Login
              </button>
              
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-gray-500 hover:text-gray-700 font-medium py-2 text-sm"
              >
                Back to edit details
              </button>
            </form>
          </div>
        )}

        <div className="mt-8 text-center text-sm text-gray-500">
          New to KindLink?{' '}
          <Link to="/register" className="text-brand-600 hover:text-brand-700 font-medium">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
