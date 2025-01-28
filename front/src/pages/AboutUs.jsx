import React from 'react';
import icon1 from "./imagesPages/mission-statement.png";
import icon2 from "./imagesPages/touch.png";
import icon3 from "./imagesPages/target.png";
import CallToAction from '../components/CallToActions';
import FeaturesCarousel from '../components/FeaturesCarousel';

const AboutUs = ({ darkMode, login }) => {
  const Data = [
    { img: icon1, title: "The Mission", description: "Our mission is to provide an intuitive, efficient, and powerful AI tool that helps you write with confidence, ensuring your content is error-free." },
    { img: icon2, title: "Why Choose Us", description: "We offer advanced AI technology, real-time grammar checking, and a user-friendly interface that’s tailored to meet your needs." },
    { img: icon3, title: "Our Vision", description: "Our vision is to revolutionize the way individuals approach writing by providing smart, fast, and reliable AI tools for better communication." }
  ];

  return (
    <>
      <div
        className={`flex flex-col items-center justify-center min-h-screen px-4 mt-16 sm:px-6 lg:px-8 ${
          darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
        }`}
      >
        <div
          className={`rounded-3xl w-full max-w-4xl p-px bg-gradient-to-b ${
            darkMode ? 'from-blue-800 to-purple-800' : 'from-blue-300 to-pink-300'
          }`}
        >
          <div
            className={`rounded-[calc(1.5rem-1px)] p-8 sm:p-10 ${
              darkMode ? 'bg-gray-900' : 'bg-white'
            }`}
          >
            <h1 className="text-3xl font-bold mb-6 text-center">About Us</h1>
            <p className="text-center mb-10 text-base sm:text-lg">
              "Our mission is to help you write better with AI-powered grammar checking."
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Data.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col items-center gap-4 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 ${
                    darkMode
                      ? 'bg-gray-800 text-gray-300'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <img src={item.img} alt={item.title} className="w-16 h-16 mb-4" />
                  <h2 className="text-xl font-semibold mb-2 text-center">{item.title}</h2>
                  <p className="text-center text-sm sm:text-base">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <FeaturesCarousel darkMode={darkMode} />
      <CallToAction darkMode={darkMode} login={login} />
    </>
  );
};

export default AboutUs;
