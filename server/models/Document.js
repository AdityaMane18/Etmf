import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    file_path: {
      type: String,
      required: true,
    },
    effectiveDate: {
      type: Date,
      required: false, // set to true if needed
    },
    dueDate: {
      type: Date,
      required: false, // set to true if it should be mandatory
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    viewedBy: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
  },
  { timestamps: true }
);

const Document =  mongoose.model("Document", documentSchema);
export default Document;