import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "etmf_documents",
    resource_type: "auto", // allows PDF, DOCX, etc.
    format: async (req, file) => {
      return file.mimetype.split("/")[1];
    },
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

const upload = multer({ storage });
export default upload;
