import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Award, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import InteractiveHelpingSection from '../components/InteractiveHelpingSection';

export default function Landing() {
  const [hoveredNgo, setHoveredNgo] = useState(null);

  const verifiedNgos = [
    { name: "Food Rescue Foundation", role: "Food & Meals", image: "/images/ngo1.jpg" },
    { name: "Books for All", role: "Education", image: "/images/ngo2.jpg" },
    { name: "Hope Furniture Bank", role: "Shelter", image: "/images/ngo3.jpg" },
    { name: "Warm Clothing Drive", role: "Clothing", image: "/images/ngo4.jpg" },
    { name: "Green Earth Initiative", role: "Environment", image: "/images/ngo5.jpg" },
    { name: "Tech for Good", role: "Digital Access", image: "/images/ngo6.jpg" },
    { name: "Elderly Care Org", role: "Senior Support", image: "/images/ngo7.jpg" },
    { name: "Stray Animal Rescue", role: "Animal Welfare", image: "/images/ngo8.jpg" },
  ];

  return (
    <PageTransition className="flex flex-col font-sans selection:bg-brand-900 selection:text-white transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center pt-20 pb-20 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative overflow-hidden bg-black/40 backdrop-blur-sm">
        <div className="absolute top-0 right-0 p-10 opacity-10">
          <Heart className="w-96 h-96 text-brand-400" />
        </div>
        <div className="max-w-7xl mx-auto w-full relative z-10 text-center lg:text-left">
          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-none uppercase drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white hover:from-brand-300 hover:via-teal-300 hover:to-brand-300 bg-[length:200%_auto] bg-[position:left_center] hover:bg-[position:right_center] transition-all duration-1000 ease-out cursor-default">
            Connect Kindness <br className="hidden lg:block"/>To Real Needs
          </h1>
          <p className="text-xl md:text-3xl text-white/80 font-bold max-w-3xl leading-relaxed mb-10 drop-shadow-md hover:text-white transition-colors duration-500 cursor-default">
            KindLink bridges the gap between generous individuals and verified organizations. Transform your surplus into someone else's survival.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block mt-4 relative z-20">
            <Link 
              to="/register"
              className="inline-block bg-gradient-to-r from-brand-500 to-teal-400 text-white font-black uppercase tracking-widest py-5 px-12 rounded-full hover:from-brand-400 hover:to-teal-300 transition-all shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:shadow-[0_0_50px_rgba(16,185,129,0.8)] text-lg border border-brand-300"
            >
              Join The Movement
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section (Red Fill) */}
      <section className="min-h-screen flex flex-col justify-center bg-red-950/40 backdrop-blur-md py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto w-full text-center">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-16 leading-tight drop-shadow-lg text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white hover:from-red-400 hover:via-pink-400 hover:to-orange-400 bg-[length:200%_auto] bg-[position:left_center] hover:bg-[position:right_center] transition-all duration-1000 ease-out cursor-default">
            Our KindLink Community has now grown to 10,000+ Members Strong Across the Country
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col gap-2 group cursor-default">
              <h3 className="text-5xl md:text-7xl font-black drop-shadow-[0_0_15px_rgba(16,185,129,0.5)] text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-teal-500 group-hover:from-yellow-300 group-hover:to-orange-400 transition-all duration-700">50+</h3>
              <p className="text-xl font-bold text-white uppercase tracking-wider group-hover:text-yellow-300 transition-colors duration-700">Verified NGOs</p>
            </div>
            <div className="flex flex-col gap-2 group cursor-default">
              <h3 className="text-5xl md:text-7xl font-black drop-shadow-[0_0_15px_rgba(16,185,129,0.5)] text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-teal-500 group-hover:from-blue-300 group-hover:to-cyan-400 transition-all duration-700">32k</h3>
              <p className="text-xl font-bold text-white uppercase tracking-wider group-hover:text-cyan-300 transition-colors duration-700">Items Donated</p>
            </div>
            <div className="flex flex-col gap-2 group cursor-default">
              <h3 className="text-5xl md:text-7xl font-black drop-shadow-[0_0_15px_rgba(16,185,129,0.5)] text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-teal-500 group-hover:from-purple-300 group-hover:to-pink-400 transition-all duration-700">10k+</h3>
              <p className="text-xl font-bold text-white uppercase tracking-wider group-hover:text-pink-300 transition-colors duration-700">Active Donators</p>
            </div>
            <div className="flex flex-col gap-2 group cursor-default">
              <h3 className="text-5xl md:text-7xl font-black drop-shadow-[0_0_15px_rgba(16,185,129,0.5)] text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-teal-500 group-hover:from-green-300 group-hover:to-emerald-400 transition-all duration-700">100%</h3>
              <p className="text-xl font-bold text-white uppercase tracking-wider group-hover:text-green-300 transition-colors duration-700">Transparent</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nutshell Section (White Fill) */}
      <section className="min-h-screen flex flex-col justify-center bg-white/5 backdrop-blur-lg py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10 text-white">
        <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1">
            <h6 className="font-black uppercase tracking-widest mb-4 drop-shadow-md text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-teal-300 to-brand-400 bg-[length:200%_auto] bg-[position:left_center] hover:bg-[position:right_center] transition-all duration-1000 ease-out cursor-default">KindLink in a nutshell</h6>
            <p className="text-2xl md:text-3xl font-medium leading-relaxed mb-10 text-white/90 hover:text-white transition-colors duration-500 cursor-default">
              KindLink is a platform designed to end wasteful surplus by connecting it directly to those in need. 
              <br/><br/>
              Through our interactive dashboard, we deliver a seamless intervention for vulnerable communities. The community-powered model relies on mobilizing passionate individuals to ensure scalable donating that helps communities break the cycle of poverty permanently.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block relative z-20">
              <Link 
                to="/future-plans"
                className="inline-block bg-white/10 text-white font-black uppercase tracking-widest py-4 px-10 rounded-full hover:bg-white/20 transition-all border border-white/30 backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                Our Future Plans
              </Link>
            </motion.div>
          </div>
          <div className="flex-1 w-full h-[500px] bg-black/50 rounded-3xl overflow-hidden border border-white/20 relative shadow-2xl backdrop-blur-sm group">
            <img src="/images/helping_nutshell.jpg" alt="Volunteers handing out donations" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-brand-500/10 group-hover:bg-brand-500/0 transition-colors duration-500"></div>
          </div>
        </div>
      </section>

      {/* Quote Section (Beige/Yellow Fill) */}
      <section className="min-h-screen flex flex-col justify-center bg-brand-950/30 backdrop-blur-md py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-5xl mx-auto w-full text-center">
          <div className="text-6xl text-brand-500 mb-8 opacity-50 drop-shadow-lg">"</div>
          <h2 className="text-3xl md:text-5xl font-black leading-tight drop-shadow-md text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white hover:from-yellow-200 hover:via-brand-200 hover:to-brand-400 bg-[length:200%_auto] bg-[position:left_center] hover:bg-[position:right_center] transition-all duration-1000 ease-out cursor-default">
            We imagine a future where no resource goes to waste simply because the right connection wasn't made. A future where every community has a strong support network they need to thrive.
          </h2>
          <div className="mt-12 text-xl font-bold text-brand-300 uppercase tracking-widest drop-shadow-sm">
            - The KindLink Team
          </div>
        </div>
      </section>

      {/* Verified NGOs (Grid styled like the dark theme) */}
      <section className="min-h-screen flex flex-col justify-center bg-black/40 py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10 text-white relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-16 text-center drop-shadow-2xl uppercase">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-teal-300 to-brand-400 hover:from-purple-400 hover:via-pink-400 hover:to-purple-400 bg-[length:200%_auto] bg-[position:left_center] hover:bg-[position:right_center] transition-all duration-1000 ease-out cursor-default">NGO Partners</span>
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 perspective-[1000px]">
            {verifiedNgos.map((ngo, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 30, rotateX: 20 },
                  visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                onHoverStart={() => setHoveredNgo(idx)}
                onHoverEnd={() => setHoveredNgo(null)}
                className={`relative p-[2px] rounded-3xl overflow-visible cursor-pointer transition-all duration-500 
                  ${hoveredNgo === idx ? 'scale-105 z-20' : 'scale-100 z-0'} 
                  ${hoveredNgo !== null && hoveredNgo !== idx ? 'opacity-40 blur-[3px] scale-95' : 'opacity-100'}`}
              >
                {/* Glowing Shadow Background */}
                <div className={`absolute inset-0 bg-gradient-to-r from-brand-500 to-teal-400 rounded-3xl blur-xl opacity-0 transition-opacity duration-300 ${hoveredNgo === idx ? 'opacity-70' : ''}`} />
                
                {/* Animated Border Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand-500 to-teal-400 opacity-30 rounded-3xl" />

                <div className="relative bg-gray-900/80 backdrop-blur-2xl h-full w-full rounded-[22px] p-6 flex flex-col border border-white/10 overflow-hidden group">
                  {/* Inner Shine Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full z-10" />
                  
                  <div className="w-full aspect-square rounded-xl overflow-hidden mb-5 relative shadow-lg">
                    <img src={ngo.image} alt={ngo.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-brand-500/0 group-hover:bg-brand-500/30 transition-colors duration-500 mix-blend-overlay"></div>
                  </div>
                  <h3 className="text-xl font-black mb-1 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-300 group-hover:to-teal-300 transition-all">{ngo.name}</h3>
                  <h6 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{ngo.role}</h6>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-20 text-center">
             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block relative z-20">
               <Link 
                to="/register"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-800 to-black backdrop-blur-md text-white font-bold uppercase tracking-widest py-4 px-10 rounded-full hover:from-gray-700 hover:to-gray-900 transition-all border border-white/20 hover:border-brand-500/50 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]"
              >
                Register your NGO <Award className="w-5 h-5 text-brand-400" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Helping Section embedded here to keep previous work */}
      <div className="border-t border-white/10">
         <InteractiveHelpingSection />
      </div>

    </PageTransition>
  );
}
