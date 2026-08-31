import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Globe, Users, HandHeart, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function InteractiveHelpingSection() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calculate parallax offsets
  const xOffset = (mousePosition.x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0)) * 0.05;
  const yOffset = (mousePosition.y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0)) * 0.05;

  const pledgeCards = [
    {
      id: 'volunteer',
      title: 'Volunteer Time',
      desc: 'Offer your skills and time to local NGOs making a real difference.',
      icon: <Users className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-400',
      shadow: 'shadow-blue-500/50',
      stats: '5k+ Volunteers'
    },
    {
      id: 'donate',
      title: 'Donate Goods',
      desc: 'Give a second life to your unused clothes, furniture, and food.',
      icon: <HandHeart className="w-8 h-8" />,
      color: 'from-brand-500 to-teal-400',
      shadow: 'shadow-brand-500/50',
      stats: '32k+ Items'
    },
    {
      id: 'partner',
      title: 'Partner NGO',
      desc: 'Register your organization to receive targeted, verified donations.',
      icon: <Globe className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-400',
      shadow: 'shadow-purple-500/50',
      stats: '50+ Partners'
    }
  ];

  // Floating particles
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }));

  return (
    <section className="min-h-screen flex flex-col justify-center py-20 relative overflow-hidden bg-transparent transition-colors" id="join-movement">

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Text & CTA */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block relative z-20 mb-8">
              <Link to="/register" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-sm font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:bg-white/20 transition-all cursor-pointer">
                <Sparkles className="w-4 h-4 text-brand-400 animate-pulse" />
                Join The Global Movement
              </Link>
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6 leading-tight drop-shadow-2xl">
              Small acts, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-teal-300 to-brand-500 relative">
                massive impact.
                <motion.span 
                  className="absolute -inset-1 bg-brand-500/20 blur-xl -z-10 rounded-full"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Every item donated and every hour volunteered creates a ripple effect of kindness. Choose your path to help build a sustainable and supportive community.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
              <Link to="/register" className="w-full sm:w-auto">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto relative group overflow-hidden rounded-full bg-white text-gray-900 font-black py-4 px-10 text-lg flex items-center justify-center gap-3 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.4)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.7)]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Make a Pledge <Heart className="w-5 h-5 text-red-500 fill-red-500 group-hover:scale-125 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-brand-100 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </motion.button>
              </Link>
              
              <div className="flex items-center gap-3 text-brand-300 font-bold bg-brand-900/40 px-5 py-3 rounded-full border border-brand-500/30 backdrop-blur-sm">
                <ShieldCheck className="w-5 h-5" />
                <span>100% Secure & Verified</span>
              </div>
            </div>
          </motion.div>

          {/* Right Interactive Cards */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
            className="flex-1 w-full max-w-lg lg:max-w-none"
          >
            <div className="grid grid-cols-1 gap-5 perspective-[1000px]">
              {pledgeCards.map((card, idx) => (
                <Link to="/register" key={card.id} className="block">
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 30, rotateX: 20 },
                      visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
                    }}
                    onHoverStart={() => setHoveredCard(card.id)}
                    onHoverEnd={() => setHoveredCard(null)}
                    className={`relative p-[2px] rounded-3xl overflow-visible cursor-pointer transition-all duration-500 
                      ${hoveredCard === card.id ? 'scale-105 z-20' : 'scale-100 z-0'} 
                      ${hoveredCard && hoveredCard !== card.id ? 'opacity-40 blur-[3px] scale-95' : 'opacity-100'}`}
                  >
                  {/* Glowing Shadow Background */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${card.color} rounded-3xl blur-xl opacity-0 transition-opacity duration-300 ${hoveredCard === card.id ? 'opacity-70' : ''}`} />
                  
                  {/* Animated Border Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${card.color} opacity-30 rounded-3xl`} />
                  <AnimatePresence>
                    {hoveredCard === card.id && (
                      <motion.div 
                        initial={{ opacity: 0, rotate: 0 }}
                        animate={{ opacity: 1, rotate: 360 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className={`absolute inset-[-50%] bg-gradient-to-r ${card.color} opacity-60 blur-md`}
                      />
                    )}
                  </AnimatePresence>
                  
                  {/* Card Content */}
                  <div className="relative bg-gray-900/80 dark:bg-black/80 backdrop-blur-2xl h-full w-full rounded-[22px] p-6 flex items-center gap-6 border border-white/10 overflow-hidden group">
                    {/* Inner Shine Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full" />
                    
                    <div className={`w-16 h-16 rounded-2xl flex flex-shrink-0 items-center justify-center bg-gradient-to-br ${card.color} text-white shadow-lg ${card.shadow} transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                      {card.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all">{card.title}</h3>
                        <span className="text-xs font-bold px-2 py-1 bg-white/10 text-white rounded-full shadow-inner border border-white/5">
                          {card.stats}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 leading-relaxed">{card.desc}</p>
                    </div>
                    <motion.div 
                      animate={{ x: hoveredCard === card.id ? 8 : 0 }}
                      className="w-10 h-10 rounded-full bg-white/5 flex flex-shrink-0 items-center justify-center border border-white/10 shadow-lg group-hover:bg-white/20 transition-colors"
                    >
                      <ArrowRight className="w-5 h-5 text-white" />
                    </motion.div>
                  </div>
                </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
