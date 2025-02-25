import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5500/api/users/register", {
        name,
        email,
        password,
      });

      if (response.data.message === "User already exists") {
        setError("User already exists. Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.data.message === "User already exists") {
        setError("User already exists. Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError("Error registering user. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      
      {/* ✅ Navbar Included Directly Here */}
      <nav className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-extrabold animate-bounce">🚗 Parking System</h1>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-yellow-300 transition duration-300">Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-yellow-300 transition duration-300">About</Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-yellow-300 transition duration-300">Register</Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-yellow-300 transition duration-300">Login</Link>
            </li>
          </ul>
        </div>
      </nav>
      {/* ✅ Navbar Ends Here */}

      <main className="flex-grow flex items-center justify-center bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100 p-8">
        <div className="container max-w-md bg-white p-8 rounded-lg shadow-lg text-center animate-fade-in">
          <h2 className="text-4xl font-semibold mb-4 text-purple-700 animate-pulse">Register</h2>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <form className="mt-6 space-y-4" onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-400 to-pink-500 text-white py-2 px-4 rounded-full hover:bg-gradient-to-r from-purple-500 to-pink-600 transition duration-300 transform hover:scale-105"
            >
              Register
            </button>
          </form>
          <p className="mt-4 text-gray-600">
            Already have an account? <Link to="/login" className="text-purple-500 hover:underline">Login</Link>
          </p>
        </div>
      </main>

      <footer className="footer bg-gradient-to-r from-blue-800 to-purple-900 text-white p-4 text-center">
        <p>&copy; 2025 Parking Management System. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Register;