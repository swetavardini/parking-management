import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Payment = () => {
  const { parkingId } = useParams(); // Get the parking ID from the URL
  const navigate = useNavigate();

  const [parkingDetails, setParkingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  useEffect(() => {
    const fetchParkingDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5500/api/parking/${parkingId}`);
        setParkingDetails(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch parking details");
        setLoading(false);
      }
    };

    fetchParkingDetails();
  }, [parkingId]);

  const handlePayment = () => {
    if (!parkingDetails) return;

    alert(`Processing payment of ₹${parkingDetails.price}...`);
    sendEmailNotification(parkingDetails);
    
    // Mark parking as booked in the database
    axios.put(`http://localhost:5500/api/parking/book/${parkingId}`, { booked: true })
      .then(() => {
        alert("Payment successful! Parking slot booked.");
        navigate("/dashboard");
      })
      .catch((err) => console.error("Booking update failed", err));
  };

  const sendEmailNotification = (parking) => {
    const userEmail = "john.doe@example.com"; // Replace with dynamic user email
    axios.post("http://localhost:5500/api/notify", {
      email: userEmail,
      subject: "Parking Slot Booked",
      message: `Your parking at ${parking.name} has been booked successfully for ₹${parking.price}.`,
    })
    .then(() => console.log("Email sent successfully"))
    .catch((err) => console.error("Failed to send email", err));
  };

  if (loading) return <p>Loading payment details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-yellow-100 to-red-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-semibold text-purple-700">Make Payment</h2>
        <p className="mt-4 text-lg font-bold">🚗 {parkingDetails.name}</p>
        <p className="text-gray-700">{parkingDetails.location}</p>
        <p className="mt-2 text-blue-600 font-semibold">
          Total Price: ₹{parkingDetails.price}
        </p>

        <button 
          onClick={handlePayment} 
          className="mt-4 w-full bg-green-500 text-white py-2 rounded-full hover:bg-green-600 transition">
          Pay ₹{parkingDetails.price} Now
        </button>

        <button 
          onClick={() => navigate("/dashboard")} 
          className="mt-2 w-full bg-red-500 text-white py-2 rounded-full hover:bg-red-600 transition">
          Cancel Payment
        </button>
      </div>
    </div>
  );
};

export default Payment;