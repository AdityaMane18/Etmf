import express from "express";
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { assignTaskToAllStudents } from "../controllers/taskController.js";
import verifyToken from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";
const router = express.Router();

// 🔀 Routes
router.post("/assign-all", verifyToken, isAdmin, assignTaskToAllStudents);
router.post("/", verifyToken, isAdmin, createTask);            // Assign a task
router.get("/", verifyToken, isAdmin, getAllTasks);            // Get all tasks
router.get("/:id", verifyToken, getTaskById);         // Get task by ID
router.put("/:id", verifyToken, isAdmin, updateTask);          // Update status
router.delete("/:id", verifyToken, isAdmin, deleteTask);       // Delete task

export default router;
