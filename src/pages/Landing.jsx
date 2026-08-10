import React from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, Building2, CalendarCheck, ArrowRight, ShieldCheck, Clock, Star, TrendingUp, Smartphone, FileText, Award, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import ThemeToggle from '../components/ThemeToggle';

export default function Landing() {
  const verifiedNgos = [
    { name: "Food Rescue Foundation", category: "Food", rating: 5, reviews: 124, impact: "10,000+ meals served", image: "/images/ngo1.png" },
    { name: "Books for All", category: "Education", rating: 5, reviews: 89, impact: "5,000+ books donated", image: "/images/ngo2.png" },
    { name: "Hope Furniture Bank", category: "Shelter", rating: 4.8, reviews: 210, impact: "2,000+ homes furnished", image: "/images/ngo3.png" },
    { name: "Warm Clothing Drive", category: "Clothing", rating: 4.9, reviews: 156, impact: "15,000+ clothes distributed", image: "/images/ngo4.png" },
  ];

  const roadmap = [
    { title: "Live GPS Tracking", desc: "Track your donation pickups in real-time.", icon: <HeartHandshake className="w-6 h-6 text-brand-500" />, status: "Coming Soon" },
    { title: "Mobile App Launch", desc: "Native iOS and Android apps for easier giving.", icon: <Smartphone className="w-6 h-6 text-brand-500" />, status: "Q3 2026" },
    { title: "Automated Tax Receipts", desc: "Instant tax deductions generated after donations.", icon: <FileText className="w-6 h-6 text-brand-500" />, status: "Q4 2026" },
    { title: "Community Leaderboards", desc: "Gamified donation tracking with badges.", icon: <TrendingUp className="w-6 h-6 text-brand-500" />, status: "2027" },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <PageTransition className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col font-sans selection:bg-brand-100 selection:text-brand-900 dark:selection:bg-brand-500/30 dark:selection:text-brand-100 transition-colors duration-300">
      {/* Navbar */}
      <header className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group cursor-pointer">
            <motion.div 
              whileHover={{ rotate: 12, scale: 1.1 }}
              className="bg-brand-500 p-2 rounded-xl transition-transform duration-300"
            >
              <HeartHandshake className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">KindLink</span>
          </Link>
          <div className="flex items-center gap-4 sm:gap-6">
            <ThemeToggle />
            <Link to="/login" className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Log in</Link>
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
              <Link to="/register" className="text-sm font-bold bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-brand-600 dark:hover:bg-brand-500 dark:hover:text-white px-6 py-2.5 rounded-full shadow-lg hover:shadow-brand-500/30 transition-all">Sign up</Link>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-gray-950 pt-20 pb-32 lg:pt-32 lg:pb-40 transition-colors">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3">
          <motion.div 
            animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="w-[800px] h-[800px] bg-gradient-to-br from-brand-100/40 dark:from-brand-500/10 to-brand-50 dark:to-transparent rounded-full blur-3xl opacity-70"
          />
        </div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3">
          <motion.div 
            animate={{ scale: [1, 1.05, 1], rotate: [0, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="w-[600px] h-[600px] bg-gradient-to-tr from-brand-100/40 dark:from-brand-500/10 to-transparent rounded-full blur-3xl opacity-70"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-900 border border-brand-100 dark:border-gray-800 shadow-sm text-brand-700 dark:text-brand-400 text-sm font-bold mb-8 hover:shadow-md transition-shadow cursor-default">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-500"></span>
              </span>
              The future of giving is here
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-8 leading-tight">
              Connect Kindness to <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-500 to-teal-400 dark:from-brand-400 dark:via-brand-500 dark:to-teal-300 relative">
                Real Needs
                <svg className="absolute w-full h-4 -bottom-1 left-0 text-brand-200/50 dark:text-brand-500/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
                </svg>
              </span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 mb-12 leading-relaxed">
              KindLink bridges the gap between generous individuals and verified organizations. Transform your surplus into someone else's survival.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Link 
                  to="/dashboard"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 px-10 rounded-full transition-all shadow-xl shadow-brand-500/30 text-lg group"
                >
                  Explore App <motion.div whileHover={{ x: 5 }}><ArrowRight className="w-6 h-6" /></motion.div>
                </Link>
              </motion.div>
              <motion.a 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                href="#how-it-works" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 font-bold py-4 px-10 rounded-full transition-all border-2 border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-lg"
              >
                See How It Works
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats/Trust Bar */}
      <section className="border-y border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 overflow-hidden transition-colors">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100 dark:divide-gray-800">
            <div>
              <p className="text-4xl font-black text-gray-900 dark:text-white mb-1">50+</p>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Verified NGOs</p>
            </div>
            <div>
              <p className="text-4xl font-black text-gray-900 dark:text-white mb-1">10k+</p>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Donators</p>
            </div>
            <div>
              <p className="text-4xl font-black text-brand-600 dark:text-brand-500 mb-1">32k</p>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Items Donated</p>
            </div>
            <div>
              <p className="text-4xl font-black text-gray-900 dark:text-white mb-1">100%</p>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Transparent</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Verified NGOs Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900 transition-colors" id="ngos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeInUp}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          >
            <div className="max-w-2xl">
              <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Highly Rated NGOs</h2>
              <p className="text-xl text-gray-500 dark:text-gray-400">Partnering only with verified organizations to ensure your donations make the maximum impact.</p>
            </div>
            <Link to="/register" className="inline-flex items-center gap-2 font-bold text-brand-600 dark:text-brand-500 hover:text-brand-700 dark:hover:text-brand-400 transition-colors group">
              Register as an NGO <motion.div whileHover={{ x: 5 }}><ChevronRight className="w-5 h-5" /></motion.div>
            </Link>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {verifiedNgos.map((ngo, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeInUp}
                whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(34, 197, 94, 0.1)" }}
                className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 transition-all duration-300 group cursor-default relative overflow-hidden shadow-sm dark:shadow-none flex flex-col"
              >
                <div className="h-40 w-full overflow-hidden relative">
                  <img src={ngo.image} alt={ngo.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Award className="w-6 h-6 text-yellow-400 drop-shadow-md" />
                  </div>
                  <div className="absolute bottom-3 left-4">
                    <span className="px-2.5 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md text-brand-600 dark:text-brand-400 text-xs font-bold rounded-lg shadow-sm">
                      {ngo.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">{ngo.name}</h3>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(ngo.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
                    ))}
                    <span className="text-sm font-bold text-gray-900 dark:text-white ml-1">{ngo.rating}</span>
                    <span className="text-sm text-gray-400">({ngo.reviews})</span>
                  </div>
                  <div className="pt-4 mt-auto border-t border-gray-50 dark:border-gray-700">
                    <p className="text-sm font-medium text-brand-600 dark:text-brand-400">{ngo.impact}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 bg-white dark:bg-gray-950 overflow-hidden transition-colors" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">A Professional Process</h2>
            <p className="text-xl text-gray-500 dark:text-gray-400">From scheduling to verification, KindLink provides a seamless experience for both Donators and NGOs.</p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 relative"
          >
            {/* Connecting lines for desktop */}
            <div className="hidden md:block absolute top-12 left-[16.666%] right-[16.666%] h-0.5 bg-gradient-to-r from-brand-100 dark:from-gray-800 via-brand-200 dark:via-brand-900 to-brand-100 dark:to-gray-800 z-0"></div>

            {[
              { icon: <CalendarCheck className="w-10 h-10 text-brand-500" />, title: "1. Schedule", desc: "Select a trusted NGO, choose your items, and easily pick a date, time, and location using our interactive map." },
              { icon: <Clock className="w-10 h-10 text-brand-500" />, title: "2. Real-time Status", desc: "Your donation immediately appears on the NGO's incoming dashboard with all necessary contact details." },
              { icon: <ShieldCheck className="w-10 h-10 text-brand-500" />, title: "3. Verification", desc: "Upon receipt, the NGO clicks 'Verify' which instantly updates your status to 'Verified' across the platform." }
            ].map((step, i) => (
              <motion.div key={i} variants={fadeInUp} className="relative z-10 flex flex-col items-center text-center group">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: i % 2 === 0 ? 5 : -5 }}
                  className="w-24 h-24 bg-white dark:bg-gray-900 rounded-3xl shadow-xl shadow-brand-500/10 dark:shadow-none border border-brand-50 dark:border-gray-800 flex items-center justify-center mb-8 transition-transform duration-300"
                >
                  {step.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{step.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Roadmap / Future Enhancements */}
      <section className="py-24 bg-gray-50 dark:bg-black relative overflow-hidden transition-colors" id="roadmap">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/30 blur-[100px] rounded-full"
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Future Enhancements</h2>
            <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl">We are constantly evolving to make giving even more powerful.</p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {roadmap.map((item, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 rounded-3xl p-8 hover:shadow-lg dark:hover:bg-gray-800 transition-all"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-brand-50 dark:bg-gray-900 rounded-2xl flex items-center justify-center border border-brand-100 dark:border-gray-700">
                    {item.icon}
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${item.status === 'Coming Soon' ? 'bg-brand-500/20 text-brand-700 dark:text-brand-400 border border-brand-500/30' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
                    {item.status}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 bg-brand-600 dark:bg-brand-700 text-center relative overflow-hidden transition-colors">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-700 dark:from-brand-900 to-transparent"></div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-4 relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">Ready to make a real impact?</h2>
          <p className="text-brand-100 mb-12 max-w-2xl mx-auto text-xl">
            Join thousands of generous individuals and dedicated organizations working together to reduce waste and fight poverty.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
            <Link 
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-black py-5 px-12 rounded-full transition-all shadow-2xl text-xl group"
            >
              Start Donating Now <motion.div whileHover={{ x: 5 }}><ArrowRight className="w-6 h-6" /></motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </PageTransition>
  );
}
