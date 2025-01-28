import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingState = ({ darkMode }) => (
  <div className={`min-h-screen flex items-center justify-center ${
    darkMode ? 'bg-gray-900' : 'bg-gray-50'
  }`}>
    <Loader2 className={`w-8 h-8 animate-spin ${
      darkMode ? 'text-blue-400' : 'text-blue-500'
    }`} />
  </div>
);