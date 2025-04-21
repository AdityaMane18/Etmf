import Document from "../models/Document.js";

// ✅ Add a new document
export const addDocument = async (req, res) => {
    try {
      const { name, description, dueDate, effectiveDate } = req.body;
      const created_by = req.user.userId;
      const fileUrl = req.file?.path; // Cloudinary gives file path in req.file
      if (!fileUrl) {
        return res.status(400).json({ message: "File upload failed" });
      }
      const newDoc = new Document({
        name,
        description,
        file_path: fileUrl,
        created_by,
        dueDate,
        effectiveDate,
      });

  
      await newDoc.save();
  
      res.status(201).json({ message: "Document added", document: newDoc });
    } catch (error) {
      res.status(500).json({ 
        message: "Upload failed", 
        error: error?.message || "Unknown error" 
      });
      
    }
  };
  

// ✅ Get all documents
export const getAllDocuments = async (req, res) => {
  try {
    const docs = await Document.find().populate("created_by", "name email");
    res.status(200).json(docs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch documents", error: error.message });
  }
};

// ✅ Get a single document by ID
export const getDocumentById = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id).populate("created_by", "name email");
    if (!doc) return res.status(404).json({ message: "Document not found" });
    res.status(200).json(doc);
  } catch (error) {
    res.status(500).json({ message: "Failed to get document", error: error.message });
  }
};

// ✅ Update a document
export const updateDocument = async (req, res) => {
  try {
    const { name, description, file_path, dueDate, effecctiveDate } = req.body;
    const updated = await Document.findByIdAndUpdate(
      req.params.id,
      { name, description, file_path, dueDate, effectiveDate },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Document not found" });
    res.status(200).json({ message: "Document updated", document: updated });
  } catch (error) {
    res.status(500).json({ message: "Failed to update document", error: error.message });
  }
};

// ✅ Delete a document
export const deleteDocument = async (req, res) => {
  try {
    const deleted = await Document.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Document not found" });
    res.status(200).json({ message: "Document deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete document", error: error.message });
  }
};
export const markDocumentViewed = async (req, res) => {
  try {
    const { id } = req.params; // document ID
    const userId = req.user.userId; // from JWT middleware

    const document = await Document.findById(id);
    if (!document) return res.status(404).json({ message: "Document not found" });

    // Only add if not already viewed
    if (!document.viewedBy.includes(userId)) {
      document.viewedBy.push(userId);
      await document.save();
    }

    res.status(200).json({ message: "View marked", uniqueViews: document.viewedBy.length });
  } catch (err) {
    res.status(500).json({ message: "Error updating view", error: err.message });
  }
};



export const getDistinctTaskDocuments = async (req, res) => {
  try {
    const docs = await Task.find()
      .populate("document_id")
      .select("document_id")
      .lean();

    // Filter to get only unique documents
    const uniqueDocsMap = new Map();
    docs.forEach((t) => {
      const doc = t.document_id;
      if (doc && !uniqueDocsMap.has(doc._id.toString())) {
        uniqueDocsMap.set(doc._id.toString(), doc);
      }
    });

    const uniqueDocs = Array.from(uniqueDocsMap.values());
    res.status(200).json(uniqueDocs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks", error: error.message });
  }
};

