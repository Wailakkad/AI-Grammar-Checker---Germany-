
import React, { useState } from 'react';
import Image from './imagesPages/notebook.png';
import { ArrowRight, Repeat, Minimize } from 'lucide-react';
import axios from 'axios';

const Resource = ({darkMode}) => {
  const Data = [
    {
      type: "Everyday Writing",
      categories: [
        "Simple emails (e.g., greetings, requests).",
        "Basic chat phrases.",
      ],
    },
    {
      type: "Formal Writing",
      categories: [
        "Job applications.",
        "Short essays.",
      ],
    },
    {
      type: "Creative Writing",
      categories: [
        "Story prompts.",
        "Simple poems.",
      ],
    },
    {
      type: "Academic Writing",
      categories: [
        "Essays or summaries.",
        "Sentence practice.",
      ],
    },
  ];
  

  const [selectedType, setSelectedType] = useState("Everyday Writing");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchResponse = async () => {
    setIsLoading(true);
    try {
      const result = await axios.post("http://localhost:2000/api/app/writing",{
       selectedType,
       selectedCategory
      })
      if(!result.status === 200){
        alert("Error")
      }else{
        console.log(result.data)
        setResponse(result.data.message)
      }
      
    } catch (error) {
      console.error("Error fetching response:", error);
      setResponse("An error occurred while fetching the response.");
    } finally {
      setIsLoading(false);
    }
  };
  const HandleOptimization = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    // Debugging: Log values before making the request
    console.log("Type:", e.target.value);
    console.log("Text:", response);
  
    if (!response || !e.target.value) {
      alert("Both Type and Text are required.");
      setIsLoading(false);
      return;
    }
  
    try {
      const responseOptization = await axios.post("http://localhost:2000/api/app/OptimizeText", {
        Type: e.target.value,
        Text: response
      });
  
      // Correct the status check
      if (responseOptization.status !== 200) {
        alert("Error");
      } else {
        setResponse(responseOptization.data.response);
        console.log(responseOptization.data.response);
      }
  
    } catch (err) {
      console.log(err);
      alert("An error occurred while processing your request.");
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <div
      className={`flex flex-col items-center justify-center p-4 max-w-4xl mx-auto mb-16 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-center">
          Writing Assistant
        </h1>
      </div>

      {/* Types Navbar */}
      <div className="flex mb-6 space-x-6 justify-center items-center w-full">
        {Data.map((item, index) => (
          <button
            key={index}
            className={`px-6 py-3 text-lg font-semibold rounded-full transition-all transform hover:scale-105 focus:outline-none ${
              selectedType === item.type
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                : darkMode
                ? "bg-gray-700 text-gray-300 hover:bg-blue-600"
                : "bg-gray-200 text-gray-800 hover:bg-blue-100"
            }`}
            onClick={() => {
              setSelectedType(item.type);
              setSelectedCategory(""); // Reset category when type changes
              setResponse(""); // Clear previous response
            }}
          >
            {item.type}
          </button>
        ))}
      </div>

      {/* Categories Navbar */}
      {selectedType && (
        <div className="flex mb-6 space-x-6 items-center justify-center w-full">
          {Data.find((item) => item.type === selectedType)?.categories.map(
            (category, index) => (
              <button
                key={index}
                className={`px-6 py-3 text-lg font-semibold rounded-full transition-all transform hover:scale-105 focus:outline-none ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-green-400 to-teal-500 text-white shadow-lg"
                    : darkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-green-600"
                    : "bg-gray-200 text-gray-800 hover:bg-green-100"
                }`}
                onClick={() => {
                  setSelectedCategory(category);
                  setResponse(""); // Clear previous response
                }}
              >
                {category}
              </button>
            )
          )}
        </div>
      )}

      {/* Fetch Response Button */}
      {selectedType && selectedCategory && (
        <button
          className="w-full max-w-md px-8 py-4 mb-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-600 transform transition-all duration-300 focus:outline-none"
          onClick={fetchResponse}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <span className="animate-spin mr-2 w-5 h-5 border-4 border-t-4 border-white rounded-full"></span>
              Generating...
            </span>
          ) : (
            "Get Writing Prompt"
          )}
        </button>
      )}

      <div className="w-full h-96 border border-gray-300 rounded-lg shadow-lg overflow-hidden">
        {!selectedType || !selectedCategory ? (
          <div
            className={`w-full h-full flex flex-col items-center justify-center ${
              darkMode ? "bg-gray-800" : "bg-gray-50"
            }`}
          >
            <img
              src={Image || "/placeholder.svg"}
              alt="Select a type and category"
              className="mb-4" width={140} height={140}
            />
            <p
              className={`text-gray-500 font-medium ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Please select a type and category
            </p>
          </div>
        ) : isLoading ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-900">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600 border-opacity-70"></div>
          </div>
        ) : response ? (
          <textarea
            className={`w-full h-full p-4 resize-none ${
              darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-900"
            } font-mono text-sm focus:outline-none`}
            value={response}
            readOnly
          />
        ) : (
          <div
            className={`w-full h-full flex flex-col items-center justify-center ${
              darkMode ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <p
              className={`text-gray-500 font-medium ${
                darkMode ? "text-gray-400" : "text-gray-500"
              } text-center`}
            >
              Click{" "}
              <span
                className={`font-semibold ${
                  darkMode ? "text-purple-400" : "text-purple-600"
                }`}
              >
                "Get Writing Prompt"
              </span>{" "}
              to generate content
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-6 mt-10">
        {/* More Button */}
        <button
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all transform hover:scale-105 ${
            darkMode
              ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:bg-blue-600"
              : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
          }`}
          onClick={HandleOptimization}
          disabled={isLoading}
          value="Long"
        >
          <ArrowRight size={18} />
          More
        </button>

        {/* Repeat Button */}
        <button
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all transform hover:scale-105 ${
            darkMode
              ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg hover:bg-yellow-500"
              : "bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg hover:bg-yellow-500"
          }`}
          onClick={fetchResponse}
          disabled={isLoading}
        >
          <Repeat size={18} />
          Repeat
        </button>

        {/* Short Button */}
        <button
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all transform hover:scale-105 ${
            darkMode
              ? "bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg hover:bg-green-600"
              : "bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg hover:bg-green-600"
          }`}
          onClick={HandleOptimization}
          disabled={isLoading}
          value="Short"
        >
          <Minimize size={18} />
          Short
        </button>
      </div>
    </div>
  );
};

export default Resource;

