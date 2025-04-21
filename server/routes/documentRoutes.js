import express from "express";
import {
  addDocument,
  getAllDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../controllers/documentController.js";
import upload from "../utlis/cloudinaryUpload.js";
import verifyToken from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";
import { markDocumentViewed } from "../controllers/documentController.js";
const router = express.Router();



// ✅ Upload + Save Document in DB
router.post("/",  verifyToken, isAdmin, upload.single("file"), addDocument); // 👈 modifies addDocument to handle uploaded file

// ✅ Only upload to Cloudinary (optional testing route)
router.post("/upload", upload.single("file"), async (req, res) => {
  const fileUrl = req.file.path;
  res.status(200).json({ message: "Uploaded", fileUrl });
});

router.get("/", getAllDocuments);         // Get all
router.get("/:id", getDocumentById);      // Get one
router.put("/view/:id", verifyToken, markDocumentViewed);
router.put("/:id", verifyToken, isAdmin, updateDocument);
router.delete("/:id", verifyToken, isAdmin, deleteDocument);

export default router;
