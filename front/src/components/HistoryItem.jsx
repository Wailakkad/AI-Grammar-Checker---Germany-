import React from 'react';
import { Calendar, ArrowUpRight, Save } from 'lucide-react';


export const HistoryItem = ({ item, darkMode }) => (
  <div className={`group flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
    darkMode 
      ? 'bg-gray-800 hover:bg-gray-700' 
      : 'bg-gray-50 hover:bg-gray-100'
  }`}>
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-lg ${
        darkMode ? 'bg-blue-900/30' : 'bg-blue-100'
      }`}>
        <Save className={`w-5 h-5 ${
          darkMode ? 'text-blue-400' : 'text-blue-600'
        }`} />
      </div>
      <div>
        <h3 className={`font-semibold ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {item.option_text}
        </h3>
        <p className={`text-sm ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {item.description || 'No description'}
        </p>
      </div>
    </div>
    
    <div className="flex items-center gap-4">
      <div className={`flex items-center gap-2 ${
        darkMode ? 'text-gray-400' : 'text-gray-500'
      }`}>
        <Calendar className="w-4 h-4" />
        <span className="text-sm">
          {new Date(item.timestamp).toLocaleDateString()}
        </span>
      </div>
      <ArrowUpRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${
        darkMode ? 'text-gray-400' : 'text-gray-500'
      }`} />
    </div>
  </div>
);