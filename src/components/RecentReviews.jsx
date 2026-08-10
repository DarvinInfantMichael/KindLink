import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Heart, Star, ChevronLeft, ChevronRight, MessageSquareQuote } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ReviewModal from './ReviewModal';

export default function RecentReviews() {
  const { reviews, user, toggleLikeReview } = useAuth();
  const [selectedReview, setSelectedReview] = useState(null);
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-scroll logic
  useEffect(() => {
    if (!containerRef.current || isHovered) return;
    
    const scrollInterval = setInterval(() => {
      if (containerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          // Reset to start if at the end
          containerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          containerRef.current.scrollBy({ left: 350, behavior: 'smooth' });
        }
      }
    }, 4000); // Scroll every 4 seconds

    return () => clearInterval(scrollInterval);
  }, [isHovered, reviews.length]);

  const handleLike = (e, reviewId) => {
    e.stopPropagation(); // Prevent opening the modal when liking
    if (user) {
      toggleLikeReview(reviewId, user.id);
    } else {
      // Fallback if no user is logged in (though this is protected dashboard)
      toggleLikeReview(reviewId, 'anonymous');
    }
  };

  const scroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!reviews || reviews.length === 0) return null;

  const currentUserId = user?.id || 'anonymous';

  return (
    <div className="mb-12 relative w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <MessageSquareQuote className="w-6 h-6 text-brand-500" />
            Recent Donator Reviews
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">See what others are saying about their donation experience.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <button 
            onClick={() => scroll('left')}
            className="p-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div 
        className="relative overflow-hidden -mx-4 px-4 sm:mx-0 sm:px-0"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          ref={containerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 hide-scrollbar w-full"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {reviews.map((review) => {
            const hasLiked = review.likes.includes(currentUserId);
            return (
              <motion.div
                key={review.id}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedReview(review)}
                className="snap-start shrink-0 w-80 sm:w-[350px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl dark:hover:shadow-brand-500/10 transition-all group flex flex-col"
              >
                {/* Card Image */}
                <div className="h-40 w-full bg-gray-100 dark:bg-gray-800 relative overflow-hidden shrink-0">
                  {review.image ? (
                    <img src={review.image} alt="Donation" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-brand-100 to-brand-50 dark:from-gray-800 dark:to-gray-700" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <span className="text-white font-bold tracking-tight">{review.ngoName}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-500/10 px-2 py-1 rounded-lg">
                      <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs font-bold text-yellow-700 dark:text-yellow-400">{review.rating}.0</span>
                    </div>
                    <span className="text-xs text-gray-400 font-medium">{new Date(review.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4 italic leading-relaxed flex-1">
                    "{review.comment}"
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800 mt-auto">
                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{review.donatorName}</span>
                    <button
                      onClick={(e) => handleLike(e, review.id)}
                      className="flex items-center gap-1.5 p-2 -mr-2 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group/btn"
                    >
                      <Heart 
                        className={`w-4 h-4 transition-transform group-hover/btn:scale-110 ${hasLiked ? 'fill-red-500 text-red-500' : 'text-gray-400 dark:text-gray-500 group-hover/btn:text-red-500'}`} 
                      />
                      <span className={`text-xs font-medium ${hasLiked ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
                        {review.likes.length}
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <ReviewModal 
        isOpen={!!selectedReview}
        review={selectedReview}
        onClose={() => setSelectedReview(null)}
        currentUserId={currentUserId}
        onToggleLike={(id) => toggleLikeReview(id, currentUserId)}
      />
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  );
}
