import mongoose from 'mongoose';
import express from 'express';
import ParkingSlot from '../models/ParkingSlot.js';

const router = express.Router();

// ✅ Get price of a specific parking slot
router.get("/get-price/:slotId", async (req, res) => {
    try {
        const { slotId } = req.params;

        // Validate slot ID
        if (!mongoose.Types.ObjectId.isValid(slotId)) {
            return res.status(400).json({ message: "Invalid slot ID format" });
        }

        // Find the parking slot by ID
        const slot = await ParkingSlot.findById(slotId);

        if (!slot) {
            return res.status(404).json({ message: "Parking slot not found" });
        }

        res.status(200).json({ price: slot.price });

    } catch (error) {
        console.error("Error fetching price:", error);
        res.status(500).json({ message: "Server error while fetching price" });
    }
});

// ✅ Fetch all available parking slots
router.get('/available', async (req, res) => {
    try {
        const slots = await ParkingSlot.find({ available: true });

        if (!slots.length) {
            return res.status(404).json({ message: "No available parking slots found" });
        }

        res.status(200).json(slots);
    } catch (error) {
        console.error("Error fetching parking slots:", error);
        res.status(500).json({ message: "Server error while fetching parking slots" });
    }
});

// ✅ Book a Parking Slot
router.post('/book', async (req, res) => {
    try {
        const { userId, slotId } = req.body;

        // Validate slot ID
        if (!mongoose.Types.ObjectId.isValid(slotId)) {
            return res.status(400).json({ message: "Invalid slot ID format" });
        }

        // Find and update the slot in a single query
        const slot = await ParkingSlot.findOneAndUpdate(
            { _id: slotId, available: true },
            { available: false, bookedBy: userId },
            { new: true }
        );

        if (!slot) {
            return res.status(400).json({ message: "Slot not available or does not exist" });
        }

        res.status(200).json({ message: "Parking slot booked successfully!", slot });
    } catch (error) {
        console.error("Error booking slot:", error);
        res.status(500).json({ message: "Server error while booking slot" });
    }
});

// ✅ Release a Parking Slot (Unbook)
router.post('/release', async (req, res) => {
    try {
        const { slotId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(slotId)) {
            return res.status(400).json({ message: "Invalid slot ID format" });
        }

        const slot = await ParkingSlot.findOneAndUpdate(
            { _id: slotId, available: false },
            { available: true, bookedBy: null },
            { new: true }
        );

        if (!slot) {
            return res.status(400).json({ message: "Slot not found or already available" });
        }

        res.status(200).json({ message: "Parking slot released successfully!", slot });
    } catch (error) {
        console.error("Error releasing slot:", error);
        res.status(500).json({ message: "Server error while releasing slot" });
    }
});

export default router;