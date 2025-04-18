import express from "express";
import { addComment, getCommentsByDocument } from "../controllers/commentController.js";
import verifyToken from "../middleware/authMiddleware.js";
import { isStudent } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, isStudent, addComment); // Student adds comment
router.get("/:documentId", verifyToken, getCommentsByDocument); // Anyone can view comments

export default router;
