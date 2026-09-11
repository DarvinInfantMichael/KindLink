import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Building2, Globe2, X, Clock, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function NgoEvents() {
  const { ngoEvents } = useAuth();
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedEvent]);

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
                <button 
                  onClick={() => setSelectedEvent(event)}
                  className="text-sm font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
                >
                  Learn More &rarr;
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedEvent && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6" style={{ position: 'fixed' }}>
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                onClick={() => setSelectedEvent(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col max-h-[90vh]"
              >
                {/* Image Header */}
                <div className="relative h-64 w-full shrink-0">
                  <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
                  <button 
                    onClick={() => setSelectedEvent(null)}
                    className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-md transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-0 left-0 p-6 sm:p-8 w-full">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-500/20 text-brand-300 border border-brand-500/30 rounded-full text-xs font-bold backdrop-blur-md mb-3">
                      <Building2 className="w-3.5 h-3.5" />
                      {selectedEvent.ngoName}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                      {selectedEvent.title}
                    </h3>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-8 overflow-y-auto">
                  <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 px-4 py-2.5 rounded-xl border border-gray-100 dark:border-gray-700">
                      <Calendar className="w-5 h-5 text-brand-500" />
                      {new Date(selectedEvent.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 px-4 py-2.5 rounded-xl border border-gray-100 dark:border-gray-700">
                      <MapPin className="w-5 h-5 text-brand-500" />
                      {selectedEvent.location}
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">About this Event</h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-[15px] mb-8">
                    {selectedEvent.description}
                  </p>

                  {/* Call to Action */}
                  <div className="mt-auto">
                    <button 
                      onClick={() => setSelectedEvent(null)}
                      className="w-full py-4 bg-gradient-to-r from-gray-900 via-emerald-950 to-black hover:from-gray-800 hover:via-emerald-900 hover:to-gray-900 border border-emerald-800/50 hover:border-emerald-500/50 text-emerald-400 hover:text-emerald-300 font-bold text-lg rounded-xl transition-all shadow-[0_0_20px_rgba(4,120,87,0.3)] hover:shadow-[0_0_30px_rgba(4,120,87,0.5)]"
                    >
                      Got it, Thanks!
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
