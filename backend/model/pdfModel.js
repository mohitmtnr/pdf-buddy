import mongoose from "mongoose";

const { Schema } = mongoose;

const PdfSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  file_name: {
    type: String,
  },
  upload_time: {
    type: Date,
    default: Date.now,
  },
});

const PDF = mongoose.model("pdf", PdfSchema);
export default PDF;
