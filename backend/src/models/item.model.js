// backend/src/models/Item.js
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Item", itemSchema);