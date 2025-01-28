import React from 'react';

export const ErrorState = ({ error, darkMode }) => (
  <div className={`min-h-screen flex items-center justify-center ${
    darkMode ? 'bg-gray-900' : 'bg-gray-50'
  }`}>
    <div className={`text-center p-8 rounded-lg shadow-lg ${
      darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
    }`}>
      <div className="text-red-500 mb-4">⚠️</div>
      <h3 className="text-lg font-semibold">Error</h3>
      <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{error}</p>
    </div>
  </div>
);