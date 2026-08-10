import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Target, CalendarDays } from 'lucide-react';

export default function HelpingDay() {
  const stats = [
    { icon: <Users className="w-6 h-6" />, label: 'Active Volunteers', value: '10K+' },
    { icon: <Heart className="w-6 h-6" />, label: 'Lives Impacted', value: '50K+' },
    { icon: <Target className="w-6 h-6" />, label: 'NGOs Partnered', value: '120+' },
  ];

  return (
    <div className="mt-16 mb-8 pt-8">
      <div className="flex items-center gap-2 mb-6">
        <CalendarDays className="w-7 h-7 text-brand-500" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">National Helping Day</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Join the global movement of kindness.</p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-3xl overflow-hidden bg-gray-900 shadow-2xl"
      >
        <div className="absolute inset-0">
          <img src="/images/helping_day.png" alt="Helping Day" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent" />
        </div>
        
        <div className="relative p-8 sm:p-12 md:w-3/4">
          <div className="inline-block px-4 py-1.5 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-400 font-bold text-sm mb-6 uppercase tracking-wider backdrop-blur-md">
            Upcoming: November 15th
          </div>
          
          <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
            One Day Can Change <br/>Everything.
          </h3>
          
          <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-xl">
            National Helping Day is our annual initiative to mobilize thousands of volunteers across the country. 
            Whether it's donating resources, volunteering time, or raising awareness—your contribution matters. 
            Sign up today to be part of the largest synchronized charity event of the year.
          </p>

          <div className="grid grid-cols-3 gap-4 mb-8 max-w-md">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <div className="text-brand-400 mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-brand-500 hover:bg-brand-600 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-brand-500/30 transition-colors"
          >
            Pledge Your Support
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
