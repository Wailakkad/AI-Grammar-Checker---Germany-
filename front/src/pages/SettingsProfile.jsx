import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import img from "./imagesPages/reading.png";
import { Pencil, Save, XCircle, User, Mail, Phone, MapPin } from "lucide-react";

const SettingsProfile = ({darkMode}) => {
  const user = useOutletContext();
  const [EDIT, setEDIT] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
  });
  const [savingsCount, setSavingsCount] = useState(0);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:2000/api/app/Edit/${user._id}`, formData);
      alert("Profile updated successfully!");
      setEDIT(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
<div
  className={`p-6 min-h-screen ${
    darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
  }`}
>
  <div>
    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
      {EDIT ? <Pencil /> : <User />}
      {EDIT ? "Edit Profile" : "Profile"}
    </h2>
  </div>

  <div className="flex items-start mt-16 gap-16">
    {/* Image container */}
    <div className="w-[350px] h-[350px] flex-shrink-0">
      <img
        src={img}
        alt="Profile"
        className="w-full h-full object-cover rounded-lg shadow-md"
      />
      <div className="mt-4">
        <button
          className={`${
            darkMode
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-green-400 hover:bg-green-500 text-black"
          } px-4 py-2 rounded flex items-center gap-2`}
          onClick={() => alert(`You have ${savingsCount} savings.`)}
        >
          <User />
          Total Savings: {savingsCount}
        </button>
      </div>
    </div>

    {/* Form or profile details */}
    {EDIT ? (
      <form onSubmit={handleFormSubmit} className="space-y-6 w-full">
        {/* Username */}
        <div>
          <label
            className={`block font-medium mb-1 flex items-center gap-2 ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            <User />
            Username:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`${
              darkMode
                ? "bg-gray-800 text-white border-gray-700"
                : "bg-gray-100 text-black border-gray-300"
            } border rounded px-4 py-2 w-full`}
          />
        </div>

        {/* Email */}
        <div>
          <label
            className={`block font-medium mb-1 flex items-center gap-2 ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            <Mail />
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`${
              darkMode
                ? "bg-gray-800 text-white border-gray-700"
                : "bg-gray-100 text-black border-gray-300"
            } border rounded px-4 py-2 w-full`}
          />
        </div>

        {/* Phone */}
        <div>
          <label
            className={`block font-medium mb-1 flex items-center gap-2  ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            <Phone />
            Telephone:
          </label>
          <input
            type="text"
            name="telephone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`${
              darkMode
                ? "bg-gray-800 text-white border-gray-700"
                : "bg-gray-100 text-black border-gray-300"
            } border rounded px-4 py-2 w-full`}
          />
        </div>

        {/* Address */}
        <div>
          <label
            className={`block font-medium mb-1 flex items-center gap-2 ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            <MapPin />
            Address:
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className={`${
              darkMode
                ? "bg-gray-800 text-white border-gray-700"
                : "bg-gray-100 text-black border-gray-300"
            } border rounded px-4 py-2 w-full`}
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className={`${
              darkMode
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-400 hover:bg-blue-500 text-black"
            } px-4 py-2 rounded flex items-center gap-2`}
          >
            <Save />
            Save Changes
          </button>
          <button
            type="button"
            className={`${
              darkMode
                ? "bg-gray-600 hover:bg-gray-700 text-white"
                : "bg-gray-400 hover:bg-gray-500 text-black"
            } px-4 py-2 rounded flex items-center gap-2`}
            onClick={() => setEDIT(false)}
          >
            <XCircle />
            Cancel
          </button>
        </div>
      </form>
    ) : (
      <div className=" flex flex-col space-y-6 gap-8">
        {/* Profile details */}
        <div className="flex items-center gap-8">
          <h3
            className={`font-medium flex items-center gap-2 ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            <User />
            Username:
          </h3>
          <p>{user.name}</p>
        </div >
        <div className="flex items-center gap-8">
          <h3
            className={`font-medium flex items-center gap-2 ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            <Mail />
            Email:
          </h3>
          <p>{user.email}</p>
        </div>
        <div className="flex items-center gap-8">
          <h3
            className={`font-medium flex items-center gap-2 ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            <Phone />
            Telephone:
          </h3>
          <p>{user.phone}</p>
        </div>
        <div className="flex items-center gap-8">
          <h3
            className={`font-medium flex items-center gap-2 ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            <MapPin />
            Address:
          </h3>
          <p>{user.address}</p>
        </div>
        <button
          onClick={() => setEDIT(true)}
          className={`${
            darkMode
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-400 hover:bg-blue-500 text-black"
          } px-4 py-2 rounded flex items-center gap-2`}
        >
          <Pencil />
          Edit Profile
        </button>
      </div>
    )}
  </div>
</div>



  );
};

export default SettingsProfile;
