import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Rocket, ShieldCheck, MapPin, Globe } from 'lucide-react';
import PageTransition from '../components/PageTransition';

export default function FuturePlans() {
  const containerRef = useRef(null);
  
  return (
    <PageTransition className="bg-transparent min-h-screen text-white transition-colors">
      
      {/* Hero / Intro Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-white/10">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-8 leading-none drop-shadow-2xl">
            The Roadmap to 1 Million Verified Donations
          </h1>
          <p className="text-xl md:text-2xl font-medium max-w-3xl leading-relaxed text-white/80 drop-shadow-md">
            We have developed a phased approach to scaling KindLink globally. Our focus is on supporting robust, verified, and community-driven technology that helps bridge the gap between surplus and scarcity.
          </p>
        </div>
      </section>

      {/* Sticky Scroll Section */}
      <section className="relative" ref={containerRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row relative">
          
          {/* Left: Sticky Text */}
          <div className="w-full md:w-1/2 py-24 md:sticky top-20 h-auto md:h-[calc(100vh-80px)] flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tight drop-shadow-lg">Our Future Enhancements</h2>
            <p className="text-xl font-medium leading-relaxed max-w-md text-white/80">
              In order for our network to operate at maximum efficiency, we are rolling out strategic upgrades. Our commitment is to ensure 100% transparency as we build these features over the coming years.
            </p>
          </div>

          {/* Right: Scrolling Cards */}
          <div className="w-full md:w-1/2 pt-24 pb-48 space-y-[40vh]">
            
            {/* Card 1 */}
            <div className="sticky top-24 bg-white/10 backdrop-blur-md p-10 md:p-14 rounded-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.3)] border border-white/20 transition-all hover:scale-[1.02]">
              <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-red-500/30">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-black mb-2 text-white uppercase tracking-tight drop-shadow-sm">Live GPS Tracking</h3>
              <h6 className="text-sm font-bold text-red-400 uppercase tracking-widest mb-6">Phase 1 (Q3 2026)</h6>
              <p className="text-lg text-white/80 font-medium leading-relaxed">
                Track your donation pickups in real-time. This ensures absolute trust and transparency, letting donators see exactly when their items reach the NGO's doorstep.
              </p>
            </div>

            {/* Card 2 */}
            <div className="sticky top-24 bg-brand-500/20 backdrop-blur-md p-10 md:p-14 rounded-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.3)] border border-brand-400/30 text-white transition-all hover:scale-[1.02]">
              <div className="w-16 h-16 bg-brand-500/50 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md shadow-lg shadow-brand-500/20">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-black mb-2 uppercase tracking-tight drop-shadow-sm">Mobile App Launch</h3>
              <h6 className="text-sm font-bold text-brand-300 uppercase tracking-widest mb-6">Phase 2 (Q4 2026)</h6>
              <p className="text-lg text-white/80 font-medium leading-relaxed">
                Native iOS and Android applications for easier giving. A seamless, 3-tap donation process designed for the modern user on the go.
              </p>
            </div>

            {/* Card 3 */}
            <div className="sticky top-24 bg-purple-900/20 backdrop-blur-md p-10 md:p-14 rounded-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.3)] border border-purple-500/30 text-white transition-all hover:scale-[1.02]">
              <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-purple-500/30">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-black mb-2 uppercase tracking-tight drop-shadow-sm">Automated Tax Receipts</h3>
              <h6 className="text-sm font-bold text-purple-400 uppercase tracking-widest mb-6">Phase 3 (2027)</h6>
              <p className="text-lg text-white/80 font-medium leading-relaxed">
                Instant 80G and equivalent tax deductions generated right after your donation is verified by the partner NGO, sent directly to your inbox.
              </p>
            </div>

            {/* Card 4 */}
            <div className="sticky top-24 bg-blue-900/20 backdrop-blur-md p-10 md:p-14 rounded-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.3)] border border-blue-500/30 transition-all hover:scale-[1.02]">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-500/30">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-black mb-2 text-white uppercase tracking-tight drop-shadow-sm">Global NGO Network</h3>
              <h6 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-6">Phase 4 (2028+)</h6>
              <p className="text-lg text-white/80 font-medium leading-relaxed">
                Expanding our verified NGO network internationally, enabling cross-border support for crisis zones and global development programs.
              </p>
            </div>

          </div>
        </div>
      </section>
      
    </PageTransition>
  );
}
