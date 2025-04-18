import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// 🔒 Admin Registration
router.post("/register-admin", (req, res) => {
    req.body.role = "admin";
    registerUser(req, res);
  });
// 🎓 Student Registration
router.post("/register-student", (req, res) => {
    req.body.role = "student";
    registerUser(req, res);
  });

  router.post("/login", loginUser);
export default router;
