import express from "express";
import { registerUser, loginUser, getAllUsers } from "../controllers/userController.js";
const router = express.Router();

// Test route

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/all", getAllUsers);
export default router;
