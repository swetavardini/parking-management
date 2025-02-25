import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../assets/styles.css"; // Import CSS

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    totalBookings: 0,
    parkingRevenue: 0,
    currentParkings: 0,
    eventsScheduled: 0,
    rewardsEarned: 0,
  });

  useEffect(() => {
    // Fetch analytics data from the backend
    axios.get("/api/analytics").then((response) => {
      setAnalyticsData(response.data);
    });
  }, []);

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
        <div className="bg-white rounded-lg shadow-2xl p-8 text-center relative w-full max-w-4xl animate-fade-in transform transition-transform duration-500 hover:scale-105">
          <h2 className="text-4xl font-semibold mb-4 text-purple-700 animate-pulse">Analytics & Reports</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold">Total Bookings</h3>
              <p className="text-4xl font-bold">{analyticsData.totalBookings}</p>
            </div>
            <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold">Parking Revenue</h3>
              <p className="text-4xl font-bold">₹{analyticsData.parkingRevenue}</p>
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold">Current Parkings</h3>
              <p className="text-4xl font-bold">{analyticsData.currentParkings}</p>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold">Events Scheduled</h3>
              <p className="text-4xl font-bold">{analyticsData.eventsScheduled}</p>
            </div>
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold">Rewards Earned</h3>
              <p className="text-4xl font-bold">{analyticsData.rewardsEarned} ⭐</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 text-center">
        <p>&copy; 2025 Parking Management System. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Analytics;