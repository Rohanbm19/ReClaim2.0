import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  itemName: { type: String, required: false },
  description: { type: String, required: false },
  date: { type: String, required: false },
  time: { type: String, required: false },
  location: { type: String, required: false },
  title: { type: String, required: false },
  locationFound: { type: String, required: false },
  questions: [{
    question: { type: String, required: true },
    answer: { type: String, required: true }
  }]
}, { timestamps: true });

export default mongoose.model("Item", itemSchema);