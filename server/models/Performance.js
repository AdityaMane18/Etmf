import mongoose from "mongoose";

const performanceSchema = new mongoose.Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    total_tasks: {
      type: Number,
      default: 0,
    },
    completed_tasks: {
      type: Number,
      default: 0,
    },
    pending_tasks: {
      type: Number,
      default: 0,
    },
    failed_tasks: {
      type: Number,
      default: 0,
    },
    average_time_taken: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Performance =  mongoose.model("Performance", performanceSchema);
export default Performance;