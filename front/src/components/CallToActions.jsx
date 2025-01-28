import React from 'react';
import { useNavigate } from 'react-router-dom';

const CallToAction = ({ darkMode , login }) => {
    const navigate = useNavigate();
  return (
    <section
      className={`flex flex-col items-center justify-center px-6 py-16 mb-16 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      {/* Gradient Border Wrapper */}
      <div
        className={`w-full max-w-4xl p-1 rounded-3xl bg-gradient-to-r ${
          darkMode ? 'from-purple-600 to-blue-500' : 'from-[#8eecf5] to-[#b9fbc0]'
        }`}
      >
        {/* Inner Content */}
        <div
          className={`flex flex-col items-center gap-6 rounded-[calc(1.5rem-1px)] px-8 py-12 ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="text-3xl font-bold text-center">
            Ready to Take the Next Step?
          </h2>
          <p className="text-center text-lg max-w-2xl">
            Whether you're looking to enhance your productivity, improve your
            writing, or explore the power of AI, we're here to help. Join
            thousands of professionals who trust us to transform the way they
            work.
          </p>

          {/* Buttons */}
          <div className="flex gap-6">
          <button
  onClick={() => navigate(login ? "/profile" : "/login")}
  className={`px-8 py-3 rounded-lg font-semibold shadow-lg ${
    darkMode
      ? 'bg-purple-600 hover:bg-purple-500 text-white'
      : 'bg-[#90dbf4] hover:bg-blue-400 text-black'
  }`}
>
  Get Started Now
</button>

            <button
              className={`px-8 py-3 rounded-lg font-semibold shadow-lg ${
                darkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-gray-300 hover:bg-gray-200 text-black'
              }`}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
