import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import corection from './imgSidebar/correction.png';
import saving from "./imgSidebar/bookmark.png";
import SpechToText from "./imgSidebar/voice-message.png";
import Download from "./imgSidebar/file.png";
import Share from "./imgSidebar/file-sharing.png";
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const FeaturesCarousel = ({ darkMode }) => {
    const features = [
        {
          img: corection,
          title: "Grammar and Meaning Correction",
          description:
            "Enhance the quality of your text with advanced grammar correction tools that ensure your sentences are not only grammatically correct but also convey the intended meaning accurately in German. Perfect for professional writing, academic documents, and casual correspondence.",
        },
        {
          img: saving,
          title: "Save Corrections",
          description:
            "Conveniently store all your corrections in an organized manner for future reference. This feature is designed to help you keep track of changes and reuse previously corrected text, saving you time and effort in future writing tasks.",
        },
        {
          img: SpechToText,
          title: "Speech to Text",
          description:
            "Transform your spoken words into written text effortlessly with cutting-edge speech recognition technology. Ideal for note-taking, transcribing meetings, or simply capturing your thoughts on the go with unparalleled accuracy and efficiency.",
        },
        {
          img: Download,
          title: "Download Corrections",
          description:
            "Export your corrected text seamlessly in various formats such as PDF, Word, or plain text, enabling easy integration into your workflows. Whether for printing, sharing, or archiving, downloading corrections has never been easier.",
        },
        {
          img: Share,
          title: "Share Corrections",
          description:
            "Instantly share your corrected content via email, messaging apps, or directly to your social media platforms. Whether collaborating with colleagues or showcasing your work, sharing corrections ensures seamless communication and collaboration.",
        },
      ];
    return (
      <section
        className={`flex flex-col items-center justify-center px-6 py-16 ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
        }`}
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Our Features</h2>
        <div className="w-full max-w-3xl">
          <Slider {...settings}>
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-8 rounded-lg shadow-lg relative flex flex-col items-center justify-center mb-6 ${
                  darkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-800"
                }`}
              >
                <div
                  className={`w-20 h-20 mb-6 flex items-center justify-center rounded-full p-4 ${
                    darkMode ? "bg-white" : "bg-black"
                  }`}
                >
                  <img
                    src={feature.img}
                    alt={feature.title}
                    className="w-12 h-12 object-contain"
                  />
                </div>
  
                <h3 className="text-2xl font-semibold mb-4 text-center">
                  {feature.title}
                </h3>
                <p className="text-center text-sm leading-relaxed">
                  {feature.description}
                </p>
  
                <div
                  className={`absolute inset-0 rounded-lg -z-10 border-4 ${
                    darkMode
                      ? "border-gradient-to-r from-purple-600 to-pink-500"
                      : "border-gradient-to-r from-blue-500 to-teal-400"
                  }`}
                ></div>
              </div>
            ))}
          </Slider>
        </div>
        {/* Custom Dot Navigation Styling */}
        <style jsx>{`
          .slick-dots li button {
            background-color: ${darkMode ? "white" : "black"}; /* Dot color */
            border-radius: 70%;
          }
          .slick-dots li.slick-active button {
            background-color: ${darkMode ? "purple" : "blue"}; /* Active dot color */
          }
        `}</style>
      </section>
    );
  };

export default FeaturesCarousel;
