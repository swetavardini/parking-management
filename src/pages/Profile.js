import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/styles.css"; // Import CSS

const Profile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarOptions, setShowAvatarOptions] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    mobile: "+1 123 456 7890",
    location: "New York, United States",
    occupation: "Software Engineer",
    university: "Columbia University - New York",
    events: 0,
    rewards: 250, // Assuming 250 stars
    parking: 0, // Assuming 0 parking slots booked initially
    profileImage: "/default-avatar.png", // Default avatar
  });

  useEffect(() => {
    // Fetch the number of events and parking from the backend
    axios.get("/api/user/events").then((response) => {
      setProfile((prevProfile) => ({
        ...prevProfile,
        events: response.data.events,
      }));
    });

    axios.get("/api/user/parking").then((response) => {
      setProfile((prevProfile) => ({
        ...prevProfile,
        parking: response.data.parking,
      }));
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile((prevProfile) => ({ ...prevProfile, profileImage: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarSelection = () => {
    setShowAvatarOptions(true);
  };

  const handleAvatarClick = (avatarUrl) => {
    setProfile((prevProfile) => ({ ...prevProfile, profileImage: avatarUrl }));
    setShowAvatarOptions(false);
  };

  const handleOpenCamera = () => {
    const constraints = {
      video: true,
    };

    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        const video = document.createElement("video");
        video.srcObject = stream;
        video.play();
        setTimeout(() => {
          const canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          setProfile((prevProfile) => ({ ...prevProfile, profileImage: canvas.toDataURL("image/png") }));
          stream.getTracks().forEach(track => track.stop());
        }, 3000); // Captures image after 3 seconds
      })
      .catch((error) => {
        console.error("Error accessing camera:", error);
      });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
      <header className="header bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 shadow-lg">
        <h1 className="text-5xl font-extrabold animate-bounce">🚗 Parking Management System 🚀</h1>
      </header>

      <nav className="navbar bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 shadow-md">
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:text-yellow-500 transition duration-300">Home</Link></li>
          <li><Link to="/login" className="hover:text-yellow-500 transition duration-300">Login</Link></li>
          <li><Link to="/register" className="hover:text-yellow-500 transition duration-300">Register</Link></li>
          <li><Link to="/dashboard" className="hover:text-yellow-500 transition duration-300">Dashboard</Link></li>
          <li><Link to="/parking" className="hover:text-yellow-500 transition duration-300">Parking Management</Link></li>
          <li><Link to="/events" className="hover:text-yellow-500 transition duration-300">Event Scheduling</Link></li>
          <li><Link to="/reminders" className="hover:text-yellow-500 transition duration-300">Reminders</Link></li>
          <li><Link to="/rewards" className="hover:text-yellow-500 transition duration-300">Rewards</Link></li>
          <li><Link to="/payment" className="hover:text-yellow-500 transition duration-300">Payment</Link></li>
          <li><Link to="/analytics" className="hover:text-yellow-500 transition duration-300">Analytics</Link></li>
          <li><Link to="/profile" className="hover:text-yellow-500 transition duration-300">Profile</Link></li>
          <li><Link to="/support" className="hover:text-yellow-500 transition duration-300">Help & Support</Link></li>
        </ul>
      </nav>

      <main className="flex-grow flex items-center justify-center bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100 p-8">
        <div className="bg-white rounded-lg shadow-2xl p-8 text-center relative w-full max-w-5xl">
          {/* Profile Image with selection options */}
          <div className="relative mx-auto w-40 h-40">
            <img
              src={profile.profileImage}
              alt="Profile"
              className="w-40 h-40 rounded-full border-4 border-white shadow-lg cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            />
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          <div className="mt-4 space-x-4 flex justify-center">
            <button onClick={handleAvatarSelection} className="bg-gray-500 text-white px-3 py-1 rounded shadow-md">Set Avatar</button>
            <button onClick={handleOpenCamera} className="bg-blue-500 text-white px-3 py-1 rounded shadow-md">Take Photo</button>
          </div>

          {showAvatarOptions && (
            <div className="mt-4 flex justify-center space-x-4">
              <img
                src="/avatar1.png" // Replace with actual avatar URL
                alt="Avatar 1"
                className="w-20 h-20 rounded-full cursor-pointer"
                onClick={() => handleAvatarClick("/avatar1.png")}
              />
              <img
                src="/avatar2.png" // Replace with actual avatar URL
                alt="Avatar 2"
                className="w-20 h-20 rounded-full cursor-pointer"
                onClick={() => handleAvatarClick("/avatar2.png")}
              />
              <img
                src="/avatar3.png" // Replace with actual avatar URL
                alt="Avatar 3"
                className="w-20 h-20 rounded-full cursor-pointer"
                onClick={() => handleAvatarClick("/avatar3.png")}
              />
            </div>
          )}

          <div className="mt-6">
            {isEditing ? (
              <div className="space-y-4">
                <input type="text" name="name" value={profile.name} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400" placeholder="Name" />
                <input type="email" name="email" value={profile.email} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400" placeholder="Email" />
                <input type="text" name="mobile" value={profile.mobile} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400" placeholder="Mobile No." />
                <button onClick={handleEditToggle} className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md">Save</button>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-semibold text-gray-800">{profile.name}</h2>
                <p className="text-gray-500">{profile.email}</p>
                <p className="text-gray-500">{profile.mobile}</p>
                <p className="text-gray-600 mt-2">{profile.occupation}</p>

                <div className="flex justify-center space-x-10 my-6 text-gray-700">
                  <div onClick={() => navigate('/events')} className="cursor-pointer">
                    <p className="text-lg font-semibold">{profile.events}</p>
                    <p className="text-sm">No. of Events</p>
                  </div>
                  <div onClick={() => navigate('/rewards')} className="cursor-pointer">
                    <p className="text-lg font-semibold">{profile.rewards} ⭐</p>
                    <p className="text-sm">Rewards</p>
                  </div>
                  <div onClick={() => navigate('/parking')} className="cursor-pointer">
                    <p className="text-lg font-semibold">{profile.parking}</p>
                    <p className="text-sm">Parking</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button onClick={() => navigate('/dashboard')} className="bg-pink-500 text-white px-4 py-2 rounded-full shadow-md">Show More</button>
                  <button onClick={handleEditToggle} className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md">Edit Profile</button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
