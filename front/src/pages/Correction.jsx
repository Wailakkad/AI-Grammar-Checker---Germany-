import axios from 'axios';
import React, { useState } from 'react';
import { useOutletContext } from "react-router-dom";
import { Wand2, Save, AlertCircle } from 'lucide-react';
import { ToastContainer , toast } from 'react-toastify';

const Correction = ({ darkMode }) => {
  const [text, setText] = useState('');
  const [option, setOption] = useState('grammar');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const user = useOutletContext();
  const userID = user._id;

  const handleCorrection = async () => {
    if (text.trim() === '') {
      toast.error('Please enter text to correct');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:2000/api/app/correct', {
        text,
        option,
      });

      if (response.status === 200) {
        setResult(response.data.correctedText || 'No corrections found.');
      } else {
        toast.error('Error occurred while correcting the text');
      }
    } catch (err) {
      
      toast.error('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!result) {
      toast.error('Please correct the text first before saving');
      return;
    }

    try {
      const response = await axios.post("http://localhost:2000/api/app/save", {
        userID,
        Text: text,
        Option: option,
        Correction: result
      });
      if (response.status === 200) {
        toast.success("Saved successfully!");
      } else {
        toast.error("Error saving the correction");
      }
    } catch (err) {
        console.error(err);
        toast.error('Failed to save correction');
    }
  };

  return (
   <>
      <div className={`min-h-screen p-6 md:p-12 transition-colors duration-200 ${
      darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
    }`}>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Text Correction Tool
          </h1>
          <p className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Our AI-powered tool helps refine your text for grammar and meaning
          </p>
        </div>

        {/* Main Content */}
        <div className={`space-y-6 p-6 rounded-2xl shadow-lg ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}>
          {/* Input Area */}
          <div className="space-y-4">
            <textarea
              className={`w-full h-48 p-4 text-lg rounded-xl resize-none transition-colors
                focus:ring-2 focus:ring-blue-500 focus:outline-none
                ${darkMode 
                  ? "bg-gray-700 text-white placeholder-gray-400 border-gray-600" 
                  : "bg-gray-50 text-gray-900 placeholder-gray-500 border-gray-200"
                } border`}
              placeholder="Enter your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={option}
                onChange={(e) => setOption(e.target.value)}
                className={`p-3 rounded-xl text-lg flex-1 sm:max-w-[200px]
                  transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none
                  ${darkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-gray-50 text-gray-900 border-gray-200"
                  } border`}
              >
                <option value="grammar">Check Grammar</option>
                <option value="meaning">Check Meaning</option>
              </select>

              <button
                onClick={handleCorrection}
                disabled={isLoading}
                className={`flex items-center justify-center gap-2 py-3 px-6 rounded-xl
                  text-lg font-semibold transition-all duration-200
                  ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90 active:scale-95"}
                  ${darkMode ? "bg-blue-600 text-white" : "bg-blue-500 text-white"}`}
              >
                <Wand2 className="w-5 h-5" />
                {isLoading ? "Correcting..." : "Correct Text"}
              </button>
            </div>
          </div>

          {/* Result Area */}
          {(result || text) && (
            <div className={`mt-8 p-6 rounded-xl border ${
              darkMode 
                ? "bg-gray-700 border-gray-600" 
                : "bg-gray-50 border-gray-200"
            }`}>
              <h2 className="text-xl font-semibold mb-4">Corrected Text:</h2>
              <div className={`p-4 rounded-lg ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}>
                {result ? (
                  <p className="text-lg whitespace-pre-wrap">{result}</p>
                ) : (
                  <div className="flex items-center gap-2 text-gray-500">
                    <AlertCircle className="w-5 h-5" />
                    <p>Corrected text will appear here</p>
                  </div>
                )}
              </div>

              {result && (
                <button
                  onClick={handleSave}
                  className={`mt-6 flex items-center gap-2 py-2.5 px-5 rounded-lg
                    font-medium transition-all duration-200 hover:opacity-90 active:scale-95
                    ${darkMode 
                      ? "bg-green-600 text-white" 
                      : "bg-green-500 text-white"
                    }`}
                >
                  <Save className="w-4 h-4" />
                  Save Correction
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
    <ToastContainer
        key={darkMode ? "dark" : "light"} // Re-initialize on theme change
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={true}
        closeOnClick
        pauseOnHover
        draggable
        theme={darkMode ? "dark" : "light"}
      />
   </>
  );
};

export default Correction;