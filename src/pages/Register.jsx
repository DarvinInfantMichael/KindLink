import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Heart, Building2, User, Phone, Mail } from 'lucide-react';

export default function Register() {
  const [role, setRole] = useState('donator'); // 'donator' | 'receiver'
  const [name, setName] = useState('');
  const [credential, setCredential] = useState('');
  const navigate = useNavigate();
  const { login, registerNgo, registerUser, ngos, users } = useAuth();

  const handleRegister = (e) => {
    e.preventDefault();

    // Check if user/NGO already exists with this credential
    if (role === 'receiver') {
      if (ngos.some(n => n.credential === credential)) {
        alert('An organization with this credential already exists. Please login instead.');
        return;
      }
    } else {
      if (users.some(u => u.credential === credential)) {
        alert('A user with this credential already exists. Please login instead.');
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-brand-50 to-white">
      <div className="glass max-w-md w-full rounded-2xl p-8 animate-fade-in relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-400 to-brand-600"></div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join KindLink</h1>
          <p className="text-gray-500">Links kindness to real needs</p>
        </div>

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
            <span className="font-medium">I want to Donate</span>
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
            <span className="font-medium">I am an NGO</span>
          </button>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
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
                className="pl-10 w-full rounded-xl border-gray-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all py-2.5 shadow-sm border"
                placeholder={role === 'donator' ? 'John Doe' : 'Hope Foundation'}
              />
            </div>
          </div>

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
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-medium py-3 rounded-xl transition-colors shadow-lg shadow-brand-500/30"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-600 hover:text-brand-700 font-medium">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}
