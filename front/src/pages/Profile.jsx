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
      setLoading(true); // Start loading before making the request
  
      const encryptedToken = localStorage.getItem('accessToken'); 
      const iv = localStorage.getItem('accessTokenIv'); 
  
      if (!encryptedToken || !iv) {
        setError('Token or IV not found in localStorage');
        setLoading(false);
        return;
      }
  
      try {
        const response = await axios.post('http://localhost:2000/api/app/profile', {
          token: encryptedToken,
          iv,
        });
  
        if (response.status === 200) {
          setUser(response.data.user); 
          setLoading(false); // Stop loading when data is received
        } else {
          setError('Failed to fetch profile data.');
          setLoading(false);
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
            const updatedToken = localStorage.getItem('accessToken');
            const updatedIv = localStorage.getItem('accessTokenIv');
  
            if (updatedToken && updatedIv) {
              await fetchUser();
              return; // Exit to prevent `setLoading(false)` from running
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
        setLoading(false);
      }
    };
  
    fetchUser();
  }, []);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center gap-8 mt-16 py-12 rounded-lg">
        <h1 className="text-white text-4xl font-extrabold mb-4 animate__animated animate__fadeIn">
          Oops! Something Went Wrong
        </h1>
        <div className="mb-6 animate__animated animate__zoomIn">
          <img src={imgError} alt="Error" className="w-32 h-32 object-contain" />
        </div>
        <p className="text-red-600 text-lg text-center font-medium max-w-md animate__animated animate__fadeIn animate__delay-1s">
          We encountered an issue: <span className="text-xl font-bold">{error}</span>. Please try again later.
        </p>
        <button
          onClick={() => Navigate('/login')}
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
