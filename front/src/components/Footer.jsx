import React from 'react';
import LogoImg from "./imgSidebar/Logo.png"


const Footer = ({ darkMode }) => {
  return (
    <footer
      className={`w-full py-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-[#ffd7ba] text-black'} mt-16`}
    >
      <div className="max-w-screen-xl mx-auto px-6 flex flex-col items-center md:flex-row md:justify-between">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-6 md:mb-0">
          {/* <img src={logo} alt="Logo" className="w-24 h-auto mr-4" /> */}
          <img src={LogoImg} alt="Logo" className="w-24 h-auto mr mb-6"/>
          <h1 className="text-2xl font-bold">AI Grammar Checker</h1>
        </div>

        {/* Info Section */}
        <div className="flex flex-col md:flex-row gap-12 text-center md:text-left ">
          <div className='flex flex-col items-center '>
            <h3 className="font-semibold text-2xl mb-2">About Us</h3>
            <p className="text-sm w-[200px] text-center">
              Our mission is to help you write better with AI-powered grammar checking.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-2xl">Quick Links</h3>
            <ul className="text-sm">
              <li><a href="/about" className="hover:text-blue-500">About</a></li>
              <li><a href="/features" className="hover:text-blue-500">Features</a></li>
              <li><a href="/contact" className="hover:text-blue-500">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-2xl">Follow Us</h3>
            <ul className="flex flex-col gap-4 text-sm">
              <li><a href="#" className="hover:text-blue-500">Facebook</a></li>
              <li><a href="#" className="hover:text-blue-500">Twitter</a></li>
              <li><a href="#" className="hover:text-blue-500">Instagram</a></li>
            </ul>
          </div>
          <div className='w-[300px] '>
            <h3 className="font-semibold mb-4 text-2xl">Subscribe</h3>
            <div className={`${darkMode ? "bg-white text-black" : "bg-black text-white"} p-2 flex items-center justify-between rounded-2xl mb-4`}>
              <input type="text" placeholder='Eanter Your Email' className={`${darkMode ? "bg-white" : "bg-black"} outline-none`} />
              <button className={`${darkMode ? "bg-black text-white" : "bg-white text-black"}  p-1 px-2 py-2 rounded-2xl`}>Subscribe</button>
            </div>
            <p>Subscribe for notify your for each updates and new feature <br /> that we will proded in the future</p>
           
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className={`${darkMode ? "border-white" : "border-black"} w-full text-center mt-8 border-t  pt-4`}>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} AI Grammar Checker. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
