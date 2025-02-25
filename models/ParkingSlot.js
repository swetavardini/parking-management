import mongoose from 'mongoose';

const ParkingSlotSchema = new mongoose.Schema({
    name: String,
    type: String,
    location: String,
    available: { type: Boolean, default: true },
    bookedBy: { type: String, default: null },
});

const ParkingSlot = mongoose.model('parkingslots', ParkingSlotSchema);
export default ParkingSlot;