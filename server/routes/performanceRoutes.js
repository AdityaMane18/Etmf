import express from "express";
import { upsertPerformance, getPerformanceByStudent } from "../controllers/performanceController.js";
import verifyToken from "../middleware/authMiddleware.js";
import { isAdmin, isStudent } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, isAdmin, upsertPerformance); // Admin can add/update
router.get("/:studentId", verifyToken, isStudent, getPerformanceByStudent); // Student sees own performance

export default router;
