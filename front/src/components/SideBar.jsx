import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {  PiggyBank, BookOpen, CheckSquare, LogOut, UserCheck ,  Mic} from 'lucide-react';
import { ToastContainer ,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Sidebar = ({ darkMode, user }) => {
  const navigate = useNavigate();
  const [savingsCount, setSavingsCount] = useState(0);

  const navItems = [
    { to: "saving", icon: PiggyBank, hoverColor: "hover:bg-emerald-500/10 hover:text-emerald-500", Name: "Saving Correction" },
    { to: "resources", icon: BookOpen, hoverColor: "hover:bg-violet-500/10 hover:text-violet-500", Name: "Writting" },
    { to: "spechToText", icon: Mic, hoverColor: "hover:bg-rose-500/10 hover:text-rose-500", Name: "Spech correction" },
    { to: "", icon: CheckSquare, hoverColor: "hover:bg-rose-500/10 hover:text-rose-500", Name: "Ai Correction Tool" },
    { to: "SettingsProfile", icon: UserCheck, hoverColor: "hover:bg-rose-500/10 hover:text-rose-500", Name: "Check Profile" }
    
  ];

  useEffect(() => {
    const fetchSavingsCount = async () => {
      try {
        const response = await axios.get(`http://localhost:2000/api/app/CoutSaving/${user._id}`);
        setSavingsCount(response.data.CountCorrection);
      } catch (error) {
        console.error("Error fetching savings count:", error);
      }
    };

    fetchSavingsCount();
  }, [user._id]);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.clear();
   
      navigate("/login");
      window.location.reload();

  };
  return (
    <div className="fixed left-6 top-3 h-[650px] flex flex-col justify-between py-6 mt-16">
      <div
        className={`w-[70px] ${darkMode ? "bg-white" : "bg-gray-900"} p-3 rounded-2xl shadow-lg shadow-black/5 backdrop-blur-lg flex flex-col items-center space-y-2 border border-gray-200/10`}
      >
        {navItems.map(({ to, icon: Icon, hoverColor, Name }) => (
          <Link
            key={to}
            to={to}
            className={`relative group p-3 rounded-xl transition-all duration-300
              ${darkMode ? "text-gray-600" : "text-gray-400"}
              ${hoverColor}
              hover:scale-110 active:scale-95`}
          >
            <Icon className="w-6 h-6 stroke-[1.5px]" />
            
            {/* Display Count for Saving Correction */}
            {Name === "Saving Correction" && savingsCount > 0 && (
              <span className="absolute top-0 right-0 inline-block bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {savingsCount}
              </span>
            )}
            
            {/* Tooltip */}
            <span
              className={`absolute left-14 px-2 py-1 rounded-md text-xs font-medium
                whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity
                ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}
                shadow-lg`}
            >
              {Name.charAt(0).toUpperCase() + Name.slice(1)}
            </span>
          </Link>
        ))}
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className={`relative group w-[70px] h-[70px] 
          ${darkMode ? "bg-white" : "bg-gray-900"} 
          rounded-2xl shadow-lg shadow-black/5 backdrop-blur-lg
          flex items-center justify-center
          border border-gray-200/10
          transition-all duration-300
          hover:scale-105 active:scale-95`}
      >
        <LogOut className={`w-6 h-6 stroke-[1.5px] ${darkMode ? "text-rose-500" : "text-rose-400"}`} />
        
        {/* Tooltip */}
        <span
          className={`absolute left-14 px-2 py-1 rounded-md text-xs font-medium
            whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity
            ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}
            shadow-lg`}
        >
          Logout
        </span>
      </button>
      <ToastContainer />
    </div>
  );
};

export default Sidebar;
