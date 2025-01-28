import React from 'react';
import { Star } from 'lucide-react';

const RatingStars = ({ rating, onRatingChange }) => {
  return (
    <div className="flex items-center justify-center gap-3">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRatingChange(star)}
          className="focus:outline-none transition-all duration-300 hover:scale-125 relative group"
        >
          <Star
            className={`w-10 h-10 transition-colors duration-300 ${
              star <= rating 
                ? 'fill-yellow-400 text-yellow-400 drop-shadow-lg' 
                : 'text-gray-400 group-hover:text-yellow-300'
            }`}
            strokeWidth={1.5}
          />
        </button>
      ))}
    </div>
  );
};

export default RatingStars;