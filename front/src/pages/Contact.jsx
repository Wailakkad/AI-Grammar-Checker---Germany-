import axios from 'axios';
import React, { useState } from 'react'
import { ToastContainer , toast } from 'react-toastify';

import imgBackground from "./imagesPages/backCONTACT.jpg"

const Contact = ({darkMode}) => {
    const [Fullname , setFullname] = useState("");
    const [email , setEmail] = useState("");
    const [message , setMessage] = useState("");
    const [status , setStatus] = useState("");
    const HandleContact = async (e)=>{
        e.preventDefault();
        if(!email || !Fullname || !message){
            toast.error("Please fill all the fields");
        }
        else{
            try{
                const response = await axios.post("http://localhost:2000/api/app/AddConatct" , {
                    Fullname : Fullname ,
                    email : email ,
                    message : message ,
                })
                if(!response.ok){
                    setStatus(response.data.message)
                }
                else if(response.status === 201 ){
                    setFullname("");
                    setEmail("");
                    setMessage("");
                    setStatus("Your message has been sent");
                }
                
            }catch(err){
                console.log(err);
                toast.error("Error");

            }
        }
    }
    return (
        <div
            className="contact-form flex justify-center items-center min-h-screen bg-cover bg-center mt-16"
            style={{ backgroundImage: `url(${imgBackground})` }}
        >
            <div className={`${darkMode ? "bg-black" : "bg-white"}  p-8 rounded-xl shadow-lg max-w-lg w-full`}>
                <h2 className={`${darkMode ? "text-white" : "text-black" } text-3xl font-semibold text-center mb-6 `}>Contact Us</h2>
                <form onSubmit={HandleContact} className="space-y-6">
                    <div>
                        <label htmlFor="Fullname" className={`${darkMode ? "text-white" : "text-black"} block text-lg font-medium  mb-2`}>
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="Fullname"
                            name="Fullname"
                            value={Fullname}
                            onChange={(e)=>{setFullname(e.target.value)}}
                            className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2  ${darkMode ? "bg-black text-white  focus:ring-white" : "bg-white text-black  focus:ring-black"}`}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className={`${darkMode ? "text-white" : "text-black"} block text-lg font-medium  mb-2`}>
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e)=>{setEmail(e.target.value)}}
                            className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2  ${darkMode ? "bg-black text-white  focus:ring-white" : "bg-white text-black  focus:ring-black"}`}
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className={`${darkMode ? "text-white" : "text-black"} block text-lg font-medium  mb-2`}>
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={message}
                            onChange={(e)=>{setMessage(e.target.value)}}
                            rows="4"
                            className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2  ${darkMode ? "bg-black text-white  focus:ring-white" : "bg-white text-black  focus:ring-black"}`}
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                           
                            type="submit"
                            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Send Message
                        </button>
                    </div>
                </form>

                {status && (
                    <div className="mt-4 text-center">
                        <p className={`${darkMode ? "text-white" : "text-black"}`}>{status}</p>
                    </div>
                )}
            </div>
            <ToastContainer/>
        </div>
        
    );
}

export default Contact;