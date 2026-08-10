import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Building2, Globe2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function NgoEvents() {
  const { ngoEvents } = useAuth();

  if (!ngoEvents || ngoEvents.length === 0) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-2 mb-8">
        <Globe2 className="w-7 h-7 text-brand-500" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent NGO Activities & Events</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Discover public awareness campaigns, charity events, and group activities.</p>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {ngoEvents.map((event) => (
          <motion.div 
            key={event.id}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl dark:hover:shadow-brand-500/10 transition-all group flex flex-col"
          >
            {/* Event Image */}
            <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-900 overflow-hidden shrink-0">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-brand-600 dark:text-brand-400">
                {new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
            </div>

            {/* Event Details */}
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                {event.title}
              </h3>
              
              <div className="flex flex-col gap-2 mb-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1.5 font-medium text-gray-700 dark:text-gray-300">
                  <Building2 className="w-4 h-4 text-brand-500 shrink-0" />
                  {event.ngoName}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 shrink-0" />
                  {event.location}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4 flex-1">
                {event.description}
              </p>
              
              <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                <button className="text-sm font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors">
                  Learn More &rarr;
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
