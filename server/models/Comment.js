import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    document_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Comment =  mongoose.model("Comment", commentSchema);
export default Comment;