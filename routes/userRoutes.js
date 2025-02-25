import express from "express";
import { createUser, loginUser } from "../controllers/userController.js";  // ✅ Use named imports

const router = express.Router();

// Register Route
router.post("/register", createUser);

// Login Route
router.post("/login", loginUser);

export default router;