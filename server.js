import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import parkingRoutes from "./routes/parkingRoutes.js"; // Import Parking Routes
import userRoutes from "./routes/userRoutes.js"; // Import User Routes

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Use Parking Routes
app.use("/api/parking", parkingRoutes);  // ✅ This ensures /api/parking routes are available

// Use User Routes
app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(error => console.log(error));