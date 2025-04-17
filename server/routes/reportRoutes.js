import express from "express";
import {
  addReport,
  getAllReports,
  getReportById,
  getReportsByStudent,
  deleteReport,
  updateReport,
  getStudentStats,
  exportReportsToExcel
} from "../controllers/reportController.js";
import verifyToken from "../middleware/authMiddleware.js";
import { isAdmin, isStudent } from "../middleware/roleMiddleware.js";
const router = express.Router();

// Routes
// 🔐 Admin-only
router.post("/", verifyToken, isAdmin, addReport);
router.put("/:id", verifyToken, isAdmin, updateReport);
router.delete("/:id", verifyToken, isAdmin, deleteReport);
router.get("/export/excel", verifyToken, isAdmin, exportReportsToExcel);

// 📊 Public or protected dashboard
router.get("/stats/student/:studentId", verifyToken, isStudent, getStudentStats);

// 🔐 Student access
router.get("/student/:studentId", verifyToken, isStudent, getReportsByStudent);

// 📥 Admin view all
router.get("/", verifyToken, isAdmin, getAllReports);
router.get("/:id", verifyToken, isAdmin, getReportById);                  // ❌ Delete

export default router;
