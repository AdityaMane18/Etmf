import Comment from "../models/Comment.js";

// ➕ Add a comment
export const addComment = async (req, res) => {
  try {
    const { student_id, document_id, comment } = req.body;
    const newComment = new Comment({ student_id, document_id, comment });
    await newComment.save();
    res.status(201).json({ message: "Comment added", comment: newComment });
  } catch (err) {
    res.status(500).json({ message: "Failed to add comment", error: err.message });
  }
};

// 📃 Get comments for a document
export const getCommentsByDocument = async (req, res) => {
  try {
    const comments = await Comment.find({ document_id: req.params.documentId })
      .populate("student_id", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch comments", error: err.message });
  }
};
