import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Parking from "./pages/Parking";
import Events from "./pages/Events";
import Rewards from "./pages/Rewards";
import Payment from "./pages/Payment";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import Support from "./pages/Support";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/parking" element={<Parking />} />
        <Route path="/events" element={<Events />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/support" element={<Support />} />
      </Routes>
    </Router>
  );
}

export default App;