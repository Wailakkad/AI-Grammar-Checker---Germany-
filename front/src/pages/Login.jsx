import axios from 'axios';
import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Login = ({ darkMode , setLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        'http://localhost:2000/api/app/login', // Adjust API endpoint
        { email, password }
      );
  
      // Get encrypted token and IV from the response
      const { accessToken, accessTokenIv, refreshToken, refreshTokenIv } = response.data;
  
      // Store the tokens and IVs in localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('accessTokenIv', accessTokenIv);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('refreshTokenIv', refreshTokenIv);
  
      // Display success toast
      toast.success("Login successfully!");
  
      // Redirect to the profile page
      setTimeout(() => {
        navigate('/profile');
      }, 1000);
  
      setLogin(true);
    } catch (err) {
      // Extract error message from server response
      const errorMessage =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : 'Login failed. Please check your credentials.';
  
      // Display error toast
      toast.error(errorMessage);
    }
  };
  
  
  return (
    <div className="min-h-screen flex items-center justify-center gap-16 px-28 mt-16">
      <div className="h-[500px] flex items-center justify-center px-16">
        <div className="space-y-6 text-start">
          <h1 className={`${darkMode ? 'text-[#ffffff]' : 'text-[#023e7d]'} text-4xl font-semibold leading-tight`}>
            Welcome Back to <span className="text-[#fb8500]">AI Grammar Checker</span>
          </h1>
          <p className={`${darkMode ? 'text-[#8d99ae]' : 'text-[#023e7d]'} text-lg`}>
            Log in to access your personalized grammar correction and writing improvement tools. Enhance your emails, essays, and reports with AI-powered precision.
          </p>
          <p className={`${darkMode ? 'text-[#ffffff]' : 'text-[#0466c8]'} text-lg font-light`}>
            if you don't have an account, sign up now.
          </p>
          <Link to="/register">
            <button className={`${darkMode ? 'bg-white' : 'bg-[#001840]'} flex items-center justify-center text-[#fb8500] px-14 py-2 rounded-lg mt-6`}>
              Sign Up Now
            </button>
          </Link>
        </div>
      </div>

      <div className="relative w-full max-w-lg transform transition-all duration-500">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-[#ff9f1c] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-[#72ddf7] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#ffb3c1] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

        <div className="m-8 relative space-y-8 px-8 py-6 rounded-xl form-container">
          <form onSubmit={handleLogin} className="flex flex-col items-center justify-center gap-6">
            <h1 className="text-2xl font-bold text-gray-800">Welcome</h1>
            <p className="text-gray-600 text-center">
              Set your information to correct your text
            </p>
            <div className="flex flex-col items-center justify-center gap-4 w-full">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="input-field"
              />
            </div>
            <div className="flex items-center justify-between w-full text-gray-600">
              <label className="flex items-center gap-2">
                <input type="radio" />
                <span className="text-white">Remember me</span>
              </label>
              <a href="#" className="hover:underline text-white">
                Forgot password?
              </a>
            </div>
            <button type="submit" className="btn-primary w-full">
              Sign In
            </button>
            <div className="flex flex-col items-center gap-6">
              <h2 className="text-white">Or continue with</h2>
              <div className="flex items-center justify-center gap-4">
                <button className={`py-2 px-4 rounded-lg font-semibold ${darkMode ? 'bg-white text-gray-800 hover:bg-gray-100' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>
                  Google
                </button>
                <button className={`py-2 px-4 rounded-lg font-semibold ${darkMode ? 'bg-white text-gray-800 hover:bg-gray-100' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>
                  GitHub
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
