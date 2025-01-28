import React, { useState } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import ErrorImage from "../images/error.png"
import useSpeechToText from '../Hook/UseSpechToText';
const SpeechToText = ({darkMode}) => {
  const [textInput, setTextInput] = useState('');
  const [correctedText, setCorrectedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // New state for error message

  const { startListening, stopListening, transcript, isListening } = useSpeechToText();

  const startStopListening = () => {
    if (isListening) {
      stopAndSave();
    } else {
      startListening();
    }
  };

  const stopAndSave = () => {
    setTextInput(transcript);
    stopListening();
    correctText(transcript);
  };

  const correctText = async (text) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await fetch('http://localhost:2000/api/app/SpechCorrection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      if (data.correctedText) {
        setCorrectedText(data.correctedText);
      } else {
        throw new Error(data.message || 'Failed to correct text');
      }
    } catch (error) {
        setErrorMessage(error.message || 'An error occurred while correcting the text.');    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={`${darkMode ? "bg-gradient-to-b from-gray-900 to-gray-800 text-white" : "bg-[#f8edeb] text-black"} min-h-screen p-8 rounded-2xl`}>
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Speech to Text Converter</h1>
          <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
            Click the microphone to start speaking
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={startStopListening}
            className={`p-4 rounded-full transition-all duration-300 ${
              isListening
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-emerald-500 hover:bg-emerald-600'
            }`}
          >
            {isListening ? (
              <MicOff className="w-8 h-8" />
            ) : (
              <Mic className="w-8 h-8" />
            )}
          </button>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <textarea
              className={`w-full h-40 ${
                darkMode 
                  ? "bg-gray-800 border-gray-700 text-white" 
                  : "bg-[#3fefae0] border-black text-black"
              } border rounded-lg p-4 focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none`}
              value={isListening ? transcript : textInput}
              onChange={(e) => setTextInput(e.target.value)}
              disabled={isListening}
              placeholder="Your speech will appear here..."
            />
            {isListening && (
              <div className="absolute bottom-4 right-4">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse delay-75" />
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse delay-150" />
                </div>
              </div>
            )}
          </div>

          {isLoading && (
            <div className="flex justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-emerald-500" />
            </div>
          )}

          {correctedText ? (
            <div className={`${
              darkMode 
                ? "bg-gray-800 border-gray-700" 
                :  "bg-[#3fefae0] border-black text-black"
              } rounded-lg p-6 border`}>
              <h3 className="text-lg font-semibold text-emerald-400 mb-2">
                Corrected Text
              </h3>
              <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
                {correctedText}
              </p>
            </div>
          ) : errorMessage ? (
            <div className={`${
              darkMode 
                ? "bg-gray-800 border-gray-700" 
                :  "bg-[#3fefae0] border-black text-black"
              } rounded-lg p-6 border`}>
              <h3 className="text-lg font-semibold text-red-500 mb-2">
                Error
              </h3>
              <div className="flex justify-center mb-4">
                <img 
                  src={ErrorImage} 
                  alt="Error" 
                  className="w-[200px] h-[200px] object-contain" 
                />
              </div>
              <p className={`text-center ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                {errorMessage}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
  
};

export default SpeechToText;