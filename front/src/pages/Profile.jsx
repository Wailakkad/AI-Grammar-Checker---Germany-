import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet for nested routing
import SideBar from '../components/SideBar';
import axios from 'axios';
import imgError from "../images/robotError.png"
import { useNavigate } from 'react-router-dom';

const Profile = ({ darkMode , setLogin }) => {
  const [user, setUser] = useState(null); // State to hold user data
  const [error, setError] = useState(null); // State to handle errors
  const [loading, setLoading] = useState(true);
  const Navigate = useNavigate();

   
  // Function to refresh access token
  const refreshAccessToken = async () => {
    const encryptedRefreshToken = localStorage.getItem('refreshToken'); // Retrieve encrypted refresh token
    const refreshTokenIv = localStorage.getItem('refreshTokenIv'); // Retrieve IV for refresh token
  
    if (!encryptedRefreshToken || !refreshTokenIv) {
      setError('Refresh token or IV not found in localStorage.');
      return null;
    }
  
    try {
      // Send the encrypted refresh token and IV to the backend for a new access token
      const response = await axios.post(
        'http://localhost:2000/api/app/refresh', // Your refresh token endpoint
        { refreshToken: encryptedRefreshToken, refreshTokenIv }, // Send refresh token and IV
        {
          withCredentials: true, // Include cookies (if needed)
        }
      );
  
      if (response.status === 200) {
        // Store the new access token and IV in localStorage
        localStorage.setItem('accessToken', response.data.NewaccessToken);
        localStorage.setItem('accessTokenIv', response.data.accessTokenIv);
        return response.data.NewaccessToken; // Return the new access token
      } else {
        setError('Failed to refresh access token.');
        return null;
      }
    } catch (err) {
      setError('Error refreshing access token.');
      console.error(err);
      return null;
    }
  };
  
  useEffect(() => {
    const fetchUser = async () => {
      const encryptedToken = localStorage.getItem('accessToken'); // Retrieve encrypted token from localStorage
      const iv = localStorage.getItem('accessTokenIv'); // Retrieve IV from localStorage
  
      if (!encryptedToken || !iv) {
        setError('Token or IV not found in localStorage ');
        setLoading(false);
        return;
      }
  
      try {
        // Send the encrypted token and IV as part of the request body or headers
        const response = await axios.post(
          'http://localhost:2000/api/app/profile',
          { token: encryptedToken, iv }
        );
  
        if (response.status === 200) {
          setUser(response.data.user); // Save user data in state
        } else {
          setError('Failed to fetch profile data.');
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          // If unauthorized (token expired), attempt to refresh token
          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
            // After refreshing the token, retry fetching user data with the new access token
            const updatedToken = localStorage.getItem('accessToken');
            const updatedIv = localStorage.getItem('accessTokenIv');
            
            if (updatedToken && updatedIv) {
              await fetchUser(); // Retry with the new token and IV
            } else {
              setError('Unable to refresh token.');
            }
          } else {
            setError('Unable to refresh token.');
          }
        } else {
          setError('An error occurred while fetching profile data.');
        }
        console.error(err);
      }
      setLoading(false);
    };
  
    fetchUser();
  }, []);
 
  
  if (loading) {
    return <div>Loading...</div>; // Show loading state until user data is fetched
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-8 mt-16 py-12 bg-gradient-to-r from-red-500 via-red-600 to-red-700 rounded-lg shadow-lg">
        {/* Error Title */}
        <h1 className="text-white text-4xl font-extrabold mb-4 animate__animated animate__fadeIn">Oops! Something Went Wrong</h1>
  
        {/* Error Image */}
        <div className="mb-6 animate__animated animate__zoomIn">
          <img src={imgError} alt="Error" className="w-32 h-32 object-contain" />
        </div>
  
        {/* Error Message */}
        <p className="text-white text-lg text-center font-medium max-w-md animate__animated animate__fadeIn animate__delay-1s">
          We encountered an issue: <span className="text-xl font-bold">{error}</span>. Please try again later.
        </p>
  
        {/* Retry Button */}
        <button
          onClick={() =>Navigate('/login') } // Reloading the page as a retry action
          className="mt-6 px-6 py-3 bg-white text-red-600 font-semibold text-lg rounded-lg shadow-md hover:bg-red-100 transition-all ease-in-out duration-300 transform hover:scale-105"
        >
          Retry
        </button>
      </div>
    );
  }
  

  return (
    <div className="flex flex-col md:flex-row mt-16">
      {/* Sidebar */}
      <SideBar darkMode={darkMode} setLogin={setLogin} user={user} />
  
      {/* Profile content */}
      <div className="flex-1 p-6 md:ml-64">
        <Outlet context={user} />
      </div>
    </div>
  );
  
};

export default Profile;
