import React from "react";
import video from "./imgSidebar/Recording.mp4";

function HowToUse({ darkMode }) {
  return (
    <div className={`${darkMode ? "bg-[#001845]" : "bg-[#f8edeb]"} py-16 px-6`}>
      <h1 className={`${darkMode ? "text-[#ffffff]" : ""} text-4xl font-bold text-center  mb-10`}>
        How to Use the Tool
      </h1>
      <div className="flex flex-col items-center gap-10 max-w-7xl mx-auto">
        {/* Text Section */}
        <div className={`${darkMode ? "text-[#adb5bd]" : "text-[#002855]"} text-lg text-center max-w-3xl`}>
          <p className="mb-6">
            Our Text Correction Tool is easy to use! Follow these simple steps to enhance your writing:
          </p>
          <ol className="list-decimal pl-5 space-y-4 text-left">
            <li>Enter your text in the input field.</li>
            <li>
              Select the type of correction: <span className="font-semibold">Grammar</span> or <span className="font-semibold">Meaning</span>.
            </li>
            <li>
              Click the <span className="font-semibold">"Correct"</span> button to process your text.
            </li>
            <li>Review the suggested changes and improve your writing instantly!</li>
          </ol>
          <p className="mt-6">
            Watch the video tutorial below for a step-by-step guide on how to get the best results using our tool.
          </p>
        </div>

        {/* Video Section */}
        <div className="w-full max-w-4xl">
          <video
            controls
            className="w-full rounded-lg shadow-lg"
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}

export default HowToUse;
