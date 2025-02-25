import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/styles.css";

const Parking = () => {
  const [location, setLocation] = useState("");
  const [parkingSlots, setParkingSlots] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  // Fetch Parking Slots Based on Location
  const handleSearch = async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/parking/available");
      const filteredSlots = response.data.filter(slot => slot.location.toLowerCase() === location.toLowerCase());

      if (filteredSlots.length === 0) {
        setError("No parking spots found.");
        setParkingSlots([]);
      } else {
        setError("");
        setParkingSlots(filteredSlots);
      }
    } catch (err) {
      setError("Error fetching parking spots. Try again.");
      console.error(err);
    }
  };

  // Navigate to Payment Page with Slot Details
  const handleBooking = (slot) => {
    navigate("/payment", { state: { slot } });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
      <header className="header bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 shadow-lg">
        <h1 className="text-5xl font-extrabold animate-bounce">🚗 Parking Management System 🚀</h1>
      </header>

      <nav className="navbar bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 shadow-md">
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:text-yellow-500 transition duration-300">Home</Link></li>
          <li><Link to="/parking" className="hover:text-yellow-500 transition duration-300">Parking Management</Link></li>
          <li><Link to="/payment" className="hover:text-yellow-500 transition duration-300">Payment</Link></li>
          <li><Link to="/profile" className="hover:text-yellow-500 transition duration-300">Profile</Link></li>
        </ul>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100 p-8">
        <div className="container max-w-md bg-white p-8 rounded-lg shadow-lg text-center animate-fade-in">
          <h2 className="text-4xl font-semibold mb-4 text-purple-700 animate-pulse">Find Parking</h2>
          <input 
            type="text" 
            placeholder="Enter location" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 mb-4"
          />
          <button 
            onClick={handleSearch} 
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-4 rounded-full hover:bg-gradient-to-r from-green-500 to-blue-600 transition duration-300 transform hover:scale-105"
          >
            Search
          </button>

          {error && <p className="text-red-500 mt-4">{error}</p>}

          <div className="mt-6">
            {parkingSlots.map(slot => (
              <div key={slot._id} className="p-4 bg-gray-200 rounded-lg shadow-md mb-2">
                <h3 className="text-lg font-bold">{slot.name} ({slot.type})</h3>
                <p>📍 {slot.location}</p>
                <p className="text-green-600 font-semibold">Available ✅</p>
                <p className="text-blue-600 font-semibold">Price: ₹{slot.price}</p>
                <button 
                  onClick={() => handleBooking(slot)} 
                  className="bg-blue-500 text-white py-1 px-3 rounded-lg mt-2 hover:bg-blue-600"
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="footer bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 text-center">
        <p>&copy; 2025 Parking Management System. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Parking;