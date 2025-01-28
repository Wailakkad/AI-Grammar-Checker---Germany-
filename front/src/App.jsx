import './index.css';
import { useEffect, useState } from 'react';
import img from "./images/notebooks.png";
import HowToUse from './components/Tuto';
import AboutUs from './pages/AboutUs.jsx';
import Navbar from './components/Navbar';
import Footer from './components/Footer.jsx';
import Login from './pages/Login';
import Feedback from './pages/Fedback.jsx';
import Register from "./pages/Register.jsx"
import Profile from './pages/Profile.jsx';
import Resource from './pages/Resource.jsx';
import SpechToText from './pages/SpechToText.jsx';
import Contact from './pages/Contact.jsx';
import SettingsProfile from './pages/SettingsProfile.jsx';
import WhyChoseAs from './pages/WhyChoseAs.jsx';
import Correction from './pages/Correction.jsx';
import Saving from './pages/Saving.jsx';
import { BrowserRouter as Router, Routes, Route , Link  } from "react-router-dom";
function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [login, setLogin] = useState(() => {
    const storedLogin = localStorage.getItem("Login");
    return storedLogin === "true";
  });
  useEffect(() => {
    localStorage.setItem("Login", login.toString());
  }, [login]);
  
  


  return (
    <Router>
      <div className={darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} setLogin={setLogin} login={login} />

        <Routes>
          {/* Default route "/" will render the content below */}
          <Route
  path="/"
  element={
    <>
      <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-16 px-6 md:px-16 lg:px-28 mt-16">
        {/* Main Image Section */}
        <div className="relative w-full max-w-md lg:max-w-lg transform transition-all duration-500 hover:scale-105">
          {/* Background Blob Animations */}
          <div className="absolute top-0 -left-4 w-48 h-48 lg:w-72 lg:h-72 bg-[#ff9f1c] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-6000"></div>
          <div className="absolute top-0 -right-4 w-48 h-48 lg:w-72 lg:h-72 bg-[#72ddf7] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-48 h-48 lg:w-72 lg:h-72 bg-[#ffb3c1] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

          {/* Main Image */}
          <div className="m-8 relative space-y-8">
            <img src={img} alt="Notebooks" className="w-full"/>
          </div>
        </div>

        {/* Text Content */}
        <div className="h-auto lg:h-[500px] flex flex-col items-center justify-center px-6 md:px-16 lg:px-16">
          <div className="space-y-6 text-center lg:text-start">
            <h1 className={`${darkMode ? "text-[#ffffff]" : "text-[#023e7d]"} text-3xl md:text-4xl font-semibold leading-tight`}>
              Welcome to the Text <span className="text-[#fb8500]">Correction Tool</span>
            </h1>
            <p className={`${darkMode ? "text-[#8d99ae]" : "text-[#023e7d]"} text-base md:text-lg`}>
              Improve your writing with our grammar and meaning correction tool. Whether you're preparing an email, report, or essay, our AI-based tool will help you refine your text.
            </p>
            <p className={`${darkMode ? "text-[#ffffff]" : "text-[#0466c8]"} text-base md:text-lg font-light`}>
              Simply enter your text, choose an option, and let the tool correct your text for grammar or meaning.
            </p>
           <div className='flex justify-center'>
           <Link to={login ? '/profile' : '/login'}>  
              <button className={`${darkMode ? "bg-white" : "bg-[#001845]"} flex items-center justify-center text-[#fb8500] px-8 py-2 rounded-lg mt-8 mb-12`}>
                Start Now
              </button>
            </Link>
           </div>
          </div>
        </div>
      </div>
      <HowToUse darkMode={darkMode} />
      <WhyChoseAs darkMode={darkMode} login={login}/>
    </>
  }
/>


          {/* Routes for other pages */}
          <Route path="/login" element={<Login darkMode={darkMode} setLogin={setLogin} />} />
          <Route path="/register" element={<Register darkMode={darkMode} />} />
          <Route path="/AboutUs" element={<AboutUs darkMode={darkMode} login={login}/>} />
          <Route path='/Feedbak' element={<Feedback darkMode={darkMode}/>}/>
          <Route path ="/Contact" element={<Contact darkMode={darkMode}/>}/>
          <Route path="/profile" element={<Profile darkMode={darkMode} setLogin={setLogin} />}>
               <Route index  element={<Correction darkMode={darkMode}  />} />
               <Route path="spechToText" element={<SpechToText darkMode={darkMode} />} />
               <Route path="resources" element={<Resource darkMode={darkMode} />} />
               <Route path="saving" element={<Saving darkMode={darkMode} />} />
               <Route path='SettingsProfile' element={<SettingsProfile darkMode={darkMode}  />}/>
         </Route>
        </Routes>

        <Footer darkMode={darkMode}/>
     
      </div>
    </Router>
  );
}

export default App;