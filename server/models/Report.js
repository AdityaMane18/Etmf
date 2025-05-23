import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
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
    total_percentage: {
      type: Number,
      required: true,
    },
    result: {
      type: String,
      enum: ["Pass", "Fail"],
      required: true,
    },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);
export default Report;