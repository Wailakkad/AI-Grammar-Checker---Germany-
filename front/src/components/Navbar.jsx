import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sun, Moon } from 'lucide-react';
import imgProfile from "./imgSidebar/man.png";
import LogoImg from "./imgSidebar/Logo.png"

function Navbar({ darkMode, setDarkMode, login }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("DarkMode");
    if (storedDarkMode !== null) {
      setDarkMode(storedDarkMode === "true");
    }
  }, [setDarkMode]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("DarkMode", newMode.toString());
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } fixed top-0 left-0 right-0 z-50 h-16 px-6 backdrop-blur-sm bg-opacity-80 border-b ${
        darkMode ? "border-gray-800" : "border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        
        <div className="flex items-center justify-center gap-2">
          <img src={LogoImg} alt="" width={35} height={35}  />
        <h1 className="text-2xl font-bold tracking-tight hover:text-blue-500 transition-colors">
          LingoFix
        </h1>
        </div>

        {/* Navigation Links for Desktop */}
        <div className="hidden md:block">
          <ul className="flex items-center space-x-8">
            {["Home", "About us", "Feedback" , "Contact"].map((item, index) => (
              <li key={index}>
                <Link
                  to={item === "Home" ? "/" 
                    : item === "About us" ? "/AboutUs" 
                    : item === "Feedback" ? "/Feedbak" 
                    : item === "Contact" ? "/Contact" 
                    : "#"}
                  className={`${darkMode ? "text-white" : "text-black"} bg-transparent px-2 py-2 rounded-lg  font-bold hover: hover:bg-[#faa916] transitiol-all duration-300 no-underline`}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md text-gray-900 dark:text-white"
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-all duration-200
              ${darkMode 
                ? "bg-gray-800 hover:bg-gray-700" 
                : "bg-gray-100 hover:bg-gray-200"
              }`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          {/* User Menu */}
          {login ? (
            <button
              onClick={() => navigate("/profile/SettingsProfile")}
              className={`group relative p-1 rounded-full transition-transform hover:scale-105
                ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
            >
              <img
                src={imgProfile}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className={`absolute -bottom-10 right-0 py-1 px-3 rounded-lg text-sm
                whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity
                ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}
              >
                View Profile
              </span>
            </button>
          ) : (
            <Link to="/login">
              <button
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200
                  ${darkMode 
                    ? "bg-white text-gray-900 hover:bg-gray-100" 
                    : "bg-[#ff5400] text-white hover:bg-[#ff6b1a]"
                  } transform hover:scale-105 active:scale-95`}
              >
                Get Started
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Navigation Links */}
     {/* Mobile Navigation Links */}
<div
  className={`md:hidden ${
    menuOpen ? "block" : "hidden"
  } absolute top-16 left-0 right-0 dark:bg-gray-900 border-t ${
    darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
  }`}
>
  <ul className={`flex flex-col items-center space-y-6 py-4`}>
    {["Home", "About us", "Feedback" , "Contact"].map((item, index) => (
      <li key={index}>
        <Link
        onClick={toggleMenu}
        to={item === "Home" ? "/" 
          : item === "About us" ? "/AboutUs" 
          : item === "Feedback" ? "/Feedbak" 
          : item === "Contact" ? "/Contact" 
          : "#"}
          className={`py-2 text-lg font-bold transition-colors ${
            darkMode
              ? "text-white hover:text-gray-300"
              : "text-gray-900 hover:text-gray-700"
          }`}
        >
          {item}
        </Link>
      </li>
    ))}
  </ul>
</div>

    </nav>
  );
}

export default Navbar;
