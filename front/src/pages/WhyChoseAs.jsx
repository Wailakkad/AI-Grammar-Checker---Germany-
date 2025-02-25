import React from 'react';
import img1 from '../pages/imagesPages/shield.png';
import img2 from '../pages/imagesPages/microphone.png';
import img3 from '../pages/imagesPages/download.png';
import img4 from '../pages/imagesPages/bookmark.png';
import img5 from '../pages/imagesPages/workflow.png';
import img6 from '../pages/imagesPages/notebook.png';
import {Link } from "react-router-dom"

const WhyChoseAs = ({darkMode , login}) => {
  const DATA = [
    {
      img: img1,
      title: 'Accurate Grammar and Meaning Checker',
      description:
        'Ensure your German texts are not only grammatically correct but also meaningful and contextually accurate. Our AI goes beyond basic grammar checks to improve the overall quality of your writing.',
    },
    {
      img: img2,
      title: 'Voice-to-Text Conversion with Automatic Correction',
      description:
        'Simply speak, and our AI will convert your speech into error-free text. Perfect for dictating ideas, taking quick notes, or recording meeting summaries.',
    },
    {
      img: img3,
      title: 'Download Corrections',
      description:
        'Save your corrected text directly to your device in one click. Whether it’s an essay, email, or report, you can easily access and share polished content.',
    },
    {
      img: img4,
      title: 'Save Your Corrections for Later',
      description:
        'Keep track of your improvements by saving your corrected texts. This feature allows you to revisit and reuse your work whenever needed, making it ideal for ongoing projects or learning purposes.',
    },
    {
      img: img5,
      title: 'Simplify Your Workflow',
      description:
        'By combining grammar checking, meaning enhancement, voice-to-text conversion, and correction management, our tool is a one-stop solution for improving your German writing efficiently and effectively.',
    },
    {
      img: img6,
      title: 'Writing Assistant for All Types of Writing in German',
      description:
        'Our versatile Writing Assistant tool supports various writing styles, from formal letters to creative writing, all in German. Whether you need to shorten your content or expand it for more detail, this tool adapts to your needs, ensuring your German writing is always on point, concise, or thorough.',
    }    
  ];

  return (
    <div className={`flex flex-col items-center justify-center px-12 py-12 mb-16 ${darkMode ? "bg-black" : "bg-white"}`}>
      <h1 className="text-2xl font-bold mb-4">Why Choose Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {DATA.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-center text-center p-4 border rounded-lg shadow-lg ${darkMode ? "hover:bg-[#ffbf69]" : "hover:bg-[#ede0d4]"} transition-all duration-300 `}
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-16 h-16 mb-4"
            />
            <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
      <Link to={login ? '/profile' : '/login'}>  
      <button className={`${darkMode ? "bg-white text-black" : "bg-black text-white"} flex items-center justify-center font-bold  px-8 py-3 rounded-lg mt-8 mb-12`}>
                Start Now
              </button>
            </Link>
    </div>
  );
};

export default WhyChoseAs;
