import React, { useState } from 'react';
import FeedbackForm from '../components/FedbackForm';
import axios from 'axios';

const Feedback = ({ darkMode }) => {
  const [successMessage, setSuccessMessage] = useState('');
  const token = localStorage.getItem("accessToken");
  const iv = localStorage.getItem("accessTokenIv");

  const handleSubmitFeedback = async (feedbackData) => {
    try {
      const payload = {
        token: token,
        iv: iv,
        rating: feedbackData.rating,
        comment: feedbackData.comment
      };
  
      const response = await axios.post('http://localhost:2000/api/app/AddFedback', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        setSuccessMessage('Thank you for your feedback!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        throw new Error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  return (
    <div className={`${
      darkMode 
        ? "bg-gray-800/95 border-gray-700" 
        : "bg-white/95 border-gray-200"
      } rounded-2xl p-8 border backdrop-blur-sm shadow-xl min-h-screen mt-16 relative overflow-hidden`}>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-75" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -z-10 transform -translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10">
        <h2 className={`text-3xl font-bold mb-2 ${
          darkMode ? "text-white" : "text-gray-800"
        }`}>Your Feedback</h2>
        <p className={`text-sm mb-8 ${
          darkMode ? "text-gray-400" : "text-gray-600"
        }`}>Help us improve by sharing your thoughts</p>
        
        {successMessage && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 p-4 rounded-xl mb-8 backdrop-blur-sm animate-fade-in">
            <p className="text-center font-medium">{successMessage}</p>
          </div>
        )}
        
        <FeedbackForm darkMode={darkMode} onSubmit={handleSubmitFeedback} />
      </div>
    </div>
  );
};

export default Feedback;