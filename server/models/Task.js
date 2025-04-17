import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
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
    status: {
      type: String,
      enum: ["pending", "in process", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Task =  mongoose.model("Task", taskSchema);
export default Task;
