import React from 'react';
import { History } from 'lucide-react';

export const EmptyState = ({ darkMode }) => (
  <div className="text-center py-12">
    <div className="mb-4">
      <History className={`w-12 h-12 mx-auto ${
        darkMode ? 'text-gray-600' : 'text-gray-400'
      }`} />
    </div>
    <h3 className={`text-lg font-semibold ${
      darkMode ? 'text-white' : 'text-gray-900'
    }`}>
      No History Yet
    </h3>
    <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
      Your saving history will appear here
    </p>
  </div>
);