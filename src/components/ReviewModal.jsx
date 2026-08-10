import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Star, Calendar, Building2, User } from 'lucide-react';

export default function ReviewModal({ review, isOpen, onClose, currentUserId, onToggleLike }) {
  if (!isOpen || !review) return null;

  const hasLiked = review.likes.includes(currentUserId);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 dark:bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]"
        >
          {/* Header Image */}
          <div className="relative h-64 w-full bg-gray-100 dark:bg-gray-800 shrink-0">
            {review.image && (
              <img src={review.image} alt="Donation" className="w-full h-full object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 left-6 flex items-center gap-2">
              <span className="px-3 py-1 bg-brand-500 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                {review.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{review.ngoName}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {review.donatorName}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {new Date(review.date).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-500/10 px-3 py-1.5 rounded-xl border border-yellow-100 dark:border-yellow-500/20">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="font-bold text-yellow-700 dark:text-yellow-400">{review.rating}.0</span>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Donor Satisfaction & Feedback</h4>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg italic">"{review.comment}"</p>
            </div>

            <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onToggleLike(review.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                    hasLiked 
                      ? 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 border border-red-100 dark:border-red-500/20' 
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 border border-transparent'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${hasLiked ? 'fill-current' : ''}`} />
                  {hasLiked ? 'Liked' : 'Like Review'}
                </button>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {review.likes.length} {review.likes.length === 1 ? 'person' : 'people'} liked this
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
