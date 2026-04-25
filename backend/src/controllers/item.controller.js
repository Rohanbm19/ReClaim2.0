// backend/src/controllers/item.controller.js
const Item = require("../models/item.model");

exports.createItem = async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: "Error creating item" });
  }
};

exports.getAllItems = async (req, res) => {
  const items = await Item.find().sort({ createdAt: -1 });
  res.json(items);
};

exports.getItemById = async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.json(item);
};

exports.updateItem = async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
};

exports.deleteItem = async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};