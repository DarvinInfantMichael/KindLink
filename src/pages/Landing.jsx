import React from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, Building2, CalendarCheck, ArrowRight, ShieldCheck, Clock, Star, TrendingUp, Smartphone, FileText, Award, ChevronRight } from 'lucide-react';

export default function Landing() {
  const verifiedNgos = [
    { name: "Food Rescue Foundation", category: "Food", rating: 5, reviews: 124, impact: "10,000+ meals served" },
    { name: "Books for All", category: "Education", rating: 5, reviews: 89, impact: "5,000+ books donated" },
    { name: "Hope Furniture Bank", category: "Shelter", rating: 4.8, reviews: 210, impact: "2,000+ homes furnished" },
    { name: "Warm Clothing Drive", category: "Clothing", rating: 4.9, reviews: 156, impact: "15,000+ clothes distributed" },
  ];

  const roadmap = [
    { title: "Live GPS Tracking", desc: "Track your donation pickups in real-time.", icon: <HeartHandshake className="w-6 h-6 text-brand-500" />, status: "Coming Soon" },
    { title: "Mobile App Launch", desc: "Native iOS and Android apps for easier giving.", icon: <Smartphone className="w-6 h-6 text-brand-500" />, status: "Q3 2026" },
    { title: "Automated Tax Receipts", desc: "Instant tax deductions generated after donations.", icon: <FileText className="w-6 h-6 text-brand-500" />, status: "Q4 2026" },
    { title: "Community Leaderboards", desc: "Gamified donation tracking with badges.", icon: <TrendingUp className="w-6 h-6 text-brand-500" />, status: "2027" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans selection:bg-brand-100 selection:text-brand-900">
      {/* Navbar */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-brand-500 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
              <HeartHandshake className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black text-gray-900 tracking-tight">KindLink</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/login" className="text-sm font-semibold text-gray-600 hover:text-brand-600 transition-colors">Log in</Link>
            <Link to="/register" className="text-sm font-bold bg-gray-900 text-white hover:bg-brand-600 px-6 py-2.5 rounded-full shadow-lg hover:shadow-brand-500/30 transition-all hover:-translate-y-0.5">Sign up</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-20 pb-32 lg:pt-32 lg:pb-40">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3">
          <div className="w-[800px] h-[800px] bg-gradient-to-br from-brand-100/40 to-brand-50 rounded-full blur-3xl opacity-70"></div>
        </div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3">
          <div className="w-[600px] h-[600px] bg-gradient-to-tr from-brand-100/40 to-transparent rounded-full blur-3xl opacity-70"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-brand-100 shadow-sm text-brand-700 text-sm font-bold mb-8 animate-fade-in hover:shadow-md transition-shadow cursor-default">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-500"></span>
              </span>
              The future of giving is here
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8 animate-slide-up leading-tight">
              Connect Kindness to <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-500 to-teal-400 relative">
                Real Needs
                <svg className="absolute w-full h-4 -bottom-1 left-0 text-brand-200/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
                </svg>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 mb-12 animate-slide-up leading-relaxed" style={{ animationDelay: '0.1s' }}>
              KindLink bridges the gap between generous individuals and verified organizations. Transform your surplus into someone else's survival.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link 
                to="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 px-10 rounded-full transition-all shadow-xl shadow-brand-500/30 hover:scale-105 active:scale-95 text-lg group"
              >
                Explore App <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#how-it-works" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-gray-700 font-bold py-4 px-10 rounded-full transition-all border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 text-lg">
                See How It Works
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Trust Bar */}
      <section className="border-y border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
            <div>
              <p className="text-4xl font-black text-gray-900 mb-1">50+</p>
              <p className="text-sm font-medium text-gray-500">Verified NGOs</p>
            </div>
            <div>
              <p className="text-4xl font-black text-gray-900 mb-1">10k+</p>
              <p className="text-sm font-medium text-gray-500">Active Donators</p>
            </div>
            <div>
              <p className="text-4xl font-black text-brand-600 mb-1">32k</p>
              <p className="text-sm font-medium text-gray-500">Items Donated</p>
            </div>
            <div>
              <p className="text-4xl font-black text-gray-900 mb-1">100%</p>
              <p className="text-sm font-medium text-gray-500">Transparent</p>
            </div>
          </div>
        </div>
      </section>

      {/* Verified NGOs Section */}
      <section className="py-24 bg-gray-50" id="ngos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Highly Rated NGOs</h2>
              <p className="text-xl text-gray-500">Partnering only with verified organizations to ensure your donations make the maximum impact.</p>
            </div>
            <Link to="/register" className="inline-flex items-center gap-2 font-bold text-brand-600 hover:text-brand-700 transition-colors group">
              Register as an NGO <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {verifiedNgos.map((ngo, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-gray-100 hover:shadow-2xl hover:shadow-brand-500/5 transition-all duration-300 hover:-translate-y-2 group cursor-default relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Award className="w-8 h-8 text-brand-100" />
                </div>
                <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center mb-6 text-brand-600">
                  <Building2 className="w-7 h-7" />
                </div>
                <div className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-lg mb-4">
                  {ngo.category}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{ngo.name}</h3>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(ngo.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                  ))}
                  <span className="text-sm font-bold text-gray-900 ml-1">{ngo.rating}</span>
                  <span className="text-sm text-gray-400">({ngo.reviews})</span>
                </div>
                <div className="pt-4 border-t border-gray-50">
                  <p className="text-sm font-medium text-brand-600">{ngo.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 bg-white" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6">A Professional Process</h2>
            <p className="text-xl text-gray-500">From scheduling to verification, KindLink provides a seamless experience for both Donators and NGOs.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting lines for desktop */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-brand-100 via-brand-200 to-brand-100 z-0"></div>

            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-white rounded-3xl shadow-xl shadow-brand-500/10 border border-brand-50 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <CalendarCheck className="w-10 h-10 text-brand-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Schedule</h3>
              <p className="text-gray-500 leading-relaxed">Select a trusted NGO, choose your items, and easily pick a date, time, and location using our interactive map.</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-white rounded-3xl shadow-xl shadow-brand-500/10 border border-brand-50 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                <Clock className="w-10 h-10 text-brand-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Real-time Status</h3>
              <p className="text-gray-500 leading-relaxed">Your donation immediately appears on the NGO's incoming dashboard with all necessary contact details.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-white rounded-3xl shadow-xl shadow-brand-500/10 border border-brand-50 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <ShieldCheck className="w-10 h-10 text-brand-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Verification</h3>
              <p className="text-gray-500 leading-relaxed">Upon receipt, the NGO clicks "Verify" which instantly updates your status to "Verified" across the platform.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap / Future Enhancements */}
      <section className="py-24 bg-gray-900 relative overflow-hidden" id="roadmap">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/20 blur-[100px] rounded-full"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-16">
            <h2 className="text-4xl font-extrabold text-white mb-4">Future Enhancements</h2>
            <p className="text-xl text-gray-400 max-w-2xl">We are constantly evolving to make giving even more powerful.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roadmap.map((item, idx) => (
              <div key={idx} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 hover:bg-gray-800 transition-colors">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center border border-gray-700">
                    {item.icon}
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${item.status === 'Coming Soon' ? 'bg-brand-500/20 text-brand-400 border border-brand-500/30' : 'bg-gray-700 text-gray-300'}`}>
                    {item.status}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 bg-brand-600 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-700 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">Ready to make a real impact?</h2>
          <p className="text-brand-100 mb-12 max-w-2xl mx-auto text-xl">
            Join thousands of generous individuals and dedicated organizations working together to reduce waste and fight poverty.
          </p>
          <Link 
            to="/dashboard"
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-brand-700 font-black py-5 px-12 rounded-full transition-all shadow-2xl hover:scale-105 active:scale-95 text-xl"
          >
            Start Donating Now <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  );
}
