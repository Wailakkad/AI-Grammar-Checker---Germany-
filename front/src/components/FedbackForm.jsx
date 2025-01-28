import React, { useState } from 'react';
import { Send, Star } from 'lucide-react';
import RatingStars from './Ratting.jsx';

const FeedbackForm = ({ darkMode, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit({ rating, comment });
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <p className={`text-sm uppercase tracking-wider font-medium ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}>Rate your experience</p>
          <RatingStars rating={rating} onRatingChange={setRating} />
        </div>
        
        <div className="relative">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us about your experience..."
            className={`w-full h-40 ${
              darkMode 
                ? "bg-gray-800/50 border-gray-700 text-white placeholder-gray-500" 
                : "bg-white/50 border-gray-200 text-black placeholder-gray-400"
            } border-2 rounded-xl p-6 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 resize-none backdrop-blur-sm`}
            required
          />
          <div className={`absolute bottom-4 right-4 text-xs ${
            darkMode ? "text-gray-500" : "text-gray-400"
          }`}>
            {comment.length}/500
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || rating === 0}
        className={`w-full flex items-center justify-center gap-3 p-4 rounded-xl transition-all duration-300 
          ${isSubmitting 
            ? 'bg-gray-400 cursor-not-allowed opacity-50' 
            : 'bg-emerald-500 hover:bg-emerald-600 shadow-lg hover:shadow-emerald-500/25'} 
          ${darkMode ? "hover:bg-emerald-600" : "hover:bg-emerald-500"}
          transform hover:-translate-y-0.5`}
      >
        <Send className="w-5 h-5" strokeWidth={2} />
        <span className="font-medium">
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </span>
      </button>
    </form>
  );
};

export default FeedbackForm;