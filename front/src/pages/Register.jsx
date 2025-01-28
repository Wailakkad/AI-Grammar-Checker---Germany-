import React, { useState } from 'react'
import img from "./imagesPages/Sign_up-bro.png"
import axios from "axios"

const Register = ({darkMode}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPasssword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAdress] = useState("");

    const HandleSignUp = async (even)=>{
        even.preventDefault();
        if(!name || !email || !password){
          alert("Please fill all the fields");
        }
        try{
          const response = await  axios.post("http://localhost:2000/api/app/register",{
            name: name,
            email: email,
            password: password,
            phone : phone,
            address : address
            
          })
          if(response.status === 200){
            alert("User created successfully");
          }else{
            alert("Error creating user");
          }
            

        }catch(err){
            console.log(err);
        }

    }
  return (
    <div className="min-h-screen flex items-center justify-center gap-16 px-28 mt-16">
        
           
          {/* Form signUp */}
        <div className="h-[500px] flex items-center justify-center px-16">
  <div className="space-y-6 text-start">
  <form onSubmit={HandleSignUp}
  action=""
  className={`flex flex-col items-center justify-center gap-6 w-full max-w-md p-8 
  ${darkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-800"} 
  bg-opacity-75 backdrop-blur-lg rounded-xl shadow-lg form-container-signUp`} 
>
  <h1 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
    Create Your Account
  </h1>
  <p className={`text-center ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
    Sign up to access AI-powered grammar correction and writing tools.
  </p>
  <div className="flex flex-col items-center justify-center gap-4 w-full">
    <input
      type="text"
      placeholder="Enter your name"
      value={name}
      onChange={(e)=>setName(e.target.value)}
      className={`input-field ${darkMode ? "bg-gray-700 text-white placeholder-gray-400" : "bg-gray-100 text-gray-800 placeholder-gray-500"} border ${darkMode ? "border-gray-600" : "border-gray-300"} focus:ring-2 ${darkMode ? "focus:ring-blue-500" : "focus:ring-blue-300"}`}
    />
    <input
      type="email"
      placeholder="Enter your email"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      className={`input-field ${darkMode ? "bg-gray-700 text-white placeholder-gray-400" : "bg-gray-100 text-gray-800 placeholder-gray-500"} border ${darkMode ? "border-gray-600" : "border-gray-300"} focus:ring-2 ${darkMode ? "focus:ring-blue-500" : "focus:ring-blue-300"}`}
    />
    <input
      type="password"
      placeholder="Enter your password"
      value={password}
      onChange={(e)=>setPasssword(e.target.value)}
      className={`input-field ${darkMode ? "bg-gray-700 text-white placeholder-gray-400" : "bg-gray-100 text-gray-800 placeholder-gray-500"} border ${darkMode ? "border-gray-600" : "border-gray-300"} focus:ring-2 ${darkMode ? "focus:ring-blue-500" : "focus:ring-blue-300"}`}
    />
    <input
      type="text"
      placeholder="Enter your phone"
      value={phone}
      onChange={(e)=>setPhone(e.target.value)}
      className={`input-field ${darkMode ? "bg-gray-700 text-white placeholder-gray-400" : "bg-gray-100 text-gray-800 placeholder-gray-500"} border ${darkMode ? "border-gray-600" : "border-gray-300"} focus:ring-2 ${darkMode ? "focus:ring-blue-500" : "focus:ring-blue-300"}`}
    />
    <input
      type="text"
      placeholder="Enter your address"
      value={address}
      onChange={(e)=>setAdress(e.target.value)}
      className={`input-field ${darkMode ? "bg-gray-700 text-white placeholder-gray-400" : "bg-gray-100 text-gray-800 placeholder-gray-500"} border ${darkMode ? "border-gray-600" : "border-gray-300"} focus:ring-2 ${darkMode ? "focus:ring-blue-500" : "focus:ring-blue-300"}`}
    />
  </div>
  
  <button
    type="submit"
    className={`w-full py-2 px-4 rounded-lg font-semibold transition ${
      darkMode ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
    }`}
  >
    Sign Up
  </button>
  {/* <div className="flex flex-col items-center gap-6">
    <h2 className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>Or sign up with</h2>
    <div className="flex items-center justify-center gap-4">
      <button
        className={`py-2 px-4 rounded-lg font-semibold ${
          darkMode ? "bg-white text-gray-800 hover:bg-gray-100" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        }`}
      >
        Google
      </button>
      <button
        className={`py-2 px-4 rounded-lg font-semibold ${
          darkMode ? "bg-white text-gray-800 hover:bg-gray-100" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        }`}
      >
        GitHub
      </button>
    </div>
  </div> */}
</form>

  </div>
        </div>

             {/* Main Image Section */}
        <div className="relative w-full max-w-lg  transform transition-all duration-500 ">
              {/* Background Blob Animations */}
              <div className="absolute top-0 -left-4 w-72 h-72 bg-[#ff9f1c] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute top-0 -right-4 w-72 h-72 bg-[#72ddf7] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#ffb3c1] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
    
             
              
               <div className=" relative space-y-8 px-8 rounded-xl ">
                    <img src={img} alt="" />
               </div>

            </div>
    </div>
  )
}

export default Register